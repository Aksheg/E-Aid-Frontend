import React, { useEffect, useState } from "react";
import "./RegistrationPage.css";
import InputComponent from "./InputComponent";
import axios from "axios";
import redCross from "../../assets/Vector.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;
const RegistrationPage = () => {
  const navigate = useNavigate();
  const [text, setText] = useState({
    email: "",
    fullName: "",
    phone: "",
    role: "user",
    password: "",
  });
  const [cookie, setCookie, removeCookie] = useCookies<string>(["token"]);
  const url = `${baseUrl}/auth/register`;
  const googleSignUpUrl = `${baseUrl}/auth/google`;

  const handleGoogleSignUp = async () => {
    window.location.href = googleSignUpUrl;
  };
  useEffect(() => {
    if (cookie && Object.values(cookie).length !== 0) {
      localStorage.setItem("googleToken", JSON.stringify(cookie));
      navigate("/dashboard");
    } else {
      return;
    }
  }, []);
  const checkAdmin = (email: string) => {
    if (email.includes(".admin")) {
      return email.slice(0, email.indexOf(".admin"));
    }
    return email;
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.setItem("email", JSON.stringify(checkAdmin(text.email)));
      const resp = await axios.post(url, text);
      if (resp.data.message === "Check email for verification OTP") {
        localStorage.setItem("message", JSON.stringify(resp.data.message));
        toast.success(resp.data.message);
        setText({
          email: "",
          fullName: "",
          phone: "",
          role: "User",
          password: "",
        });
        setTimeout(() => {
          navigate("/verify");
          localStorage.removeItem("message");
        }, 3000);
      } else if (resp.data.message === "Admin registered successfully") {
        toast.success(resp.data.message);
        setText({
          email: "",
          fullName: "",
          phone: "",
          role: "User",
          password: "",
        });
        setTimeout(() => {
          navigate("/login");
          localStorage.removeItem("email");
        }, 3000);
      } else {
        toast.error(resp.data.message);
        localStorage.removeItem("email");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
      localStorage.removeItem("email");
    }
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setText((prevText) => ({
      ...prevText,
      [name]: value,
    }));
  };

  return (
    <div className="signup-reg">
      <div className="signup-right">
        <Link to="/">
          <img src={redCross} alt="red cross" />
        </Link>
        <h2 className="register-h2">Let's get you registered</h2>
        <p>Get an account today and start enjoying our benefits</p>
        {/* <h1 className="animate">E-AID</h1> */}
      </div>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <button id="google" onClick={handleGoogleSignUp}>
            Sign Up With Google
          </button>
          <div className="main-line">
            <div className="line"></div> <span className="p-line">Or</span>{" "}
            <div className="line2"></div>
          </div>

          <div className="inputDiv">
            <label>Email address</label>
            <InputComponent
              type="email"
              className="input-field"
              value={text.email}
              placeholder="Name@companyemail.com"
              name="email"
              required={true}
              disabled={false}
              onChange={handleInputChange}
            />
          </div>

          <div className="inputDiv">
            <label>Full Name</label>
            <InputComponent
              type="text"
              className="input-field"
              value={text.fullName}
              placeholder="John Doe"
              name="fullName"
              required={true}
              disabled={false}
              onChange={handleInputChange}
            />
          </div>

          <div className="inputDiv">
            <label>Phone Number</label>
            <InputComponent
              type="text"
              className="input-field"
              value={text.phone}
              placeholder="+234 800 0000 000"
              name="phone"
              required={true}
              disabled={false}
              onChange={handleInputChange}
            />
          </div>

          <div className="inputDiv">
            <label>Password</label>
            <InputComponent
              type="password"
              className="input-field"
              value={text.password}
              placeholder="Password123@"
              name="password"
              required={true}
              disabled={false}
              onChange={handleInputChange}
            />
          </div>

          <div className="inputDiv">
            <button type="submit" className="submit">
              Sign Up
            </button>
          </div>
          <div className="questions">
            <p>
              Already a member?{" "}
              <a href="/login" className="red">
                Sign In
              </a>
            </p>
            <Link to="/doctor-signup">Are you a Doctor?</Link>
          </div>
        </form>
      </div>
    </div>
  );
  setCookie("drink", "hello");
  removeCookie("drink");
};

export default RegistrationPage;
