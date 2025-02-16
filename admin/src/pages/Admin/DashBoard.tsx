import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const DashBoard = () => {
  const { aToken, cancelAppointment, getDashboardData, dashData } =
    useContext(AdminContext) || {};

  useEffect(() => {
    if (aToken && getDashboardData) {
      getDashboardData();
    }
  }, [aToken, getDashboardData]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52  rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="icon_doc" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>{" "}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52  rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              className="w-14"
              src={assets.appointments_icon}
              alt="appointment_icon"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>{" "}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52  rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              className="w-14"
              src={assets.patients_icon}
              alt="patients_icon"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-200">
            <img src={assets.list_icon} alt="list_icon" />
            <p className="font-semibold">Lates Bookings</p>
          </div>
          <div className="pt-4 border border-t-0 border-gray-200">
            {dashData.latestAppointment?.map((item) => (
              <div className="flex items-center gap-3 px-6 py-3 hover:bg-gray-200" key={item._id}>
                <img className="rounded-full w-11" src={item.docData.image} alt={item.docData.name} />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-600">{item.slotDate}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">
                    {" "}
                    cancelled{" "}
                  </p>
                ) : (
                  <button
                    onClick={() =>
                      cancelAppointment && cancelAppointment(item._id)
                    }
                  >
                    <img
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt="cancel"
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DashBoard;
