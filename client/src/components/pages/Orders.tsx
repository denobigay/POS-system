import React, { useEffect, useState } from "react";
import axios from "axios";
import OrdersTable from "../tables/OrdersTable";
import OrderDetailsModal from "../modals/OrderDetailsModal";
import AddOrderModal from "../modals/AddOrderModal";

interface OrderItem {
  order_item_id: number;
  product_id: number;
  quantity: number;
  price: number;
  subtotal: number;
  product?: {
    product_name: string;
  };
}

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
}

interface Order {
  order_id: number;
  user_id: number;
  total_amount: number;
  amount_paid: number;
  change_amount: number;
  payment_method: string;
  status: string;
  created_at: string;
  user?: User;
  order_items?: OrderItem[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/loadOrders");
      setOrders(response.data.orders);
    } catch (error) {
      // Handle error (optional toast)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleOrderAdded = () => {
    loadOrders();
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Orders</h3>
        <button
          className="btn btn-danger"
          onClick={() => setShowAddModal(true)}
        >
          Add Order
        </button>
      </div>
      <OrdersTable
        orders={orders}
        loading={loading}
        onViewDetails={handleViewDetails}
      />
      <OrderDetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        order={selectedOrder}
      />
      <AddOrderModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onOrderAdded={handleOrderAdded}
      />
    </div>
  );
};

export default Orders;
