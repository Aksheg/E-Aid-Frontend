import Frontend from "./Frontend";

import * as S from "./StylesContainer";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  margin-left: 100px;
`;

function LandingPageOne() {
  return (
    <Frontend>
      <S.Container>
        <div>
          <h1 className="One-h1">Where Every Second Counts…</h1>
          <h6 className="One-h6">
            When emergencies strike, every second matters. That's why we are
            proud to present E-Aid, your go-to platform for
            immediate access to medical assistance, hospital search, and
            valuable first aid resources for both children and adults.
          </h6>
          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>

        <div></div>
      </S.Container>
    </Frontend>
  );
}

export default LandingPageOne;
