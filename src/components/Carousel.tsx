import React, { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface NamesProps {
  name?: string;
  info?: string;
  cardTitle?: string;
  path?: string;
  image?: string;
  Icon?: React.ElementType<{ color: string }>;
}

interface CarouselProps {
  names: NamesProps[];
  Card: React.ElementType;
}

const Carousel = ({ names, Card }: CarouselProps) => {
  const [cardIndex, setCardIndex] = useState(0);

  const showNextCards = () => {
    if (cardIndex + 3 < names.length) {
      setCardIndex(cardIndex + 1);
    } else {
      setCardIndex(0);
    }
  };

  const showPreviousCards = () => {
    if (cardIndex - 1 >= 0) {
      setCardIndex(cardIndex - 1);
    } else {
      setCardIndex(names.length - 3);
    }
  };

  return (
    <div className="carousel-cards">
      <button className="carousel-button" onClick={showPreviousCards}>
        <GrFormPrevious className="carousel-icon" />
      </button>

      {names?.slice(cardIndex, cardIndex + 3).map((element, index) => (
        <Card
          key={index}
          name={element.name}
          information={element.info}
          isActive={index === 1}
          cardTitle={element?.cardTitle}
          path={element.path}
          image={element.image}
          Icon={element.Icon}
        />
      ))}

      <button className="carousel-button" onClick={showNextCards}>
        <GrFormNext className="carousel-icon" />
      </button>
    </div>
  );
};

export default Carousel;
