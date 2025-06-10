import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import Users from "./components/pages/Users";
import Roles from "./components/pages/role/Roles";
import POS from "./components/pages/POS";
import Login from "./components/pages/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./style/sidebar.css";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <AuthProvider>
      <div className="app-layout">
        {isLoginPage ? (
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        ) : (
          <div className="app-body d-flex">
            <Sidebar />
            <main className="main-content flex-grow-1">
              <Routes>
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/roles" element={<Roles />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/pos" element={<POS />} />
                      </Routes>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        )}
      </div>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
