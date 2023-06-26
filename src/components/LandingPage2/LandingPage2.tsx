import { useContext } from "react";
import styled from "styled-components";

import { Page2Context } from "../context/Context";
import { Link } from "react-router-dom";

//Landing page 2 code goes here
const Division = styled.div`
  background-size: cover;
  background: url("../handEaid.png"),
    linear-gradient(76deg, #dac7b5 12%, #ded2d9 46%, #d7bfe8 77%);
  background-position: right;
  background-repeat: no-repeat;
  margin: 0 auto;
  max-width: 1140px;
  min-height: 515px;
  border-radius: 32px;
  border: none;
  align-items: flex-start;
  justify-content: center;
  padding: 20px auto;
  display: flex;
  flex-direction: column;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0;
  gap: 10px;
  position: relative;
  width: 525px;
  height: 336px;
  left: 6rem;
  top: 0;
`;
const Typo1 = styled.h3`
  width: 525px;
  height: 168px;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 56px;
  color: #03435f;
`;
const Typo2 = styled.p`
  width: 388px;
  height: 72px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #03435f;
  position: relative;
  margin-top: -35px;
`;
const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 171px;
  color: #ffff;
  height: 48px;
  background: linear-gradient(107.45deg, #de3d6d 47.58%, #f5844c 104.23%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
`;

const DivContainer2 = styled.div`
  margin: 0 auto;
  justify-content: center;
  // border: 1px solid red;
  width: 100vw;
`;

function LandingPage2() {
  const { value1, value2 } = useContext(Page2Context);
  return (
    <DivContainer2>
      <Division>
        <Box>
          <Typo1>{value1}</Typo1>
          <Typo2>{value2}</Typo2>
          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>
        </Box>
      </Division>
    </DivContainer2>
  );
}

export default LandingPage2;
