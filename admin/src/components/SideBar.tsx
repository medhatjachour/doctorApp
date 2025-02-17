import { useContext } from "react";
import { AdminContext } from "../context/AdminContext"; // Ensure AdminContext is correctly imported
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const SideBar = () => {
  const adminContext = useContext(AdminContext);
  const { aToken } = adminContext || {};

  const doctorContext = useContext(DoctorContext);
  const { dToken } = doctorContext || {};

  return (
    <div className="min-h-screen bg-white border-r border-gray-200">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          
          
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}`} to={"/admin-dashboard"}>
            <img src={assets.home_icon} alt="home_icon" />
            <p  className="hidden md:block">DashBoard</p>
          </NavLink>
          
          <NavLink  className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64  cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}`}  to={"/all-appointments"}>
            <img src={assets.appointment_icon} alt="appointment_icon" />
            <p  className="hidden md:block">Appointments</p>
          </NavLink>
          
          <NavLink  className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64  cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}`}  to={"/add-doctor"}>
            <img src={assets.add_icon} alt="add_icon" />
            <p  className="hidden md:block">Add Doctor</p>
          </NavLink>
          
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64  cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}`}   to={"/doctor-list"}>
            <img src={assets.people_icon} alt="people_icon" />
            <p  className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}
        {dToken && (
        <ul className="text-[#515151] mt-5">
          
          
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}`} to={"/doctor-dashboard"}>
            <img src={assets.home_icon} alt="home_icon" />
            <p className="hidden md:block">DashBoard</p>
          </NavLink>
          
          <NavLink  className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64  cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}`}  to={"/doctor-appointments"}>
            <img src={assets.appointment_icon} alt="appointment_icon" />
            <p  className="hidden md:block">Appointments</p>
          </NavLink>
       
          
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64  cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}`}   to={"/doctor-profile"}>
            <img src={assets.people_icon} alt="people_icon" />
            <p  className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default SideBar;
