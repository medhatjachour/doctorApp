import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList: React.FC = () => {
  const adminContext = useContext(AdminContext);

  const {
    doctors = [],
    aToken,
    getAllDoctors,
    changeAvailability,
  } = adminContext || {};

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
        {doctors.length ? (
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
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <input
                      onChange={() =>
                        changeAvailability &&
                        changeAvailability( doctor._id )
                      }
                      type="checkbox"
                      checked={doctor.available}
                      name="available"
                      id={`available-${doctor._id}`} // Unique id for each checkbox
                    />
                    <label  className="cursor-pointer hover:text-gray-700"  htmlFor={`available-${doctor._id}`}>Available</label>
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
