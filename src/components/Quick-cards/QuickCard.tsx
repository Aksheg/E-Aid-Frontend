import React from "react";
import "./QuickCard.css";
import pic2 from "./assets/Plus.png";
import pic1 from "./assets/emergency.png";

import pic3 from "./assets/Nurse.png";
import pic4 from "./assets/First Aid Kit.png";
import { RiArticleLine } from "react-icons/ri";
import QuickCardComponent from "./QuickCardComponent";
import Carousel from "../Carousel";

const QuickCard: React.FC = () => {
  let role;
  const roleFromStorage = localStorage.getItem("role");
  if (roleFromStorage) {
    role = JSON.parse(roleFromStorage).role;
  }

  const cards = [
    { cardTitle: "Call Emergency", path: "#", image: pic1 },
    { cardTitle: "Talk to a doctor", path: "/askdoctor", image: pic3 },
    { cardTitle: "Find a hospital", path: "/findhospital", image: pic2 },
    { cardTitle: "First aid for kids", path: "/firstaid", image: pic4 },
  ];

  const adminCards = [
    { cardTitle: "Doctors", path: "/doctors", image: pic3 },
    {
      cardTitle: "All articles",
      path: "/articles",
      Icon: RiArticleLine,
    },
  ];

  return (
    <div className="card-list">
      {/* For Users */}
      <>
        {role === "admin" ? (
          <Carousel
            Card={QuickCardComponent}
            names={[...cards, ...adminCards]}
          />
        ) : (
          <Carousel Card={QuickCardComponent} names={cards} />
        )}
      </>
    </div>
  );
};

export default QuickCard;
