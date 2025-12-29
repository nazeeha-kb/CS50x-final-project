import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Redirects user to signup page if not logged in and tried to access restricted pages.
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

//   white it's fetching, return null
  if (user === undefined) {
    return null;
  }

//   if user == null redirect, else show page content
  return user ? children : <Navigate to="/signup" />;
};

export default PrivateRoute;
