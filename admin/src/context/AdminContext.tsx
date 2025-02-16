// AppContext.tsx
import axios from "axios";
import { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {  DoctorsInterface } from "../types/doctorsTypes";

interface AdminContextValue {
  setAToken: (token: string) => void;
  getAllDoctors: () => void;
  changeAvailability:(docId :  string ) => void; 
  aToken: string | null;
  backendUrl: string;
  doctors: DoctorsInterface;
}

export const AdminContext = createContext<AdminContextValue | undefined>(
  undefined
);

interface AdminContextProviderProps {
  children: ReactNode;
}

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({
  children,
}) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = useCallback(async () => {
      try {
        const { data } = await axios.get(backendUrl + 'api/admin/all-doctors', {
          headers: { aToken },
        });
        if (data.success) {
          setDoctors(data.doctors);
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
    }, [aToken, backendUrl]);

    const changeAvailability = useCallback(async(docId:string)=>{
      try {
        const {data}  = await axios.post(backendUrl + 'api/admin/change-availability',{docId},{headers:{aToken}})
        if(data.success){

          toast.success(data.message);
          getAllDoctors()
        }else{
          
          toast.error(data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    }, [aToken, backendUrl, getAllDoctors]);

  const value = useMemo(
    () => ({
      aToken,
      setAToken,
      backendUrl,
      doctors,
      getAllDoctors,
      changeAvailability
    }),
    [aToken, backendUrl,doctors,getAllDoctors,changeAvailability]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
