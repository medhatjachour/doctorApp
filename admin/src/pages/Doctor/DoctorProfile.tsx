import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken,backendUrl, doctorProfile, setDoctorsProfile, getDoctorProfile } =
    useContext(DoctorContext) || {};
  const { currencySymbol } = useContext(AppContext) || {};

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updatedData = {
        address:doctorProfile?.address,
        fees:doctorProfile?.fees,
        available:doctorProfile?.available,
      };
      const { data } = await axios.post(
        backendUrl + "api/doctor/update-profile",
        updatedData,
        { headers: { dToken } }
      );
      if (data.success&&getDoctorProfile) {
        setIsEdit(false);
        getDoctorProfile()
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if (dToken && getDoctorProfile) {
      getDoctorProfile();
    }
  }, [dToken, getDoctorProfile]);
  
  return (
    doctorProfile && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              src={doctorProfile.image}
              alt={doctorProfile.name}
            />
          </div>
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* doc info */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {doctorProfile.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {doctorProfile.degree} - {doctorProfile.speciality}
              </p>
              <button className="py-0.5 border border-stone-100 text-xs rounded-full">
                {doctorProfile.experience}
              </button>
            </div>
            {/* doc about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="long-text text-sm text-gray-600 max-w-[700px] mt-1">
                {doctorProfile.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              {isEdit ? (
                <input
                  type="number"
                  value={doctorProfile.fees}
                  onChange={(e) =>
                    setDoctorsProfile &&
                    setDoctorsProfile((perv) => ({
                      ...perv,
                      fees: Number(e.target.value),
                    }))
                  }
                />
              ) : (
                <span className="text-gray-800">
                  {currencySymbol} {doctorProfile.fees}
                </span>
              )}
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    value={doctorProfile?.address.line1}
                    onChange={(e) =>
                      setDoctorsProfile &&
                      setDoctorsProfile((perv) => ({
                        ...perv,
                        address: { ...perv.address, line1: e.target.value },
                      }))
                    }
                  />
                ) : (
                  <span>{doctorProfile?.address?.line1}</span>
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    value={doctorProfile.address.line2}
                    onChange={(e) =>
                      setDoctorsProfile &&
                      setDoctorsProfile((perv) => ({
                        ...perv,
                        address: { ...perv.address, line2: e.target.value },
                      }))
                    }
                  />
                ) : (
                  <span>{doctorProfile?.address?.line2}</span>
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                checked={doctorProfile.available}
                onChange={() =>
                  isEdit &&
                  setDoctorsProfile &&
                  setDoctorsProfile((perv) => ({
                    ...perv,
                    available: !perv.available,
                  }))
                }
                type="checkbox"
                name=""
                id="AvailabilityForDoc"
              />
              <label htmlFor="AvailabilityForDoc">Available</label>
            </div>
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:text-white transition-all hover:bg-primary cursor-pointer "
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:text-white transition-all hover:bg-primary cursor-pointer "
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
