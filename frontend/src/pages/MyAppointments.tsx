import { useContext } from "react";
import { AppContext } from "../context/appContext";

const MyAppointments = () => {
  const context = useContext(AppContext) || {
    doctors: [],
   
  };
  const { doctors } = context;

  return (
    <div>
      <p className="pb-3 mt-12 font-medium">My appointments</p>
      <div>
        {doctors.slice(0, 5).map((doctor, index) => (
          <div className="w-full grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
            <div>
              <img className="w-32 bg-indigo-50" src={doctor.image} alt="doctor" />
              </div>
              
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{doctor.name}</p>
                <p>{doctor.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address</p>
                <p className="text-xs">{doctor.address.line1}</p>
                <p  className="text-xs">{doctor.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">Date & Time:</span> 25m jul 2004| 8:30 pmm
                </p>
              
            </div>
            <div></div>
              <div className="flex flex-col gap-2 justify-end">
                <button className="text-sm text-stone-500 sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300" >Pay Online </button>
                <button className="text-sm text-stone-500 sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300">Cancel Appointment</button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
