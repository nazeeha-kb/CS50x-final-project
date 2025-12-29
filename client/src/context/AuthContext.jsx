// AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/status");
        if (res.data.logged_in) {
          setUser({ id: res.data.user_id, username: res.data.username });
        }
        else {
          setUser(null)
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
        setUser(null);
      }
    };
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
