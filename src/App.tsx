import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserProvider from "./components/context/Context";
import LandingPage from "./pages/LandingPage/LandingPage";
import { ToastContainer } from "react-toastify";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import { Login } from "./pages/Login/LoginPage";
import AccountVerification from "./pages/Account Verification/AccountVerification";
import Forgot from "./pages/ForgotPassword/Forgot";
import ResetPassword from "./components/ResetPassword Component/ResetPassword";
import OTPPage from "./pages/OtpPage/OTP";
import PasswordResetSuccess from "./components/ResetPassword Component/SuccessPage";
import Sidebar from "./components/Sidebar/Sidebar";
import HomePage from "./components/Home/Home";
import AskDoctor from "./components/AskDoctor/AskDoctor";
import FindHospital from "./components/FindHospital/FindHospital";
import FirstAid from "./components/FirstAid/FirstAid";
import DoctorList from "./components/Doctors/DoctorList";
import DoctorsRegistration from "./pages/Registration/DoctorsRegistration";
import ArticleList from "./components/Articles/ArticleList";
import { AdminAuth, AuthRoute } from "./components/RouteProtection/Auth";
import OTPAuthRoute from "./components/RouteProtection/OTPAuth";
import DoctorSuccess from "./pages/Registration/DoctorSuccess";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <UserProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/doctor-signup" element={<DoctorsRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/verify"
            element={
              <OTPAuthRoute>
                <AccountVerification />
              </OTPAuthRoute>
            }
          />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/doctor-success" element={<DoctorSuccess />} />
          <Route
            path="/reset-password"
            element={
              <OTPAuthRoute>
                <ResetPassword />
              </OTPAuthRoute>
            }
          />
          <Route
            path="/otp"
            element={
              <OTPAuthRoute>
                <OTPPage />
              </OTPAuthRoute>
            }
          />
          <Route
            path="/success"
            element={
              <OTPAuthRoute>
                <PasswordResetSuccess />
              </OTPAuthRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <>
                  <Sidebar />
                  <HomePage />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/askdoctor"
            element={
              <AuthRoute>
                <>
                  <Sidebar />
                  <AskDoctor />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/findhospital"
            element={
              <AuthRoute>
                <>
                  <Sidebar />
                  <FindHospital />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/firstaid"
            element={
              <AuthRoute>
                <>
                  <Sidebar />
                  <FirstAid />
                </>
              </AuthRoute>
            }
          />
          <Route
            path="/doctors"
            element={
              <AdminAuth>
                <>
                  <Sidebar />
                  <DoctorList />
                </>
              </AdminAuth>
            }
          />
          <Route
            path="/articles"
            element={
              <AdminAuth>
                <>
                  <Sidebar />
                  <ArticleList />
                </>
              </AdminAuth>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
