import { useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";
import "../../components/ResetPassword Component/resetpassword.css";

const DoctorSuccess: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="success-container">
      <section className="success-card">
        <IoIosCheckmarkCircle className="check-mark" />
        <h1 className="success-h1">Successful</h1>
        <div className="paras doctor-p">
          <p>Your registration is successful.</p>
          <p>Our team will review your CV and get back to you shortly.</p>
          <p>Kindly expect a verification status email from our team</p>
        </div>
        <button className="backto-login" onClick={handleClick}>
          Back to Homepage
        </button>
      </section>
    </div>
  );
};

export default DoctorSuccess;
