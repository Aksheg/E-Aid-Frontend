import { Link } from "react-router-dom";

interface CardProps {
  cardTitle: string;
  path: string;
  image?: string;
  Icon?: React.ElementType;
}

const QuickCardComponent = ({ cardTitle, path, image, Icon }: CardProps) => {
  return (
    <Link to={path}>
      <div className="emergency bg">
        <div className="icon1">
          {image && <img src={image} alt="icon" />}
          {Icon && <Icon color="#eb5757" />}
        </div>
        <div className="emergencyP">
          <p>{cardTitle}</p>
        </div>
      </div>
    </Link>
  );
};

export default QuickCardComponent;
