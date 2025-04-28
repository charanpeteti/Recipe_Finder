import React, { createContext, useState, useEffect,useContext  } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { auth } from '../services/firebase'; 

const AuthContext = createContext();

function useAuth() {
    return useContext(AuthContext);
  }

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth};