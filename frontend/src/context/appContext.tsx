import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { DoctorsInterface, User } from "../types/doctorsTypes";
import axios from "axios";
import { toast } from "react-toastify";

interface AppContextValue {
  doctors: DoctorsInterface;
  currencySymbol: string;
  getDoctorsData: () => void;
  loadUserProfileData: () => void;
  backendUrl: string;
  token: string | null;
  setToken: (token: string) => void;
  setUserData: (user: User) => void;
  userData: User | null;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const currencySymbol = "$";
  const [doctors, setDoctors] = useState<DoctorsInterface>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  const getDoctorsData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/doctor/list");
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
  }, [backendUrl]);

  useEffect(() => {
    getDoctorsData();
  }, [getDoctorsData]);

  const loadUserProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
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
  }, [backendUrl, token]);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token, loadUserProfileData]);

  const value = useMemo(
    () => ({
      doctors,
      userData,
      setUserData,
      loadUserProfileData,
      currencySymbol,
      getDoctorsData,
      token,
      setToken,
      backendUrl
    }),
    [backendUrl, doctors, getDoctorsData, token, userData]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
