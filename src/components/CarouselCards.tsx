import React from "react";

type CardProps = {
  name: string;
  information: string;
  isActive: boolean;
  key: number;
};

const CardBoard: React.FC<CardProps> = ({
  name,
  information,
  isActive,
  key,
}) => {
  return (
    <div
      key={key}
      className={`carousel-card-container ${isActive ? "card-active" : ""}`}
    >
      <center>
        <p>{name}</p>
        <p>{information}</p>
      </center>
    </div>
  );
};

export default CardBoard;
