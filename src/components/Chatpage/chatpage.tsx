import React, { useState, useEffect, useRef } from "react";
import "./chatpage.css";
// import arrowImage from "./assets/arrow-up.png";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
// import userImage from "./assets/userImage.png";
// import doctorImage from "./assets/doctorImage.png";
import axios from "axios";
import DoctorCard from "./DoctorCard";
import styled from "styled-components";
import { Button } from "../../pages/Login/button";
import Pusher from "pusher-js";
import { InputField } from "../../pages/Login/input-field";
const baseUrl = import.meta.env.VITE_BASE_URL;
const key = import.meta.env.VITE_PUSHER_KEY;

interface ChatsPageProps {
  user: {
    username: string;
    secret: string;
  };
}

const ChatsPage: React.FC<ChatsPageProps> = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [allDoctors, setAllDoctors] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selected, setSelected] = useState<boolean>(false);
  const [role, setRole] = useState<string>();
  const [messages, setMessages] = useState<any[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [userSentMessages, setUserSentMessages] = useState<any[]>([]);
  const [userReceived, setUserReceived] = useState<any[]>([]);
  const [doctorSent, setDoctorSent] = useState<any[]>([]);
  const [doctorReceived, setDoctorReceived] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentDoctor, setCurrentDoctor] = useState<any>(null);
  const [initials, setInitials] = useState<string>("");

  let loggedInUser: any;
  let loggedInDoctor: any;
  useEffect(() => {
    chatMessages();
    // Fetch data from API
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/alldoctors`);
        const data = response.data.allDoctors;
        setAllDoctors(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/allusers`);
        const data = response.data.allUsers;
        setAllUsers(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    let currentRole: any;
    const existingUser = localStorage.getItem("existingUser");
    if (existingUser) {
      currentRole = JSON.parse(existingUser);
      if (currentRole.role.toLowerCase() === "user") {
        loggedInUser = currentRole;
        setCurrentUser(currentRole);
      } else {
        loggedInDoctor = currentRole;
        setCurrentDoctor(currentRole);
      }
      setRole(currentRole.role.toLowerCase());
    }

    const roleFromStorage = localStorage.getItem("role");
    if (roleFromStorage) {
      currentRole = JSON.parse(roleFromStorage);
      if (currentRole.role.toLowerCase() === "user") {
        loggedInUser = currentRole;
        setCurrentUser(currentRole);
      } else {
        loggedInDoctor = currentRole;
        setCurrentDoctor(currentRole);
      }
      setRole(currentRole.role.toLowerCase());
    }
    if (loggedInUser) {
      userIsSender();
      userIsReceiver();
      fetchDoctors();
    }

    if (loggedInDoctor) {
      doctorIsSender();
      doctorIsReceiver();
      fetchUsers();
    }
  }, [selected]);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current?.scrollHeight;
    }
  };
  const userIsSender = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/chat/user/sent/${loggedInUser?.id}`
      );
      setUserSentMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const userIsReceiver = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/chat/user/received/${loggedInUser?.id}`
      );
      setUserReceived(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const doctorIsSender = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/chat/doctor/sent/${loggedInDoctor?.id}`
      );
      setDoctorSent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const doctorIsReceiver = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/chat/doctor/received/${loggedInDoctor?.id}`
      );
      setDoctorReceived(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const idOfUsersDoctorReceivedFrom = doctorReceived.map(
    (user) => user.senderId
  );

  const usersDoctorReceivedFrom = allUsers.filter((user) => {
    return idOfUsersDoctorReceivedFrom.includes(user.id);
  });

  const messagesFromSelectedUser = doctorReceived.filter(
    (message) => message.senderId === selectedUser?.id
  );
  const messagesToSelectedUser = doctorSent.filter(
    (message) => message.recipientId === selectedUser?.id
  );
  const messagesFromSelectedDoctor = userReceived.filter(
    (message) => message.senderId === selectedDoctor?.id
  );
  const messagesToSelectedDoctor = userSentMessages.filter(
    (message) => message.recipientId === selectedDoctor?.id
  );
  const doctorMessages = messagesFromSelectedUser
    ?.concat(messagesToSelectedUser)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const userMessages = messagesFromSelectedDoctor
    ?.concat(messagesToSelectedDoctor)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  const chatMessages = () => {
    if (selectedUser) {
      if (userMessage !== "") {
        setMessages([...doctorMessages, { message: userMessage }]);
      } else {
        setMessages(doctorMessages);
      }
    } else {
      if (userMessage !== "") {
        setMessages([...userMessages, { message: userMessage }]);
      } else {
        setMessages(userMessages);
      }
    }
  };

  // const getAlternativeProfile = (firstName: string, lastName: string) => {
  //   const firstLetter = firstName.charAt(0).toUpperCase();
  //   const lastLetter = lastName.charAt(0).toUpperCase();
  //   return firstLetter + lastLetter;
  // };

  useEffect(() => {
    if (selectedDoctor) {
      const pusher = new Pusher(key, {
        cluster: "mt1",
      });

      const channel = pusher.subscribe(`private-chat-${currentUser?.id}`);
      channel.bind("message", handleMessage);

      return () => {
        channel.unbind("message", handleMessage);
        pusher.unsubscribe(`private-chat-${currentUser?.id}`);
      };
    }
  }, [selectedDoctor]);

  const chooseDoctor = (index: number) => {
    setSelectedDoctor(allDoctors[index]);
    setSelected(true);
    setInitials(getInitials(index));
  };

  const chooseUser = (index: number) => {
    setSelectedUser(usersDoctorReceivedFrom[index]);
    setSelected(true);
    setInitials(getInitials(index));
  };

  if (selected) {
    scrollToBottom();
  }

  const handleMessage = (data: any) => {
    const { user, message } = data;
    setMessages((prevMessages) => [...prevMessages, { user, message }]);
  };

  const handleUserMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userMessage === "") {
      return;
    }
    try {
      if (currentUser) {
        // User engaging with a doctor
        const response = await axios.post(
          `${baseUrl}/chat/doctor/${selectedDoctor.id}`,
          {
            message: userMessage,
            userId: currentUser.id,
          }
        );
        // console.log(response);

        setMessages((prevMessages) => [
          ...prevMessages,
          { message: userMessage },
        ]);
      } else if (currentDoctor) {
        // Doctor engaging with the user
        const response = await axios.post(`${baseUrl}/chat/user`, {
          doctorId: currentDoctor.id,
          message: userMessage,
          userId: selectedUser.id,
        });
        // console.log(response);

        setMessages((prevMessages) => [
          ...prevMessages,
          { message: userMessage },
        ]);
      }
      // Clear the input field
      setUserMessage("");
    } catch (error) {
      console.log("Error sending user message:", error);
    }
  };

  const getInitials = (index: number) => {
    let fullName;
    let initials;
    if (currentUser) {
      fullName = allDoctors[index]?.fullName;
    } else {
      fullName = usersDoctorReceivedFrom[index]?.fullName;
    }
    initials = fullName
      ?.split(" ")
      .map((name: string) => name[0])
      .join("")
      .slice(0, 2);
    return initials?.toUpperCase();
  };

  return (
    <>
      {selected ? (
        <section className="msger">
          <Button
            btnText="Go Back"
            onClick={() => setSelected(false)}
            className="backBtn"
          />
          <main className="msger-chat" ref={divRef}>
            {currentUser &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.senderId === selectedDoctor?.id
                      ? "msg left-msg"
                      : "msg right-msg"
                  }
                >
                  <div className="msg-img">
                    {message.senderId === selectedDoctor?.id ? (
                      <span>{initials}</span>
                    ) : (
                      // <img src={doctorImage} alt="Doctor" />
                      <span>me</span>
                      // <img src={userImage} alt="User" />
                    )}
                  </div>
                  <div className="msg-bubble">
                    <div className="msg-text">{message.message}</div>
                  </div>
                </div>
              ))}
            {currentDoctor &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.senderId === selectedUser?.id
                      ? "msg left-msg"
                      : "msg right-msg"
                  }
                >
                  <div className="msg-img">
                    {message.senderId === selectedUser?.id ? (
                      <span>{initials}</span>
                    ) : (
                      // <img src={userImage} alt="User" />
                      <span>me</span>
                      // <img src={doctorImage} alt="Doctor" />
                    )}
                  </div>
                  <div className="msg-bubble">
                    <div className="msg-text">{message.message}</div>
                  </div>
                </div>
              ))}
          </main>
          <form className="msger-inputarea" onSubmit={handleUserMessageSubmit}>
            <div>
              <InputField
                type="text"
                className="msger-input"
                placeHolder="Type your question here"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
              <BsFillArrowUpCircleFill
                className="imageArrow"
                onClick={handleUserMessageSubmit}
              />
            </div>
          </form>
        </section>
      ) : role !== "doctor" && allDoctors.length === 0 ? (
        <h1 style={{ marginLeft: "250px", color: "#eb5757", fontSize: "2rem" }}>
          Loading...
        </h1>
      ) : role !== "doctor" && allDoctors.length > 0 ? (
        <DoctorsCards>
          {allDoctors.map(
            (doctor, index) =>
              doctor &&
              doctor.status === "verified" && (
                <DoctorCard
                  key={index}
                  name={doctor?.fullName}
                  initials={getInitials(index)}
                  avatar={doctor?.avatar}
                  specialty={doctor?.specialty}
                  onClick={() => chooseDoctor(index)}
                />
              )
          )}
        </DoctorsCards>
      ) : role === "doctor" && usersDoctorReceivedFrom.length > 0 ? (
        <DoctorsCards>
          {usersDoctorReceivedFrom.map(
            (user, index) =>
              user.status === "verified" && (
                <DoctorCard
                  key={index}
                  name={user?.fullName}
                  initials={getInitials(index)}
                  specialty={user?.specialty}
                  avatar={user?.avatar}
                  onClick={() => chooseUser(index)}
                />
              )
          )}
        </DoctorsCards>
      ) : (
        <h1 style={{ marginLeft: "250px", color: "#eb5757", fontSize: "2rem" }}>
          Loading...
        </h1>
      )}
    </>
  );
};

export default ChatsPage;

const DoctorsCards = styled.section`
  // border: 1px solid red;
  margin-left: 250px;
  width: 90%;
  height: 84vh;
  align-self: flex-end;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  // align-items:flex-start;
  flex-direction: column;
  overflow: auto;
  padding: 1rem;
`;
