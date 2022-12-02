import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiFillDelete } from "react-icons/ai";
import { RiYoutubeFill } from "react-icons/ri";
import ReviewPopUp from "./ReviewPopUp";
import { useContext } from "react";
import { UserContext } from "../UserContext";

//----------------------------//
//---Picks Detail Component---//
//----------------------------//
const PickDetail = ({ pick, mediaPicked }) => {
  const { currentUser } = useContext(UserContext);
  const removePick = (e) => {
    e.preventDefault();
    fetch(`/delete-pick/`, {
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
      {mediaPicked === "movies" ? (
        <h2>{pick.title}</h2>
      ) : (
        <h2>
          <ArtistLink to={`/search-${mediaPicked}/${pick.artist}`}>
            {pick.artist}
          </ArtistLink>{" "}
          - {pick.title}
        </h2>
      )}
      <ContentDiv>
        <Link to={`/${mediaPicked}/${pick.pickId}`}>
          <ImgDiv>
            <img src={pick?.image} alt={`${pick?.title} album cover`} />
            <div>
              <figure>
                <AiOutlineEye color="#F8F8F8" size={40} />
              </figure>
            </div>
          </ImgDiv>
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
          <h3>Your Review</h3>
          {pick?.review === "" ? (
            <div>
              No review logged. <ReviewPopUp pick={pick} />
            </div>
          ) : (
            <div>
              {pick?.review} <ReviewPopUp pick={pick} />
            </div>
          )}
          <AiFillDelete size={30} onClick={removePick} />
        </ReviewDiv>
      </ContentDiv>
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

const ImgDiv = styled.div`
  position: relative;

  img {
    height: 300px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }

  div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    transition: 0.5s ease;
    background-color: #464646;
    opacity: 0;
  }

  :hover div {
    opacity: 0.7;
    cursor: pointer;
  }

  figure {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
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

const ArtistLink = styled(Link)`
  text-decoration: underline;
  color: ${({ theme }) => theme.text};
`;

export default PickDetail;
