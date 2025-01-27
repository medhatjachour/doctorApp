import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
const Navbar = () => {
  const navigate = useNavigate();

//   const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  return (
    <div className=" flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
       <NavLink to="/"><img className=" w-44 cursor-pointer" src={assets.logo} alt="logo" /></NavLink>
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/Contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className=" flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className=" w-8 rounded-full"
              src={assets.profile_pic}
              alt="profile pic"
            />
            <img
              className=" w-2.5"
              src={assets.dropdown_icon}
              alt=" dropdown_icon"
            />
            <div className=" absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-10 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded-lg flex-col gap-4 px-4 py-2">
                <button
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer py-2"
                >
                  My Profile
                </button>

                <button
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer py-2"
                >
                  My Appointments
                </button>
                <button  onClick={() => setToken(false)} className="hover:text-black cursor-pointer py-2">
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full float-right hidden md:block "
          >
            Create account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
