// AppContext.tsx
import { createContext, ReactNode, useMemo } from "react";

interface AppContextValue {
  calculateAge: (dob: string) => number; // Return type should be number
  formatDate: (dateStr: string) => string;
  currencySymbol: string;
}


export const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const currencySymbol = "$";

  const calculateAge = (dob:string)=>{
    const today = new Date()
    const birthDate = new Date(dob)
    const age = today.getFullYear()-birthDate.getFullYear()
    return age
  }
  function formatDate(dateStr: string): string {
    const [day, month, year] = dateStr.split("-").map(Number);
  
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    const formattedDate = `${day} ${months[month - 1]}, ${year}`;
    return formattedDate;
  }
  const value = useMemo(() => ({
    currencySymbol,
    calculateAge,
    formatDate
  }), []);

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
