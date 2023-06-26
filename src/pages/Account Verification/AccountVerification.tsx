import { useState, useRef, SyntheticEvent, useEffect } from "react";
import axios from "axios";
import "./AccountVerification.css";
import vectorImage from "./assets/Vector.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;

const AccountVerification: React.FC = () => {
  const navigate = useNavigate();

  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = async (index: number, value: string) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value === "") {
      if (index > 0) {
        otpInputs.current[index - 1]?.focus();
      }
    } else {
      if (index < otpInputs.current.length - 1) {
        otpInputs.current[index + 1]?.focus();
      } else {
        // Last value entered, submit the form
        const form = otpInputs.current[index].form;
        try {
          const enteredOTP = Number(newOTP.join(""));
          const response = await axios.post(`${baseUrl}/auth/verify-user`, {
            otp: enteredOTP,
          });
          const data = await response.data;
          toast.success(data.message);

          // Handle the response as needed

          if (response.data.message) {
            // OTP verification successful, navigate to login
            setTimeout(() => {
              form?.submit();
              navigate("/login");
              localStorage.removeItem("email");
            }, 3000);
          }
        } catch (error: any) {
          console.log(error.response.data.error);

          toast.error(error.response.data.error);

          setOTP(["", "", "", "", "", ""]);
          form?.submit();
        }
      }
    }
  };

  const verifyOTP = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const enteredOTP = Number(otp.join(""));

      const response = await axios.post(`${baseUrl}/auth/verify-user`, {
        otp: enteredOTP,
      });
      const data = await response.data;
      toast.success(data.message);

      // Handle the response as needed
      if (data.message) {
        // OTP verification successful, navigate to login
        localStorage.removeItem("userInfo");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error: any) {
      console.log(error.response.data.error);

      toast.error(error.response.data.error);
      setOTP(["", "", "", "", "", ""]);
    }
  };

  const resendOTP = async (event: SyntheticEvent) => {
    event.preventDefault(); // Prevent the default behavior of the link
    try {
      const emailFromStorage = localStorage.getItem("email");
      if (emailFromStorage) {
        const response = await axios.post(`${baseUrl}/auth/resend-token`, {
          email: JSON.parse(emailFromStorage),
        });
        toast.success(response.data.message);
      }
      // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Focus on the first OTP input when the component mounts
    otpInputs.current[0]?.focus();
  }, []);

  return (
    <div className="account-verification-container">
      <div className="main-block">
        <img className="icon-message" src={vectorImage} alt="icon" />
        <h1 className="email-check">Check your email</h1>
        <form onSubmit={verifyOTP}>
          <p className="first-paragraph">
            We sent a token to your email. Please click the link to activate
            your account.
          </p>
          <div className="otpInput">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(ref) => (otpInputs.current[index] = ref!)}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onFocus={(e) => {
                  if (
                    index === otpInputs.current.length - 1 &&
                    otp.join("").length === otpInputs.current.length - 1
                  ) {
                    const form = e.currentTarget.form;
                    form?.submit();
                  }
                }}
                required
              />
            ))}
          </div>
          <p className="second-paragraph">
            Didn't receive the email?{" "}
            <a href="#" onClick={resendOTP}>
              Click to Resend Token
            </a>
          </p>
          <div className="btn-block">
            <button type="submit">Verify</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountVerification;
