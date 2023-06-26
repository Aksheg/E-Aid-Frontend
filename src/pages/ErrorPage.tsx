import { useNavigate } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import "../components/ResetPassword Component/resetpassword.css";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="success-container">
      <section className="success-card">
        <IoIosCloseCircle className="check-mark" size={48} color="#eb5757" />
        <h1 className="success-h1">Error</h1>
        <div className="paras doctor-p">
          <p>You are dancing in the wrong route, please go back to base</p>
        </div>
        <button className="backto-login" onClick={handleClick}>
          Back to Homepage
        </button>
      </section>
    </div>
  );
};

export default ErrorPage;
