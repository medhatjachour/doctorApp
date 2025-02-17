import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorsList: React.FC = () => {
  const adminContext = useContext(AdminContext);

  const { doctors, aToken,backendUrl, getAllDoctors, changeAvailability } =
    adminContext || {};

  const handleDelete = async(docId:string)=>{
    try {
     

      const { data } = await axios.delete(
        `${backendUrl}api/admin/delete-doctor/${docId}`,
        {
          headers: { aToken }
        }
      );
      
        if (data.success&&getAllDoctors) {
          getAllDoctors()
        }
    }  catch(error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

    useEffect(() => {
    if (aToken && getAllDoctors) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  if (!adminContext) {
    return <div>Loading...</div>; // Handle the case where AdminContext is not available
  }

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll ">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors?.length ? (
          <>
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className=" border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
              >
                <img
                  className="min-h-56 bg-indigo-50 group-hover:bg-primary transition-all duration-500"
                  src={doctor.image}
                  alt={doctor.name}
                />
                <div className="p-4">
                  <p className="text-neutral-800 text-lg font-medium">
                    {doctor.name}
                  </p>
                  <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
                  <div className="c mt-2 flex justify-between  gap-1 text-sm">
                    <div>
                      <input
                        onChange={() =>
                          changeAvailability && changeAvailability(doctor._id)
                        }
                        type="checkbox"
                        checked={doctor.available}
                        name="available"
                        id={`available-${doctor._id}`} // Unique id for each checkbox
                      />
                      <label
                        className="cursor-pointer hover:text-gray-700"
                        htmlFor={`available-${doctor._id}`}
                      >
                        Available
                      </label>
                    </div>
                    <button onClick={()=>handleDelete(doctor._id)} className="px-4 py-1 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer duration-300">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>No doctors available</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
