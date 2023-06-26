import styled from "styled-components";
import Image from "./images/hero.png";

export const Container = styled.div`
  width: 100%;
  // max-width: 1200px;
  margin: 6rem auto 0 auto;
  height: 80vh;
  display: flex;
  background: url(${Image});
  background-repeat: no-repeat;
  background-size: cover;
  flex-direction: column;
  justify-content: center;
  
  .One-main {
    flex: 0.7;
    align-items: center;
    display: flex;
  }

  /* Media Query */
  @media (max-width: 768px) {
    background-size: cover;

    .One-main {
      flex-direction: column;
    }
  }
`;
