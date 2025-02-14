// AppContext.tsx
import { createContext, ReactNode, useMemo } from "react";

interface AppContextValue {
  
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const value = useMemo(() => ({

  }), []);

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
