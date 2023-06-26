import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OTPAuthRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const [isOTP, setIsOTP] = useState(false);

  const checkUserMessage = () => {
    const userMessage = localStorage.getItem("message");
    if (!userMessage || userMessage === "undefined") {
      navigate("/login");
    } else {
      setIsOTP(true);
    }
  };

  useEffect(() => {
    checkUserMessage();
  }, []);

  if (!isOTP) {
    return null; // Render nothing if not authenticated
  }

  return children;
};

export default OTPAuthRoute;
