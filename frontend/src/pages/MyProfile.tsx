import { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import { User } from "../types/doctorsTypes";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const appContext = useContext(AppContext);
  const { token, backendUrl, loadUserProfileData, userData, setUserData } =
    appContext || {};

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const handleInputChange = (field: keyof User, value: string | number) => {
    if (setUserData && userData) {
      setUserData({
        ...userData,
        [field]: value,
      });
    }
  };

  const handleAddressChange = (field: keyof User["address"], value: string) => {
    if (setUserData && userData) {
      setUserData({
        ...userData,
        address: { ...userData.address, [field]: value },
      });
    }
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      console.log(userData);
      formData.append('name', userData ? userData.name : "");
      formData.append('phone', userData ? userData.phone : "");
      formData.append(
        'address',
        userData ? JSON.stringify(userData.address) : ""
      );
      formData.append('gender', userData ? userData.gender : "");
      formData.append('dob', userData ? userData.dob.toString() : "");

      if (image) {
        formData.append('image', image);
      }
      const { data } = await axios.post(
        backendUrl + "api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        if (loadUserProfileData) {
          loadUserProfileData();
        }
        toast.success(data.message);
        setIsEdit(false);
        setImage(null);
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
  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-70"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              <img
                className={`${image ? "hidden" :'block'} w-10 absolute bottom-12 right-12`}
                src={image ? "" : assets.upload_icon}
                alt="upload_icon"
              />
            </div>
            <input
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="userImage" />
        )}
        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={userData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <p className="text-neutral-500 underline mt-3 ">
            CONTACT INFORMATION
          </p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 ">
            <p className="font-medium">Email Id:</p>
            <p className="text-blue-500">{userData.email}</p>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-52"
                type="text"
                value={userData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <p>
                <input
                  className="bg-gray-50"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) => handleAddressChange("line1", e.target.value)}
                />
                <br />
                <input
                  className="bg-gray-50"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) => handleAddressChange("line2", e.target.value)}
                />
              </p>
            ) : (
              <p className="text-gray-400">
                {userData.address.line1} <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-neutral-500 underline mt-3 ">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="max-w-20 bg-gray-100"
                value={userData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) => handleInputChange("dob", e.target.value)}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
              onClick={updateUserProfileData}
            >
              Save information
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
