import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillHeart } from "react-icons/ai";
import { RiYoutubeFill } from "react-icons/ri";
import ReviewPopUp from "./ReviewPopUp";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import ImageLarge from "./ImageLarge";

//----------------------------//
//---Picks Detail Component---//
//----------------------------//
const PickDetail = ({ pick, mediaPicked }) => {
  const { currentUser } = useContext(UserContext);
  const removePick = (e) => {
    e.preventDefault();
    fetch(`/delete-${mediaPicked}`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: currentUser.userId,
        pickId: pick.pickId,
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
        window.alert("Error, please try again.", error);
      });
  };
  return (
    <>
      {!pick ? (
        <h1>nada</h1>
      ) : (
        <>
          {pick.artist ? (
            <h2>
              <ArtistLink to={`/search-${mediaPicked}/${pick.artist}`}>
                {pick.artist}
              </ArtistLink>{" "}
              - {pick.title}
            </h2>
          ) : (
            <h2>{pick.title}</h2>
          )}
          <ContentDiv>
            <Link to={`/${mediaPicked}/${pick.pickId}`}>
              <ImageLarge pick={pick} />
            </Link>
            <ReviewDiv>
              {/*CHANGE FROM INLINE */}
              {pick.video && (
                <a
                  href={pick.video.replace("embed/", "watch?v=")}
                  style={{ color: "var(--dark-grey)", width: "fit-content" }}
                >
                  <RiYoutubeFill size={30} />
                </a>
              )}
              {pick.userId === currentUser.userId ? (
                <h3>Your Review</h3>
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
                  {pick?.review}{" "}
                  <ReviewPopUp pick={pick} mediaPicked={mediaPicked} />
                </div>
              )}
              {pick.userId === currentUser.userId ? (
                <DeleteIcon size={30} onClick={removePick} />
              ) : (
                <>
                  <AiFillHeart size={30} />
                  <div>
                    comment text input that patches comment to pick in database
                    (also how heart will work)
                  </div>
                </>
              )}
            </ReviewDiv>
          </ContentDiv>
        </>
      )}
    </>
  );
};

const ContentDiv = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 40px;
  border-radius: 10px;

  span {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  h3 {
    text-decoration: underline;
  }
`;

const DeleteIcon = styled(AiFillDelete)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
    transition: all 0.4 ease-in-out;
  }
`;

const ArtistLink = styled(Link)`
  text-decoration: underline;
  color: var(--dark-grey);
  text-decoration-thickness: 1.5px;

  :hover {
    text-decoration-thickness: 3px;
  }
`;

export default PickDetail;
