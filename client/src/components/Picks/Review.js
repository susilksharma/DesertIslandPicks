import styled from "styled-components";
import ReviewPopUp from "./ReviewPopUp";
import CommentPopUp from "./CommentPopUp";
import PickStream from "./PickStream";
import { AiFillDelete } from "react-icons/ai";

const Review = ({ pick, currentUser, mediaPicked, removePick }) => {
  return (
    <ReviewDiv>
      {/*Header conditionally changes if you are viewing your own Picks. */}
      {pick.userId === currentUser.userId ? (
        <>
          <h3>Your Review</h3>
          <Line />
        </>
      ) : (
        <h3>{pick.userName}'s Review</h3>
      )}

      {/*Conditional render based on if there is a review logged. */}
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

      {/*If it's your Picks, you can delete. Otherwise you can Like and/or Comment. */}
      {pick.userId === currentUser.userId ? (
        <>
          <h3>Remove Pick:</h3>
          <Line />
          <DeleteIcon size={26} onClick={removePick} />
        </>
      ) : (
        <>
          <h3>Comment/Like:</h3>
          <Line />
          <CommentDiv>
            {pick?.comment}
            <CommentPopUp pick={pick} mediaPicked={mediaPicked} />
          </CommentDiv>
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

const CommentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const DeleteIcon = styled(AiFillDelete)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
    transition: all 0.4 ease-in-out;
  }
`;

export default Review;
