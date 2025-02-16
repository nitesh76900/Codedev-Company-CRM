import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = Cookies.get("token");
    useEffect(() => {
        if (!token) {

      console.warn("No token found, redirecting to login.");
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) return null; // Prevent rendering protected content before redirecting

  console.log("Pass: User is authenticated.");
  return children;
};

export default ProtectedRoute;
