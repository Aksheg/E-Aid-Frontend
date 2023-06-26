import React from "react";
import styled from "styled-components";

interface DoctorProps {
  name?: string;
  initials?: string;
  avatar?: string;
  specialty?: string;
  onClick: () => void;
}

const DoctorCard: React.FC<DoctorProps> = ({
  name,
  initials,
  avatar,
  specialty,
  onClick,
}) => {
  return (
    <DoctorCardContainer onClick={onClick}>
      <span>{avatar ? <img src={avatar} /> : initials}</span>
      <p>{name}</p>
      <p>{specialty && `[ ${specialty} ]`}</p>
    </DoctorCardContainer>
  );
};

export default DoctorCard;

const DoctorCardContainer = styled.div`
  width: 40%;
  height: fit-content;
  display: flex;
  align-items: center;
  //   justify-content: space-between;
  //   border: 1px solid red;
  font-size: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0 3rem 3rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    cursor: pointer;
    background-color: #eb5757;

    p {
      color: #fff;
    }
  }

  span {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #feebef;
    color: #eb5757;
  }

  p {
    // border: 1px solid red;
    margin-left: 1rem;
    width: fit-content;
    color: #eb5757;
  }
`;
