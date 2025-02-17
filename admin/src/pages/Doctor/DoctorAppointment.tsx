import  { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {

    const { calculateAge, formatDate, currencySymbol } =
      useContext(AppContext) || {};
    const { dToken, appointments, getDoctorAppointments ,cancelAppointmentByDoc,CompleteAppointmentByDoc} =
      useContext(DoctorContext) || {};
  
    useEffect(() => {
      if (dToken && getDoctorAppointments) {
        getDoctorAppointments();
      }
    }, [dToken, getDoctorAppointments]);
  return (
    <div className="w-full max-w-6xl m-5 ">
         <p className="mb-3 text-lg font-medium">All Appointments</p>
         <div className="bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
           <div className="border-gray-200 hidden  sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
             <p>#</p>
             <p>Patient</p>
             <p className='text-center' >Payment</p>
             <p> Age </p>
             <p> Date & Time </p>
             <p> Fees </p>
             <p> Actions </p>
           </div>
           {appointments?.reverse().map((appointment, index) => (
             <div
               className="flex flex-wrap justify-between  max-sm:text-base max-sm:gap-5 sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1.5 items-center text-gray-500 py-3 px-6 border-gray-200 border-b hover:bg-gray-50"
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
               <p className='text-center'><span  className='m-auto text-xs inline border border-primary px-2 rounded-full' > {appointment.payment ? 'Online' : 'Cash'}</span></p>
               <p>
                 {calculateAge
                   ? calculateAge(appointment.userData.dob)
                   : "Age not available"}
               </p>
               <p>
                 {formatDate ? formatDate(appointment.slotDate) : ""} ,{" "}
                 {appointment?.slotTime}
               </p>
   
               <p>
                 {currencySymbol} 
                 {appointment.amount}
               </p>
               {appointment.cancelled || appointment.isCompleted ? (
                <div>
                {appointment.cancelled ?<p className="text-red-400 text-xs font-medium"> cancelled </p>:<p className="text-green-500 text-xs font-medium"> completed </p>}
                 
                 </div>
               ) : (
                <div className='flex gap-1'>
                {/* <button> */}
                 <button onClick={()=>cancelAppointmentByDoc && cancelAppointmentByDoc(appointment._id)}>
                 <img
                 
                   className="w-10 cursor-pointer"
                   src={assets.cancel_icon}
                   alt="cancel"
                 />
                 </button>
                 
                {/* <button> */}
                 <button onClick={()=>CompleteAppointmentByDoc && CompleteAppointmentByDoc(appointment._id)}>
                 <img
                 
                   className="w-10 cursor-pointer"
                   src={assets.tick_icon}
                   alt="cancel"
                 />
                 </button>
                 </div>

               )}
             </div>
           ))}
         </div>
       </div>
  )
}

export default DoctorAppointment