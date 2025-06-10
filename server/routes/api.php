<?php

use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication Routes
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::controller(RoleController::class)->group(function () {
        Route::get('/loadRoles', 'loadRoles');
        Route::post('/storeRole', 'storeRole');
        Route::put('/updateRole/{id}', 'updateRole');
        Route::delete('/deleteRole/{id}', 'deleteRole');
    });

    Route::controller(UserController::class)->group(function () {
        Route::get('/loadUsers', 'loadUsers');
        Route::post('/storeUser', 'storeUser');
        Route::put('/updateUser/{id}', 'updateUser');
        Route::delete('/deleteUser/{id}', 'deleteUser');
    });

    Route::controller(ProductController::class)->group(function () {
        Route::get('/loadProducts', 'loadProducts');
        Route::post('/storeProduct', 'storeProduct');
        Route::put('/updateProduct/{id}', 'updateProduct');
        Route::delete('/deleteProduct/{id}', 'deleteProduct');
    });

    Route::controller(OrderController::class)->group(function () {
        Route::get('/loadOrders', 'loadOrders');
        Route::post('/storeOrder', 'storeOrder');
        Route::get('/getOrder/{id}', 'getOrder');
        Route::put('/cancelOrder/{id}', 'cancelOrder');
    });
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
