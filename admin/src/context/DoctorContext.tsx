// AppContext.tsx
import { createContext, ReactNode, useMemo } from "react";

interface DoctorContextValue {
  
}

export const DoctorContext = createContext<DoctorContextValue | undefined>(undefined);

interface DoctorContextProviderProps {
  children: ReactNode;
}

const DoctorContextProvider: React.FC<DoctorContextProviderProps> = ({ children }) => {
  const value = useMemo(() => ({

  }), []);

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
