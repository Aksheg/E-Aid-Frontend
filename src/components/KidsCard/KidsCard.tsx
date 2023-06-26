import React, { useEffect, useState } from "react";
import "./KidsCard.css";
import { BsArrowUpRight } from "react-icons/bs";
import Modal from "../Modal/Modal";
import { cards } from "./CardData";
import { Button } from "../../pages/Login/button";
import ModalForm from "../Modal/ModalForm";
import ReactDOMServer from "react-dom/server";

interface CardProps {
  image: string;
  heading: string;
  tips: any;
}

const KidsCard = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalChildren, setModalChildren] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [updateForm, setUpdateForm] = useState<any>(null);

  useEffect(() => {
    checkRole();
  }, []);

  const handleOpenModal = (index: number) => {
    setOpenModal(true);
    setModalChildren(
      <section className=" modal-card">
        <img src={cards[index].image} alt="card" />
        <div className="modalContent">
          <h1>{cards[index].heading}</h1>
          <p>{cards[index].tips}</p>
        </div>
        {isAdmin && (
          <div className="crudBtns">
            <Button
              onClick={() => displayForm(index)}
              btnText="Update"
              className="crudBtn"
              type="submit"
            />
            <Button
              onClick={() => {
                return;
              }}
              btnText="Delete"
              className="crudBtn"
              type="submit"
            />
          </div>
        )}
      </section>
    );
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setUpdateForm(null);
  };

  const jsxToString = (
    jsxElement: React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    >
  ) => {
    const parser = new DOMParser();
    const htmlString = ReactDOMServer.renderToString(jsxElement);
    const parsedDOM = parser.parseFromString(htmlString, "text/html");
    return parsedDOM.body.textContent;
  };

  const displayForm = (index: number) => {
    localStorage.setItem("updateMsg", JSON.stringify("Update Button Clicked"));
    const contentString = jsxToString(cards[index].tips);
    const selectedPost = {
      articleTitle: cards[index].heading,
      headerImage: cards[index].image,
      articleBody: contentString,
    };
    localStorage.setItem("article", JSON.stringify(selectedPost));
    setUpdateForm(
      <ModalForm
        heading={cards[index].heading}
        content={contentString}
        modalFormClassName="kidscardForm"
        modalForm="kidscardModalForm"
        modalTextArea="modalTextArea"
      />
    );
  };

  const checkRole = () => {
    const detailsFromStorage = localStorage.getItem("role");
    if (detailsFromStorage) {
      const details = JSON.parse(detailsFromStorage);
      if (details.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  };

  return (
    <div className="kids-cards">
      {cards.map((card: CardProps, index: number) => {
        return (
          <div key={index} className="kids-card">
            <img src={card.image} alt="card" />
            <h1>{card.heading}</h1>
            <p>{card.tips}</p>
            <Button
              onClick={() => handleOpenModal(index)}
              btnText={
                <span style={{ display: "flex", alignItems: "center" }}>
                  Read Post <BsArrowUpRight />
                </span>
              }
            />
            {/* <button onClick={() => handleOpenModal(index)}>
              Read Post &nbsp; <BsArrowUpRight />
            </button> */}
          </div>
        );
      })}
      {openModal && (
        <Modal
          children={updateForm ? updateForm : modalChildren}
          handleCloseModal={handleCloseModal}
          modalContainer="modalContainer kidscardUpdate"
          modalBackground=" parent"
          modalBtn="modal-button kidscardModalBtn"
        />
      )}
    </div>
  );
};

export default KidsCard;
