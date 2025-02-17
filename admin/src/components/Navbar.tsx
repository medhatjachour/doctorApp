import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext"; // Ensure AdminContext is correctly imported
import { NavLink, useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar: React.FC = () => {
  const adminContext = useContext(AdminContext);
  const doctorContext = useContext(DoctorContext);
  const { aToken, setAToken } = adminContext || {};
  const { dToken, setDToken } = doctorContext || {};


  const navigate = useNavigate()

  const logOut = () => {
    if (aToken&&setAToken) {
        navigate('/')
      setAToken("");
      if (setDToken)setDToken("");
      localStorage.removeItem("aToken");
      localStorage.removeItem("dToken");
    }else if ( dToken&& setDToken) {
      if (setDToken)setDToken("");
      localStorage.removeItem("dToken");
      navigate('/')
    }
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2 text-xs">
        
      <NavLink to={"/"}>
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="log_admin"
        />
        </NavLink>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      {aToken || dToken && <button className="bg-primary text-white text-sm px-10 py-2 rounded-xl cursor-pointer" onClick={logOut}>Log Out</button>}
    </div>
  );
};

export default Navbar;
