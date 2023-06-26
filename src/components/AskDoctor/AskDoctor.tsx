import React from "react";
// import ChatPage from "../Chatpage/chatpage";
import ChatsPage from "../Chatpage/chatpage";
import styled from "styled-components";

const AskDoctor: React.FunctionComponent = () => {
  return (
    <AskDoctorContainer>
      <ChatsPage
        user={{
          username: "",
          secret: "",
        }}
      />
    </AskDoctorContainer>
  );
};

export default AskDoctor;

const AskDoctorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  height: 100vh;
  background-color: #f6f6f6;
`;
