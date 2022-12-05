import styled from "styled-components";
import ReviewPopUp from "./ReviewPopUp";
import PickStream from "./PickStream";
import { AiFillDelete, AiFillHeart } from "react-icons/ai";

const Review = ({ pick, currentUser, mediaPicked, removePick }) => {
  const likePick = () => {
    fetch(`/add-like`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: pick.userId,
        userName: pick.userName,
        pickId: pick.pickId,
        mediaPicked: mediaPicked,
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
        window.alert("Sorry, please try again.", error);
      });
  };

  return (
    <ReviewDiv>
      {pick.userId === currentUser.userId ? (
        <>
          <h3>Your Review</h3>
          <Line />
        </>
      ) : (
        <h3>{pick.userName}'s Review</h3>
      )}
      {pick?.review === "" ? (
        <div>
          No review logged.{" "}
          <ReviewPopUp pick={pick} mediaPicked={mediaPicked} />
        </div>
      ) : (
        <div>
          {pick?.review} <ReviewPopUp pick={pick} mediaPicked={mediaPicked} />
        </div>
      )}
      {pick.userId === currentUser.userId ? (
        <>
          <h3>Remove Pick:</h3>
          <Line />
          <DeleteIcon size={26} onClick={removePick} />
        </>
      ) : (
        <>
          <AiFillHeart
            size={30}
            style={{
              color: pick.isLiked ? "#ec7274" : "#464646",
              cursor: "pointer",
            }}
            onClick={likePick}
          />
          <div>
            comment text input that patches comment to pick in database (also
            how heart will work)
          </div>
        </>
      )}
      <PickStream mediaPicked={mediaPicked} pick={pick} />
    </ReviewDiv>
  );
};

const Line = styled.div`
  width: 100%;
  border-top: 1px solid var(--dark-grey);
`;

const ReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3 {
    font-size: 16px;
    margin-top: 30px;
  }

  a {
    width: fit-content;
    color: var(--dark-grey);
    :hover {
      opacity: 0.8;
      transition: all 0.4 ease-in-out;
    }
  }
`;

const DeleteIcon = styled(AiFillDelete)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
    transition: all 0.4 ease-in-out;
  }
`;

export default Review;
