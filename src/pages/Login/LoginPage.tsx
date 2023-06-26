import { Button } from "./button";
import { InputField } from "./input-field";
import { useState } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import axios from "axios";
import "./login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
const apiEndpoint = "/auth/login";
const apiEndpointGoogle = "/auth/google-login";

const baseUrl = import.meta.env.VITE_BASE_URL as string;
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
interface LoginProps {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const loginUrl = baseUrl + apiEndpoint;
  const googleLoginUrl = baseUrl + apiEndpointGoogle;

  const handleLoginInput = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(loginUrl, loginDetails);

      if (response.data.message === "You have successfully logged in as user") {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        toast.success(response.data.message);
        setTimeout(() => {
          localStorage.setItem("role", JSON.stringify(response.data.user));
          response.data.user.role === "doctor"
            ? navigate("/askdoctor")
            : navigate("/dashboard");
        }, 3000);
      } else if (
        response.data.message === "You have successfully logged in as admin"
      ) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        toast.success(response.data.message);
        setTimeout(() => {
          localStorage.setItem("role", JSON.stringify(response.data.admin));
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err: any) {
      console.log(err);
      const returnToast = () => {
        if (err.response?.data?.message) {
          return err.response?.data?.message;
        } else if (err.response?.data?.Error) {
          return err.response?.data?.Error;
        } else {
          return err.message;
        }
      };
      toast.error(returnToast());
    }
    setLoginDetails({ email: "", password: "" });
  };

  return (
    <div className="login-container">
      <div className="left">
        <Link to="/">
          <div className="cross">+</div>
        </Link>
        <h1 className="welcome">Welcome back</h1>
        <span className="enter-details">
          Enter your details let's get your account ready for you
        </span>
      </div>
      <div className="right">
        <form onSubmit={handleSignIn} className="login-form">
          <label htmlFor="title" className="form-title">
            Log In
          </label>
          <LoginSocialGoogle
            client_id={clientId}
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="offline"
            onResolve={({
              // provider,
              data,
            }: {
              provider: string;
              data: any;
            }) => {
              const userDetails = data;
              try {
                const response = axios.post(googleLoginUrl, {
                  email: data.email,
                });

                response
                  .then((data: any) => {
                    document.cookie = data.data.token;
                    if (data.data.message === "Login successful") {
                      localStorage.setItem(
                        "googleDetails",
                        JSON.stringify(userDetails)
                      );
                      localStorage.setItem(
                        "token",
                        JSON.stringify(data.data.token)
                      );
                      localStorage.setItem(
                        "existingUser",
                        JSON.stringify(data.data.existingUser)
                      );
                      toast.success(data.data.message);
                      setTimeout(() => {
                        navigate("/dashboard");
                      }, 3000);
                    } else {
                      toast.error(data.data?.message);
                    }
                  })
                  .catch((error: any) => {
                    console.log(error);
                    error.response?.data?.error
                      ? toast.error(error.response?.statusText)
                      : toast.error(error.message);
                  });
              } catch (error: any) {
                console.log(error);
                toast.error(error.response.data.error);
              }
            }}
            onReject={(err: any) => {
              console.log(err.response.data.error);
              toast.error(err.response.data.error);
            }}
          >
            <GoogleLoginButton className="google-login" />
          </LoginSocialGoogle>
          <div className="or">
            <hr />
            <span className="or-span">Or</span>
            <hr />
          </div>
          <label htmlFor="title" className="email">
            Email address
          </label>
          <InputField
            type="email"
            value={loginDetails.email}
            onChange={handleLoginInput}
            placeHolder="Name@companyemail.com"
            className="email-input"
            name="email"
            required={true}
          />
          <label htmlFor="title" className="password">
            Password
          </label>
          <InputField
            type="password"
            value={loginDetails.password}
            onChange={handleLoginInput}
            placeHolder="Password123@"
            className="password-input"
            name="password"
            required={true}
          />
          <a href="/forgot-password" className="forgot">
            <span>Forgot Password?</span>
          </a>
          <Button type="submit" btnText="Sign In" className="signin-btn" />
          <p className="not-a-member">
            Not a member?
            <a href="/signup" className="sign-up">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
