import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import ImageLarge from "./ImageLarge";
import Review from "./Review";

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
        console.error("Error,", error);
      });
  };
  return (
    <>
      {!pick ? (
        <h1>No Pick made</h1>
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
            <Review
              pick={pick}
              currentUser={currentUser}
              mediaPicked={mediaPicked}
              removePick={removePick}
            />
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

const ArtistLink = styled(Link)`
  text-decoration: underline;
  color: var(--dark-grey);
  text-decoration-thickness: 1.5px;

  :hover {
    text-decoration-thickness: 3px;
  }
`;

export default PickDetail;
