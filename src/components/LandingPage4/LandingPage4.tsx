import logo from "../images/logo.png";
import "./LandingPage4.css";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const LandingPageFour = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-img-container">
          <img className="footer-image" src={logo} />
        </div>

        <div className="footer-titles">
          <h6 className=""> Home</h6>
          <h6 className=""> About E - Aid </h6>
          <h6 className=""> Contact </h6>
        </div>
        <div className=" footer-line"></div>
        <div className="footer-last">
          <p className="footer-copyright">© 2023 E-Aid. All rights reserved.</p>
          <div className="footer-icons">
            <a href="" className="footer-icons > fb">
              <FaFacebook />
            </a>
            <a href="#" className="footer-icons > tw">
              <FaTwitter />
            </a>
            <a href="#" className="footer-icons > in">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingPageFour;
