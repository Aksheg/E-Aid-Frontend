import { useState, useEffect, useRef, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./resetpassword.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = import.meta.env.VITE_BASE_URL;

const OTPInputs = () => {
  const [otpArr, setOTPArr] = useState(["", "", "", "", "", ""]);
  const [timerCount, setTimerCount] = useState(30);
  const [disable, setDisable] = useState(false);

  const otpInputs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (index: number, value: string) => {
    const newOTP = [...otpArr];
    newOTP[index] = value;
    setOTPArr(newOTP);

    if (value && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    } else if (!value && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const verifyOTP = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const cookie = document.cookie;

      const otp = Number(otpArr.join(""));
      localStorage.setItem("otp", JSON.stringify(otp));

      const response = await axios.post(`${baseUrl}/password/verify`, {
        otp: otp,
        cookie: cookie,
      });

      if (
        response.data.message ===
        "OTP verified successfully. Proceed to change your password"
      ) {
        localStorage.setItem("message", JSON.stringify(response.data.message));
        navigate("/reset-password");
      } else {
        toast.error(response.data.error);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.error);
      setOTPArr(["", "", "", "", "", ""]);
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (disable) {
      interval = setInterval(() => {
        setTimerCount((lastTimerCount) => {
          if (lastTimerCount <= 1) {
            clearInterval(interval);
            setDisable(false);
          }
          return lastTimerCount - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [disable]);

  const resendOTP = async () => {
    const emailFromStorage = localStorage.getItem("email");
    if (emailFromStorage) {
      const email = JSON.parse(emailFromStorage);
      const response = await axios.post(`${baseUrl}/password/forgot`, {
        email,
      });
      if (response.data.message === "OTP sent successfully") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setTimerCount(30);
      setDisable(true);
    }
  };

  return (
    <div className="otp-section">
      <div id="main">
        <form onSubmit={verifyOTP}>
          <h1 className="otp-h1">OTP Verification</h1>
          <p className="otp-p">We have sent a code to your email</p>
          <div className="otpInput">
            {otpArr.map((value, index) => (
              <input
                required
                key={index}
                type="text"
                maxLength={1}
                ref={(ref) => {
                  if (ref) {
                    otpInputs.current[index] = ref;
                  }
                }}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
          </div>

          <button type="submit">Verify OTP</button>

          <p className="otp-code-p">
            Didn't receive the code?{" "}
            <a
              className="otp-code-a"
              style={{
                color: disable ? "gray" : "#EB5757",
                cursor: disable ? "none" : "pointer",
                textDecorationLine: disable ? "underline" : "none",
              }}
              onClick={resendOTP}
            >
              {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OTPInputs;
