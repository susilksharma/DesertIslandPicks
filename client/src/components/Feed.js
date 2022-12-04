import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import SmallPicks from "./Picks/SmallPicks";
import { UserContext } from "./UserContext";

const Feed = () => {
  const { currentUser } = useContext(UserContext);
  const [userPicks, setUserPicks] = useState([]);

  useEffect(() => {
    fetch(`/feed/${currentUser.userId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("feed:", data);
        setUserPicks(data.data);
      });
  }, []);

  return (
    <Wrapper>
      {userPicks.length === 0 ? (
        <LoadingDiv>
          <img src="/spinnerv1.gif" alt="Loading Spinner" />
        </LoadingDiv>
      ) : (
        <FeedDiv>
          {userPicks.map((user) => {
            return <SmallPicks key={user._id} user={user} />;
          })}
        </FeedDiv>
      )}
      <section>
        <h3>Picks Feed</h3>
        <Line />
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  section {
    margin-top: 20px;
    h3 {
      text-align: right;
      margin-right: 10px;
    }
  }
`;

const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FeedDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Line = styled.div`
  width: 100%;
  border-top: 3px solid ${({ theme }) => theme.text};
  margin: 15px 0;
`;

export default Feed;
