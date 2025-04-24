import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const NameContext = createContext();

export const NameProvider = ({ children }) => {
  const [nameInContext, setNameInContext] = useState("unknown");
  const nameSetRef = useRef(false); // this won't reset on re-render

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.displayName && !nameSetRef.current) {
        setNameInContext(user.displayName);
        console.log("email changes in context: 15: ", user.displayName);
        
        nameSetRef.current = true; // lock it in!
      }
    });

    return () => unsubscribe();
  }, []); // Only run once on mount

  return (
    <NameContext.Provider value={{ nameInContext, setNameInContext }}>
      {children}
    </NameContext.Provider>
  );
};

export const useName = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error("useName must be used within a NameProvider");
  }
  return context;
};
