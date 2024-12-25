import React, { createContext, useContext, useState } from 'react';

// Create the context
const NameContext = createContext();

// Create a Provider component
export const NameProvider = ({ children }) => {
  const [name, setName] = useState("unknown");

  return (
    <NameContext.Provider value={{ userName:name, setUserName: setName }}>
      {children}
    </NameContext.Provider>
  );
};

// Hook to use the NameContext
export const useName = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error("useName must be used within a NameProvider");
  }
  return context;
};
