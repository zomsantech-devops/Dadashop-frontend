import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute = ({ component: Component }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const rawToken = localStorage.getItem("token");
      if (!rawToken) {
        navigate("/login");
        return;
      }

      const token = rawToken.replace(/"/g, "");
      try {
        await axios.get(`${process.env.REACT_APP_API}/auth/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error: any) {
        console.error("Authentication failed", error.response?.data);
        navigate("/login");
      }
    };

    checkAuthentication();
  }, [navigate]);

  return <Component />;
};

export default ProtectedRoute;
