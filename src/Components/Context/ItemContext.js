import { createContext, useContext } from "react";

export const ItemsContext = createContext(null);

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsContextProvider');
  }
  return context;
}; 