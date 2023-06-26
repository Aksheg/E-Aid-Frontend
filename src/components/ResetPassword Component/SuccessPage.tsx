import { useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";
import "./resetpassword.css";

const PasswordResetSuccess: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className="success-container">
      <section className="success-card">
        <IoIosCheckmarkCircle className="check-mark" />
        <h1 className="success-h1">Successful</h1>
        <div className="paras">
          <p>Your password has been changed successfully.</p>
          <p>Login to access your account.</p>
        </div>
        <button className="backto-login" onClick={handleClick}>Go Back to Login</button>
      </section>
    </div>
  );
};

export default PasswordResetSuccess;
