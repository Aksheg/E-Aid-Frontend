import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../pages/Login/button";
import Modal from "../Modal/Modal";
import ModalForm from "../Modal/ModalForm";
import { toast } from "react-toastify";
import "../KidsCard/KidsCard.css";
const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "/article/allarticles";
interface Articles {
  articleBody: string;
  articleTitle: string;
  createdAt: string;
  headerImage: string;
}

const ArticleList: React.FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const getAllArticlesUrl = baseUrl + endPoint;
  const deleteArticleUrl = `${baseUrl}/article/delete/${articles[currentIndex]?.articleId}`;

  const fetchAllArticles = async () => {
    const response = await axios.get(getAllArticlesUrl);
    const sortedArticles = response.data.allArticles.sort(
      (a: Articles, b: Articles) => b.createdAt.localeCompare(a.createdAt)
    );
    setArticles(sortedArticles);
  };

  const displayContent = (index: number) => {
    setViewModal(true);
    setCurrentIndex(index);
  };

  const displayUpdateForm = (index: number) => {
    setModalOpen(true);
    setCurrentIndex(index);
    localStorage.setItem("updateMsg", JSON.stringify("Update Button Clicked"));
    localStorage.setItem("article", JSON.stringify(articles[index]));
  };

  const closeUpdateForm = () => {
    setModalOpen(false);
    setOpenDeleteModal(false);
    setViewModal(false);
    localStorage.removeItem("updateMsg");
    localStorage.removeItem("article");
  };

  const handleDeleteButton = (index: number) => {
    setOpenDeleteModal(true);
    setCurrentIndex(index);
  };

  const deleteArticle = async () => {
    const response = await axios.delete(deleteArticleUrl);
    if (response.data.message) {
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  useEffect(() => {
    if (location.pathname === "/articles") {
      fetchAllArticles();
    }
  }, []);

  return (
    <ArticleContainer>
      <section>
        {articles.map((article, index) => (
          <EachArticle key={index}>
            <img src={article.headerImage} alt="article headerImage" />
            <h1>{article.articleTitle}</h1>
            <p>{article.articleBody}</p>
            <div className="btns">
              <Button btnText="View" onClick={() => displayContent(index)} />
              <Button
                btnText="Update"
                onClick={() => displayUpdateForm(index)}
              />
              <Button
                btnText="Delete"
                className="secondBtn"
                onClick={() => handleDeleteButton(index)}
              />
            </div>
          </EachArticle>
        ))}
      </section>
      {viewModal && (
        <Modal
          modalBackground="modal-bg"
          modalBtn="modal-button"
          handleCloseModal={closeUpdateForm}
          children={
            <article className="viewArticle">
              <img src={articles[currentIndex].headerImage} alt="" />
              <h3>{articles[currentIndex].articleTitle}</h3>
              <div>{articles[currentIndex].articleBody}</div>
            </article>
          }
        />
      )}
      {modalOpen && (
        <Modal
          handleCloseModal={closeUpdateForm}
          modalContainer="modalContainer kidscardUpdate"
          modalBackground="modal-bg"
          modalBtn="modal-button"
          children={
            <ModalForm
              heading={articles[currentIndex].articleTitle}
              content={articles[currentIndex].articleBody}
              modalFormClassName="kidscardForm"
              modalForm="kidscardModalForm"
              modalTextArea="modalTextArea"
            />
          }
        />
      )}
      {openDeleteModal && (
        <Modal
          handleCloseModal={closeUpdateForm}
          modalBackground="modal-bg"
          modalBtn="hide-button"
          children={
            <DeleteBtnContainer onClick={(e) => e.stopPropagation()}>
              <p>Are you sure you want to delete this article?</p>
              <div>
                <Button btnText="Yes" onClick={deleteArticle} />
                <Button btnText="No" onClick={closeUpdateForm} />
              </div>
            </DeleteBtnContainer>
          }
        />
      )}
    </ArticleContainer>
  );
};

export default ArticleList;

const ArticleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  overflow: scroll;
  background-color: #f6f6f6;

  section {
    margin: 6rem 0 0 15.6rem;
    z-index: 6;
    position: relative;
    width: 82.6%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 2rem;
  }

  .hide-button {
    display: none;
  }

  .modal-bg {
    margin-top: -2rem;
  }

  // .articleModalClassname {
  //   border: 1px solid red;
  // }

  // .modalForm {
  //   border: 1px solid red;
  // }

  .viewArticle {
    width: 35rem;
    height: 90vh;
    background-color: #fff;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border-radius: 0.2rem;
  }

  .viewArticle img {
    width: 100%;
  }
  .viewArticle div {
    overflow: auto;
    margin-top: 0.5rem;
  }
`;

const EachArticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 33vw;
  height: 25rem;
  padding: 1rem;
  margin: 1rem 0;
  // border: 1px solid red;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px;
  > p {
    overflow: auto;
    font-size: 0.8rem;
    line-height: 1.5rem;
    color: #222;
  }

  > h1 {
    margin-top: 0.5rem;
  }

  > img {
    height: 60%;
  }

  .btns {
    width: fit-content;
    display: flex;
    justify-content: flex-start;
    // border:1px solid red;
  }

  .btns button {
    background-color: #eb5757;
    border: none;
    border-radius: 0.2rem;
    color: #fff;
    width: 4rem;
    height: 2rem;
    margin-right: 2rem;
  }
`;

const DeleteBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 7rem;
  justify-content: space-between;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.2rem;

  > div {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  > div button {
    color: #fff;
    padding: 0.2rem 0.5rem;
    width: 3rem;
    height: 2rem;
    border: none;
    background-color: #eb5757;
    border-radius: 0.2rem;
  }
`;
