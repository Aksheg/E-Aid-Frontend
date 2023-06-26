import { useState } from "react";
import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "./resetpassword.css";
import OTPPage from "../../components/ResetPassword Component/OTPInput";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_URL;
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  // const [otpSent, setOtpSent] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/password/forgot`, {
        email: email,
      });
      document.cookie = response.data.token;
      if (response.data.message === "User not found, kindly register first") {
        toast.error(response.data.message);
        setTimeout(() => {
          navigate("/signup");
        }, 3000);
      } else {
        toast.success(response.data.message);
      }
      if (
        response.data.message === "OTP resent successfully" ||
        response.data.message === "OTP sent successfully"
      ) {
        // setOtpSent(true);
        setTimeout(() => {
          // setOtpSent(false);
          setEmailVerified(true);
        }, 5000);
        localStorage.setItem("message", JSON.stringify(response.data.message));
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      toast.error(error.response.data.error);
      console.error(error);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  if (emailVerified) {
    return <OTPPage />;
  }

  return (
    <div className="forgot-password-wrapper">
      <div className="reset-password-main">
        {!emailVerified && (
          <div className="reset-container">
            <form className="reset-form" onSubmit={handleResetPassword}>
              <div className="reset-main-form">
                <h2 className="reset-heading">Forgot Password</h2>
                <p className="forgot-content justify-center">
                  Enter the email associated with your account and we'll send an
                  email with instructions to reset your password
                </p>
                <label htmlFor="email">Email</label>
                <div className="input-container">
                  <HiOutlineMail className="icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit">Reset Password</button>
              <p className="backtologin" onClick={handleBackToLogin}>
                Back to Login
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
