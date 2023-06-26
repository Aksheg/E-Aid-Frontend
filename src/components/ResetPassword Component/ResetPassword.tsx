import { useState } from "react";
import "./resetpassword.css";
import { IoKeyOutline } from "react-icons/io5";
import axios from "axios";
import PasswordResetSuccess from "./SuccessPage";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [isReset, setIsReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword.length < 4) setError("minimum length for password is 4");
    // Code to reset password goes here
    try {
      const cookie = document.cookie;
      const response = await axios.post(
        `http://localhost:5000/password/reset`,
        {
          newPassword,
          confirmPassword,
          cookie,
        }
      );
      if (response.data.message === "Password changed successfully") {
        setIsReset(true);
        localStorage.setItem("message", JSON.stringify(response.data.message));
        localStorage.removeItem("otp");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  const renderError = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
    return <p style={{ color: "red" }}>{error}</p>;
  };

  if (isReset) {
    return <PasswordResetSuccess />;
  }

  return (
    <div className="reset-password-wrapper">
      <div className="reset-password-main">
        <div className="reset-container">
          <form onSubmit={handleSubmit} className="reset-form">
            <div className="reset-main-form">
              <h2 className="reset-heading">Reset Password</h2>

              <label htmlFor="newpass">New Password</label>
              <div className="input-container">
                <IoKeyOutline className="icon" />
                <input
                  type="password"
                  placeholder="Enter your new password"
                  id="newpass"
                  name="newpass"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                />
              </div>
              <label htmlFor="confirmpass">Confirm Password</label>
              <div className="input-container">
                <IoKeyOutline className="icon" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  id="confirmpass"
                  name="confirmpass"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit">Reset Password</button>
          </form>
          <div>{error && renderError()}</div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
