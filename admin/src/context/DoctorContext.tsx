// AppContext.tsx
import axios from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { AppointmentInterface, DocDashboardInterface, Doctor } from "../types/doctorsTypes";

interface DoctorContextValue {
  backendUrl: string;
  dToken: string | null;
  dashData: DocDashboardInterface;
  doctorProfile:Doctor
  getDoctorAppointments: () => void;
  getDoctorProfile: () => void;
  setDToken: (token: string) => void;
  setDoctorsProfile:  React.Dispatch<React.SetStateAction<Doctor>>;
  appointments: AppointmentInterface[];
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentInterface[]>>;
  cancelAppointmentByDoc: (appointmentId: string) => void;
  CompleteAppointmentByDoc: (appointmentId: string) => void;
  getDocDashboardData: () => void;
  
  
}

export const DoctorContext = createContext<DoctorContextValue | undefined>(
  undefined
);

interface DoctorContextProviderProps {
  children: ReactNode;
}

const DoctorContextProvider: React.FC<DoctorContextProviderProps> = ({
  children,
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const [dashData, setDashData] = useState({});
  
  const [doctorProfile, setDoctorsProfile] = useState<Doctor>({} as Doctor);

  const getDoctorAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/doctor/appointments", {
        headers: { dToken },
      });
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
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
  }, [dToken, backendUrl]);

  const cancelAppointmentByDoc = useCallback(
    async (appointmentId: string) => {
      try {
        const { data } = await axios.post(
          backendUrl + "api/doctor/cancel-appointment",
          { appointmentId },
          { headers: { dToken } }
        );
        if (data.success) {
          toast.success(data.message);
          getDoctorAppointments();
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
    },
    [dToken, backendUrl, getDoctorAppointments]
  );

  const CompleteAppointmentByDoc = useCallback(
    async (appointmentId: string) => {
      try {
        const { data } = await axios.post(
          backendUrl + "api/doctor/complete-appointment",
          { appointmentId },
          { headers: { dToken } }
        );
        if (data.success) {
          toast.success(data.message);
          getDoctorAppointments();
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
    },
    [dToken, backendUrl, getDoctorAppointments]
  );

  const getDocDashboardData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/doctor/dashboard", {
        headers: { dToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        
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
  }, [dToken, backendUrl]);


  const getDoctorProfile = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/doctor/profile", {
        headers: { dToken },
      });
      if (data.success) {
        setDoctorsProfile(data.profileData);
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
  }, [dToken, backendUrl]);

  const value = useMemo(
    () => ({
      backendUrl,
      dToken,doctorProfile,
      setDToken,
      appointments,dashData,
      setAppointments,setDoctorsProfile,
      getDoctorAppointments,cancelAppointmentByDoc,CompleteAppointmentByDoc,getDocDashboardData,getDoctorProfile
    }),
    [backendUrl, dToken, doctorProfile, appointments, dashData, getDoctorAppointments, cancelAppointmentByDoc, CompleteAppointmentByDoc, getDocDashboardData,getDoctorProfile]
  );

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
