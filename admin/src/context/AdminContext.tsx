// AppContext.tsx
import { createContext, ReactNode, useMemo, useState } from "react";

interface AdminContextValue {
  setAToken: (token: string) => void;
  aToken: string | null;
  backendUrl: string;
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
  const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):"");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const value = useMemo(
    () => ({
      aToken,
      setAToken,
      backendUrl,
    }),
    [aToken,backendUrl]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
