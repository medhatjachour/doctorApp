import { createContext, ReactNode, useMemo } from "react";
import { doctors } from "../assets/assets";
import { DoctorsInterface } from '../types/doctorsTypes';


export const AppContext = createContext<DoctorsInterface | undefined>(undefined)

interface AppContextProviderProps {
    children: ReactNode;
  }
const AppContextProvider:React.FC<AppContextProviderProps> = ({ children}) => {
    const value = useMemo(() => ({ doctors }), []);
  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};
export default AppContextProvider;