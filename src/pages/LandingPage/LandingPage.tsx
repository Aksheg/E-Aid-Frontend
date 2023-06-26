//Landing page components aggregate here

import HeaderComponent from "../../components/Header/Header";
import LandingPageOne from "../../components/LandingPage1/LandingPage1";
import LandingPage2 from "../../components/LandingPage2/LandingPage2";
import LandingPageThree from "../../components/LandingPage3/LandingPage3";
import LandingPageFour from "../../components/LandingPage4/LandingPage4";
import LandingPageFive from "../../components/LandingPage5/LandingPage5";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="Landing-page-all">
      <HeaderComponent />
      <LandingPageOne />
      <LandingPageFive />
      <LandingPage2 />
      <LandingPageThree />
      <LandingPageFour />
    </div>
  );
}

export default LandingPage;
