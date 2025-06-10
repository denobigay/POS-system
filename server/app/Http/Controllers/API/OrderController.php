<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function loadOrders()
    {
        $orders = Order::with(['user', 'orderItems.product'])->get();
        return response()->json([
            'orders' => $orders,
        ], 200);
    }

    public function storeOrder(Request $request)
    {
        $validated = $request->validate([
            'userId' => ['required', 'exists:tbl_users,user_id'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.productId' => ['required', 'exists:tbl_products,product_id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'amountPaid' => ['required', 'numeric', 'min:0'],
            'paymentMethod' => ['required', 'string'],
            'discount' => ['nullable', 'numeric', 'min:0'],
        ]);

        try {
            DB::beginTransaction();

            // Calculate total amount
            $totalAmount = 0;
            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['productId']);
                if ($product->quantity < $item['quantity']) {
                    throw new \Exception("Insufficient stock for product: {$product->product_name}");
                }
                $totalAmount += $product->price * $item['quantity'];
            }

            $tax = $totalAmount * 0.12;
            $discountPercent = isset($validated['discount']) ? floatval($validated['discount']) : 0;
            $discountAmount = ($totalAmount + $tax) * ($discountPercent / 100);
            $totalAfterDiscount = max($totalAmount + $tax - $discountAmount, 0);

            // Create order
            $order = Order::create([
                'user_id' => $validated['userId'],
                'total_amount' => $totalAfterDiscount,
                'amount_paid' => $validated['amountPaid'],
                'change_amount' => $validated['amountPaid'] - $totalAfterDiscount,
                'payment_method' => $validated['paymentMethod'],
                'status' => 'completed',
                'discount' => $discountPercent
            ]);

            // Create order items and update product quantities
            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['productId']);

                OrderItem::create([
                    'order_id' => $order->order_id,
                    'product_id' => $item['productId'],
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'subtotal' => $product->price * $item['quantity']
                ]);

                // Update product quantity
                $product->update([
                    'quantity' => $product->quantity - $item['quantity']
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order->load(['user', 'orderItems.product'])
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error creating order: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getOrder($id)
    {
        $order = Order::with(['user', 'orderItems.product'])->findOrFail($id);
        return response()->json([
            'order' => $order
        ], 200);
    }

    public function cancelOrder($id)
    {
        try {
            DB::beginTransaction();

            $order = Order::findOrFail($id);

            if ($order->status === 'cancelled') {
                throw new \Exception('Order is already cancelled');
            }

            // Restore product quantities
            foreach ($order->orderItems as $item) {
                $product = Product::find($item->product_id);
                $product->update([
                    'quantity' => $product->quantity + $item->quantity
                ]);
            }

            $order->update(['status' => 'cancelled']);

            DB::commit();

            return response()->json([
                'message' => 'Order cancelled successfully'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error cancelling order: ' . $e->getMessage()
            ], 500);
        }
    }
}
