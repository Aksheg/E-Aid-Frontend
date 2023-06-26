import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import QuickCard from "../Quick-cards/QuickCard";
import Article from "../Article/Article";
import AppButton from "../Button/AppButtons";

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/firstaid");
  };
  return (
    <HomeContainer>
      <QuickCard />
      <Article />
      <div className="viewmore-wrapper">
        <AppButton
          children="View more articles"
          outline="outline"
          onClick={handleClick}
        />
      </div>
    </HomeContainer>
  );
};

export default HomePage;

const HomeContainer = styled.div`
  background-color: #f6f6f6;
  border: 1px solid #fff;
  // margin-top: 2rem;
  padding: 2rem 0;
  min-height: 100vh;

  .viewmore-wrapper {
    margin-left: 250px;
    margin-top: 2rem;
    height: 3rem;
    width: calc(100vw - 250px);
    display: flex;
    justify-content: center;

    button {
      background-color: #eb5757;
      color: #fff;
      border: 1px solid #eb5757;
      border-radius: 0.5rem;
    }
  }
`;
