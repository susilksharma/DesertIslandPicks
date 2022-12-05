/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import ExploreIcon from "./ExploreIcon";

//-----------------------//
//---Explore Component---//
//-----------------------//
const Explore = () => {
  const { currentUser } = useContext(UserContext);
  const [popularPicks, setPopularPicks] = useState([]);
  const [recommended, setRecommended] = useState(null);

  //Fetch info for Popular With Friends & Recommended and set in state
  useEffect(() => {
    fetch(`picks-popular/${currentUser.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setPopularPicks(data.data);
      });
    fetch(`/recommended/${currentUser.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setRecommended(data.data);
      });
  }, []);

  return (
    <main>
      {popularPicks.length === 0 ? (
        <LoadingDiv>
          <img src="/spinnerv1.gif" alt="spinner" />
        </LoadingDiv>
      ) : (
        <>
          <FeedDiv>
            {popularPicks.map((pick) => {
              return <ExploreIcon key={pick.id} pick={pick} />;
            })}
          </FeedDiv>
          <PopFriends>Popular With Friends</PopFriends>
          <Line />
          <h3>Recommended For You:</h3>
          <FeedDiv>
            {recommended ? (
              recommended.map((pick) => {
                return <ExploreIcon key={pick.id} pick={pick} />;
              })
            ) : (
              <>Update profile for recommendations ( ͡° ͜ʖ ͡°)</>
            )}
          </FeedDiv>
        </>
      )}
    </main>
  );
};
const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PopFriends = styled.h3`
  width: 100%;
  text-align: right;
`;

const FeedDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 30px 0;
`;

const Line = styled.div`
  width: 100%;
  border-top: 3px solid ${({ theme }) => theme.text};
  margin: 15px 0;
`;

export default Explore;
