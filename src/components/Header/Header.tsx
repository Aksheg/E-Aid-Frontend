import { BiPlusMedical } from "react-icons/bi"; // Import the BiPlusMedical icon
import "./Header.css"; // Import the CSS file
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface Props {
  headerText: string;
}

const Header = ({ headerText }: Props) => {
  const [loginText, setLoginText] = useState<string>("Login");
  const [href, setHref] = useState<string>("/login");
  const [dashBoard, setDashBoard] = useState<string>("/dashboard");
  const [cookie, setCookie, removeCookie] = useCookies<string>(["token"]);

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("email");
    const tokenFromStorage = localStorage.getItem("token");
    const roleFromStorage = localStorage.getItem("role");
    if (
      (emailFromStorage && JSON.parse(emailFromStorage) !== "") ||
      (tokenFromStorage && JSON.parse(tokenFromStorage) !== "") ||
      (cookie && Object.keys(cookie).length !== 0)
    ) {
      setLoginText("Logout");
      setHref("/");
    } else {
      setLoginText("Login");
      setHref("/login");
    }
    if (roleFromStorage) {
      const currentRole = JSON.parse(roleFromStorage);
      if (currentRole.role === "doctor") {
        setDashBoard("/askdoctor");
      }
    }
  }, []);

  const logout = () => {
    if (loginText === "Logout") {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("googleToken");
      localStorage.removeItem("role");
      localStorage.removeItem("currentPath");
      localStorage.removeItem("googleDetails");
      localStorage.removeItem("existingUser");
      setCookie("token", cookie, { path: "/" });
      removeCookie("token");
    }
  };

  return (
    <header className="header-container">
      <div className="logo">
        <BiPlusMedical size={54} className="logo-icon" /> {headerText}
      </div>
      <nav className="nav-header">
        <ul className="nav-links">
          <li>
            <a href="/" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
          {loginText === "Logout" && (
            <li>
              <a href={dashBoard}>Dashboard</a>
            </li>
          )}
          <li>
            <a href={href} className="login-link" onClick={logout}>
              {loginText}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const HeaderComponent = () => {
  return (
    <div>
      <Header headerText="E - AID" />
    </div>
  );
};

export default HeaderComponent;
