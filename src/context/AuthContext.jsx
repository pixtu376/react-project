import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (loginInput, passInput) => {
    if (loginInput === 'user' && passInput === '123456') {
      setUser({ 
        name: 'Иван Иванов', 
        email: 'ivan@greenstudy.com',
        avatar: 'https://placehold.co/100x100/4CAF50/FFF?text=IV'
      });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);