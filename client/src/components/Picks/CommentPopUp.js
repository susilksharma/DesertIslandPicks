import Popup from "reactjs-popup";
import styled from "styled-components";
import { AiFillCloseCircle, AiFillHeart } from "react-icons/ai";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { BiCommentDetail } from "react-icons/bi";

//-----------------------------//
//---Comment Pop Up Component---//
//-----------------------------//
const CommentPopUp = ({ pick, mediaPicked }) => {
  const [comment, setComment] = useState("");
  const { currentUser } = useContext(UserContext);
  console.log(pick);

  const likePick = () => {
    fetch(`/add-like`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: pick.userId,
        userName: pick.userName,
        pickId: pick.pickId,
        mediaPicked: mediaPicked,
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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error,", error);
      });
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const submitComment = (e, pickId) => {
    e.preventDefault();
    fetch(`/add-comment`, {
      method: "PATCH",
      body: JSON.stringify({
        pickId: pickId,
        mediaPicked: mediaPicked,
        comment: comment,
        userId: pick.userId,
        currentUser: currentUser.name,
        title: pick.title,
        userName: pick.userName,
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
    <Wrapper>
      <Popup
        trigger={
          <AddReviewButton>
            <BiCommentDetail size={24} />
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

            <Header>Comment</Header>
            <CommentForm
              onSubmit={(e) => {
                submitComment(e, pick.pickId);
                window.location.reload();
              }}
            >
              <label>
                <CommentInput
                  type="text"
                  value={comment}
                  placeholder="Your comment"
                  onChange={handleChange}
                />
              </label>
              <SaveButton type="submit" value="Save" />
            </CommentForm>
          </ModalDiv>
        )}
      </Popup>
      <HeartIcon
        size={28}
        style={{
          color: pick.isLiked ? "#ec7274" : "#464646",
        }}
        onClick={likePick}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
`;

const HeartIcon = styled(AiFillHeart)`
  position: relative;
  bottom: 3px;
  cursor: "pointer";
  :hover {
    opacity: 0.6;
    transition: all 0.4 ease-in-out;
  }
`;

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

const CommentForm = styled.form`
  width: 80%;
  margin: 0 10%;
`;

const CommentInput = styled.input`
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

export default CommentPopUp;
