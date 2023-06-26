import styled from "styled-components";

export const Container = styled.div`
  // display: flex;
  // flex-direction: row;

  > div {
    width: 50%;
    margin-left:3rem;
  }

  .One-h1 {
    background: linear-gradient(89.39deg, #de3d6d 18.77%, #f5844c 91.68%);
    font-weight: 700;
    font-size: 60px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    padding: 0px 100px 50px;
  }

  .One-h6 {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    padding: 0px 100px 50px;
    color: #ffffff;
    line-height: 1.7rem;
  }

  /* Media Query */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    > div {
      width: 100%;
    }

    .One-h1 {
      font-size: 40px;
      padding: 0px 50px 30px;
    }

    .One-h6 {
      padding: 0px 50px 30px;
    }
  }
`;
