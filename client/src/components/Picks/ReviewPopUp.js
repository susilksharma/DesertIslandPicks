import Popup from "reactjs-popup";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { MdEdit } from "react-icons/md";

//-----------------------------//
//---Review Pop Up Component---//
//-----------------------------//
const ReviewPopUp = ({ pick, mediaPicked }) => {
  const [newReview, setNewReview] = useState("");
  const { currentUser } = useContext(UserContext);

  const handleChange = (e) => {
    setNewReview(e.target.value);
  };

  const submitReview = (e, pickId) => {
    e.preventDefault();
    fetch(`/${mediaPicked}-review`, {
      method: "PATCH",
      body: JSON.stringify({
        pickId: pickId,
        review: newReview,
        userId: currentUser.userId,
        userName: pick.userName,
        title: pick.title,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert(data.message);
      })
      .catch((error) => {
        console.error("Error,", error);
      });
  };

  return (
    <Popup
      trigger={
        <AddReviewButton>
          {pick.review === "" ? <FiPlus size={20} /> : <MdEdit size={20} />}
        </AddReviewButton>
      }
      modal
      nested
    >
      {(close) => (
        <ModalDiv>
          <StyledButton>
            <AiFillCloseCircle size={30} onClick={close} />
          </StyledButton>
          <Header> {pick.review === "" ? "Add Review" : "Edit Review"} </Header>
          <ReviewForm
            onSubmit={(e) => {
              submitReview(e, pick.pickId);
              window.location.reload();
            }}
          >
            <label>
              <ReviewInput
                type="text"
                value={newReview}
                placeholder="Your review"
                onChange={handleChange}
              />
            </label>
            <SaveButton type="submit" value="Save" />
          </ReviewForm>
        </ModalDiv>
      )}
    </Popup>
  );
};

const AddReviewButton = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  font-weight: bold;
  font-size: 16px;
  color: var(--dark-grey);

  cursor: pointer;
  :hover {
    opacity: 0.6;
    transition: all 0.4 ease-in-out;
  }
`;

const ModalDiv = styled.div`
  background: #556678;
  color: var(--white);
  border-radius: 10px;
  width: 50vw;
  font-size: 12px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
`;

const Header = styled.div`
  width: 100%;
  font-size: 18px;
  text-align: center;
  padding: 5px;
`;

const StyledButton = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: -10px;
  top: -10px;
`;

const ReviewForm = styled.form`
  width: 80%;
  margin: 0 10%;
`;

const ReviewInput = styled.input`
  width: 100%;
  height: 100px;
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
`;

const SaveButton = styled.input`
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  margin-top: 10px;
  background-color: #8c8c8c;
  color: var(--white);

  :hover {
    background-color: #595959;
    transition: all 0.4s ease-in-out;
  }
`;

export default ReviewPopUp;
