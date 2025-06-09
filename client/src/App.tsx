import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import Users from "./components/pages/Users";
import Roles from "./components/pages/role/Roles";
import POS from "./components/pages/POS";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="d-flex bg-dark text-white">
        <Sidebar />
        <div className="flex-grow-1 p-4 " style={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/pos" element={<POS />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
