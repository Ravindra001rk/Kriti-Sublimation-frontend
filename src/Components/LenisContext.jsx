import { createContext, useContext } from "react";

const LenisContext = createContext(null);

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) {
    console.warn("useLenis must be used within LenisProvider");
  }
  return context;
};

export default LenisContext;
