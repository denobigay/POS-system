import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../AxiosInstance";
import {
  FaUsers,
  FaStore,
  FaShoppingCart,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: any[];
  lowStockProducts: any[];
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    lowStockProducts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get("/api/loadUsers"),
          axios.get("/api/loadProducts"),
          axios.get("/api/loadOrders"),
        ]);

        const users = usersRes.data.users;
        const products = productsRes.data.products;
        const orders = ordersRes.data.orders;

        // Calculate total revenue
        const totalRevenue = orders.reduce(
          (sum: number, order: any) =>
            sum +
            (order.status === "completed" ? Number(order.total_amount) : 0),
          0
        );

        // Get low stock products (less than 10 items)
        const lowStockProducts = products.filter(
          (product: any) => product.quantity < 10
        );

        // Get recent orders (last 5)
        const recentOrders = orders
          .sort(
            (a: any, b: any) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 5);

        setStats({
          totalUsers: users.length,
          totalProducts: products.length,
          totalOrders: orders.length,
          totalRevenue,
          recentOrders,
          lowStockProducts,
        });
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Error loading dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Welcome Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h2 className="card-title">Welcome back, {user?.first_name}!</h2>
              <p className="card-text">
                Here's what's happening with your store today.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-dark text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Total Users</h6>
                  <h2 className="card-title mb-0">{stats.totalUsers}</h2>
                </div>
                <FaUsers size={40} className="text-primary" />
              </div>
            </div>
            <div className="card-footer bg-transparent border-0">
              <Link to="/users" className="text-white text-decoration-none">
                View Users <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-dark text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Total Products
                  </h6>
                  <h2 className="card-title mb-0">{stats.totalProducts}</h2>
                </div>
                <FaStore size={40} className="text-success" />
              </div>
            </div>
            <div className="card-footer bg-transparent border-0">
              <Link to="/products" className="text-white text-decoration-none">
                View Products <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-dark text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Total Orders
                  </h6>
                  <h2 className="card-title mb-0">{stats.totalOrders}</h2>
                </div>
                <FaShoppingCart size={40} className="text-warning" />
              </div>
            </div>
            <div className="card-footer bg-transparent border-0">
              <Link to="/orders" className="text-white text-decoration-none">
                View Orders <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-dark text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Total Revenue
                  </h6>
                  <h2 className="card-title mb-0">
                    ₱{stats.totalRevenue.toFixed(2)}
                  </h2>
                </div>
                <FaMoneyBillWave size={40} className="text-danger" />
              </div>
            </div>
            <div className="card-footer bg-transparent border-0">
              <Link to="/orders" className="text-white text-decoration-none">
                View Details <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders and Low Stock Products */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card bg-dark text-white h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Recent Orders</h5>
            </div>
            <div className="card-body">
              {stats.recentOrders.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentOrders.map((order) => (
                        <tr key={order.order_id}>
                          <td>#{order.order_id}</td>
                          <td>
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td>₱{Number(order.total_amount).toFixed(2)}</td>
                          <td>
                            <span
                              className={`badge ${
                                order.status === "completed"
                                  ? "bg-success"
                                  : "bg-secondary"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">No recent orders</p>
              )}
            </div>
            <div className="card-footer bg-transparent border-0">
              <Link to="/orders" className="btn btn-outline-light">
                View All Orders
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card bg-dark text-white h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Low Stock Products</h5>
            </div>
            <div className="card-body">
              {stats.lowStockProducts.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Current Stock</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.lowStockProducts.map((product) => (
                        <tr key={product.product_id}>
                          <td>{product.product_name}</td>
                          <td>
                            <span
                              className={`badge ${
                                product.quantity < 5
                                  ? "bg-danger"
                                  : "bg-warning"
                              }`}
                            >
                              {product.quantity}
                            </span>
                          </td>
                          <td>₱{Number(product.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">No low stock products</p>
              )}
            </div>
            <div className="card-footer bg-transparent border-0">
              <Link to="/products" className="btn btn-outline-light">
                Manage Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-12">
          <div className="card bg-dark text-white">
            <div className="card-header">
              <h5 className="card-title mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-flex gap-3">
                <Link to="/pos" className="btn btn-primary">
                  <FaShoppingCart className="me-2" />
                  New Sale
                </Link>
                <Link to="/products" className="btn btn-success">
                  <FaStore className="me-2" />
                  Add Product
                </Link>
                <Link to="/users" className="btn btn-info">
                  <FaUsers className="me-2" />
                  Add User
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
