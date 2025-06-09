import { GoHomeFill } from "react-icons/go";
import { BiSolidDashboard } from "react-icons/bi";
import { FaStore } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { FaReceipt } from "react-icons/fa6";
import { FaCashRegister } from "react-icons/fa6";
import logo from "../assets/logo.png";
import logoSnack from "../assets/SnackHub v2.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { title: "Home", icon: <GoHomeFill className="me-2" />, path: "/" },
    {
      title: "Dashboard",
      icon: <BiSolidDashboard className="me-2" />,
      path: "/dashboard",
    },
    { title: "Roles", icon: <FaUserGear className="me-2" />, path: "/roles" },
    { title: "Users", icon: <FaUser className="me-2" />, path: "/users" },
    {
      title: "Products",
      icon: <FaStore className="me-2" />,
      path: "/products",
    },
    {
      title: "POS",
      icon: <FaCashRegister className="me-2" />,
      path: "/pos",
    },
  ];
  return (
    <div className="logo sidebar d-flex flex-column p-3 text-white">
      <img src={logoSnack} alt="SnackHub Logo" className="logo2" />
      <img src={logo} alt="Logo" className="logo" />
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((menuItem, index) => (
          <li className="nav-item mb-2" key={index}>
            <Link to={menuItem.path} className="nav-link text-white">
              {menuItem.icon}
              {menuItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
