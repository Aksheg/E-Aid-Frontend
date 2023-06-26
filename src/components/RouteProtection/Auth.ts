import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const AuthRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem("token");
    const googleToken = localStorage.getItem("googleToken");
    if (
      (userToken && JSON.parse(userToken) !== "undefined") ||
      (googleToken && Object.values(JSON.parse(googleToken)).length > 0)
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    checkUserToken();
  }, []);

  return isLoggedIn ? children : null;
};

export const AdminAuth = ({ children }: any) => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);

  const checkAdminToken = () => {
    const detailsFromStorage = localStorage.getItem("role");
    if (detailsFromStorage) {
      const adminDetails = JSON.parse(detailsFromStorage);
      if (adminDetails.role !== "admin") {
        setIsUser(true);
        navigate("/login");
      } else {
        setIsUser(false);
      }
    }
  };

  useEffect(() => {
    checkAdminToken();
  }, []);

  return !isUser ? children : null;
};
