import React, { useEffect, useState } from "react";
import { HiBell } from "react-icons/hi";
import "./Header.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  headerText: string;
  createBtn: any;
}

const getUserUrl = "http://localhost:5000/auth/user";

const Header1: React.FC<HeaderProps> = ({ headerText, createBtn }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies<string>(["token"]);

  useEffect(() => {
    const detailsFromStorage = localStorage.getItem("googleDetails");
    const roleFromStorage = localStorage.getItem("role");
    if (detailsFromStorage) {
      setUserDetails(JSON.parse(detailsFromStorage));
    } else if (roleFromStorage) {
      setUserDetails(JSON.parse(roleFromStorage));
    } else {
      getLoggedInUser();
    }
  }, []);

  const getLoggedInUser = async () => {
    const tokenFromStorage = localStorage.getItem("googleToken");
    if (tokenFromStorage) {
      const userToken = JSON.parse(tokenFromStorage).token;
      const response = await axios.post(getUserUrl, { userToken });
      setUserDetails(response.data);
      if (response) {
        localStorage.setItem("googleDetails", JSON.stringify(response.data));
      }
    }
  };

  const getInitials = () => {
    if (userDetails) {
      const fullName = userDetails.name || userDetails.fullName;
      const initials = fullName
        .split(" ")
        .map((name: string) => name[0])
        .join("");
      return initials.toUpperCase();
    }
  };

  const handleAvatarClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  // ...

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("googleToken");
    localStorage.removeItem("role");
    localStorage.removeItem("currentPath");
    localStorage.removeItem("googleDetails");
    localStorage.removeItem("existingUser");
    setCookie("token", cookie, { path: "/" });
    removeCookie("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="header-container1">
      <header className="header1">
        <div className="header-text1">{headerText}</div>
        {createBtn}
        <div className="header-icons1">
          <span className="bell-icon">
            <HiBell size={30} />
          </span>
          <span className="avatar-icon" onClick={handleAvatarClick}>
            {userDetails?.picture ? (
              <img src={userDetails?.picture} alt="avatar" />
            ) : userDetails?.avatar ? (
              <img src={userDetails?.avatar} alt="avatar" />
            ) : (
              getInitials()
            )}
          </span>
        </div>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-logout">
          <div className="modal-content-logout">
            {/* Profile */}
            <div>
              <p>Profile</p>
              {/* Display user profile information */}
            </div>

            {/* Logout */}
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header1;
