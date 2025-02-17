import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
const AllAppointments = () => {
  const { calculateAge, formatDate, currencySymbol } =
    useContext(AppContext) || {};
  const { aToken, appointments, getAllAppointments,cancelAppointment } =
    useContext(AdminContext) || {};

  useEffect(() => {
    if (aToken && getAllAppointments) {
      getAllAppointments();
    }
  }, [aToken,getAllAppointments]);

  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="border-gray-200 hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p> Age </p>
          <p> Date & Time </p>
          <p> Doctor </p>
          <p> Fees </p>
          <p> Actions </p>
        </div>
        {appointments?.map((appointment, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-gray-200 border-b hover:bg-gray-50"
            key={appointment?._id}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={appointment.userData.image}
                alt={appointment.userData.name}
              />
              <p>{appointment.userData.name}</p>
            </div>
            <p>
              {calculateAge
                ? calculateAge(appointment.userData.dob)
                : "Age not available"}
            </p>
            <p>
              {formatDate ? formatDate(appointment.slotDate) : ""} ,{" "}
              {appointment?.slotTime}
            </p>

            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={appointment.docData.image}
                alt={appointment.docData.name}
              />
              <p>{appointment.docData.name}</p>
            </div>
            <p>
              {currencySymbol}
              {appointment.amount}
            </p>
            {appointment.cancelled ? (
              <p className="text-red-400 text-xs font-medium"> cancelled </p>
            ) : (
              <button onClick={()=>cancelAppointment && cancelAppointment(appointment._id)}>
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
  );
};

export default AllAppointments;
