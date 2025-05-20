import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Verifica si hay usuario en localStorage al recargar la página
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('clienteData') || localStorage.getItem('adminData'));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (userData, tipo) => {
    if (tipo === 'cliente') localStorage.setItem('clienteData', JSON.stringify(userData));
    else localStorage.setItem('adminData', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('clienteData');
    localStorage.removeItem('adminData');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
