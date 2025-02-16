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
import {
  AppointmentInterface,
  DashboardInterface,
  DoctorsInterface,
} from "../types/doctorsTypes";

interface AdminContextValue {
  setAToken: (token: string) => void;
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentInterface[]>>;
  getDashboardData: () => void;
  getAllDoctors: () => void;
  getAllAppointments: () => void;
  changeAvailability: (docId: string) => void;
  cancelAppointment: (appointmentId: string) => void;
  aToken: string | null;
  backendUrl: string;
  dashData: DashboardInterface;
  doctors: DoctorsInterface[];
  appointments: AppointmentInterface[];
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
  const [dashData, setDashData] = useState({});
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/admin/all-doctors", {
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

  const getAllAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "api/admin/all-appointments",
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        setAppointments(data.appointments);
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

  const changeAvailability = useCallback(
    async (docId: string) => {
      try {
        const { data } = await axios.post(
          backendUrl + "api/admin/change-availability",
          { docId },
          { headers: { aToken } }
        );
        if (data.success) {
          toast.success(data.message);
          getAllDoctors();
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
    [aToken, backendUrl, getAllDoctors]
  );

  const cancelAppointment = useCallback(
    async (appointmentId: string) => {
      try {
        const { data } = await axios.post(
          backendUrl + "api/admin/cancel-appointments",
          { appointmentId },
          { headers: { aToken } }
        );
        if (data.success) {
          toast.success(data.message);
          getAllAppointments();
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
    [aToken, backendUrl, getAllAppointments]
  );

  const getDashboardData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/admin/dashboard", {
        headers: { aToken },
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
  }, [aToken, backendUrl]);

  const value = useMemo(
    () => ({
      aToken,
      setAToken,
      backendUrl,
      getDashboardData,
      dashData,
      doctors,
      appointments,
      setAppointments,
      cancelAppointment,
      getAllDoctors,
      getAllAppointments,
      changeAvailability,
    }),
    [
      aToken,
      backendUrl,
      doctors,
      appointments,
      getAllDoctors,
      getAllAppointments,
      changeAvailability,
      cancelAppointment,
      dashData,
      getDashboardData,
    ]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
