import React, { useState } from "react";
import "./RegistrationPage.css";
import InputComponent from "./InputComponent";
import axios from "axios";
import redCross from "../../assets/Vector.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import specialties from "./DoctorSpecialty";
import { InputField } from "../Login/input-field";
const baseUrl = import.meta.env.VITE_BASE_URL;

interface InputProps {
  email: string;
  fullName: string;
  phone: string;
  role: "doctor";
  password: string;
  specialty: string;
  CV: File | null;
}
const DoctorsRegistration = () => {
  const navigate = useNavigate();
  const [text, setText] = useState<InputProps>({
    email: "",
    fullName: "",
    phone: "",
    role: "doctor",
    password: "",
    specialty: "",
    CV: null,
  });
  const [selectedOption, setSelectedOption] = useState("");

  const url = `${baseUrl}/auth/doctor`;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData();
    formData.append("fullName", text.fullName);
    formData.append("email", text.email);
    formData.append("password", text.password);
    formData.append("phone", text.phone);
    formData.append("role", text.role);
    formData.append("specialty", text.specialty);
    if (text.CV) {
      formData.append("CV", text.CV);
    }
    try {
      const resp = await axios.post(url, formData);
      if (resp.data.message) {
        toast.success(resp.data.message);
        setText({
          email: "",
          fullName: "",
          phone: "",
          role: "doctor",
          password: "",
          specialty: "",
          CV: null,
        });
        setTimeout(() => {
          navigate("/doctor-success");
        }, 1000);
      } else {
        toast.error(resp.data.error);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setText((prevText: any) => ({
      ...prevText,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
    setText((prevText: any) => ({
      ...prevText,
      specialty: event.target.value,
    }));
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setText((prevFormData) => ({
      ...prevFormData,
      CV: file,
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
        {/* <h1 className="animate">+ E-AID</h1> */}
      </div>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <h3 className="doctorSignUp">Sign Up</h3>
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
            <label>Specialty</label>
            {selectedOption === "Others" ? (
              <InputField
                type="text"
                className="input-field"
                placeHolder="Fill in your specialty"
                name="specialty"
                required={true}
                onChange={handleInputChange}
              />
            ) : (
              <select
                name=""
                id=""
                onChange={handleSelectChange}
                value={selectedOption}
              >
                <option value="">Select an option</option>
                {specialties.map((specialty, index) => (
                  <option key={index}>{specialty}</option>
                ))}
              </select>
            )}
          </div>
          <div className="inputDiv">
            <label htmlFor="CV" className="uploadCV">
              Upload your CV
            </label>
            <InputComponent
              type="file"
              className=""
              id="CV"
              placeholder=""
              name="CV"
              required={true}
              disabled={false}
              onChange={handleCVUpload}
              style={text.CV ? { display: "flex" } : { display: "none" }}
              accept=".pdf,.doc,.docx"
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
            <a href="/signup">Not a Doctor?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorsRegistration;
