import Popup from "reactjs-popup";
import styled from "styled-components";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

//-----------------------------//
//---Review Pop Up Component---//
//-----------------------------//
const ReviewPopUp = ({ pick }) => {
  const [newReview, setNewReview] = useState(null);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewReview(e.target.value);
  };

  const submitReview = (e, pickId) => {
    e.preventDefault();
    fetch(`/add-review/`, {
      method: "PATCH",
      body: JSON.stringify({
        pickId: pickId,
        review: newReview,
        userId: currentUser.userId,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 400) {
          window.alert("Review added!");
          return navigate("/mypicks");
        } else {
          window.alert("Sorry, please  again.");
        }
      })
      .catch((error) => {
        window.alert("Sorry, please try again.");
      });
  };

  return (
    <Popup
      trigger={
        <AddReviewButton>
          {pick.review === "" ? "Add a Review" : <AiFillEdit />}
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
          <Actions>
            {/* <AiFillCloseCircle
              onClick={() => {
                close();
              }}
            /> */}
          </Actions>
        </ModalDiv>
      )}
    </Popup>
  );
};

export default ReviewPopUp;

const AddReviewButton = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  font-weight: bold;
  font-family: "Roboto";
  font-size: 16px;
  cursor: pointer;
`;

const ModalDiv = styled.div`
  background: #525252;
  color: var(--white);
  border-radius: 10px;
  width: 50vw;
  font-size: 12px;
`;

const Header = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
  font-size: 18px;
  text-align: center;
  padding: 5px;
`;

const Actions = styled.div`
  width: 100%;
  padding: 10px 5px;
  margin: auto;
  text-align: center;
`;

//RESTYLE THIS
const StyledButton = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: -10px;
  top: -10px;
  /* font-size: 24px;
  border-radius: 18px;
  border: 1px solid #cfcece; */
`;

const ReviewForm = styled.form`
  width: 80%;
  margin: 0 10%;
`;

const ReviewInput = styled.input`
  width: 100%;
  height: 200px;
  margin: 10px;
  border-radius: 5px;
`;

const SaveButton = styled.input`
  border: none;
  border-radius: 5px;
`;
