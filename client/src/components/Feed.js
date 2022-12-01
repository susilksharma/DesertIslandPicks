import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import SmallPicks from "./MyPicks/SmallPicks";
import { UserContext } from "./UserContext";

const Feed = () => {
  const { currentUser } = useContext(UserContext);
  const [picks, setPicks] = useState([]);

  useEffect(() => {
    fetch(`/feed/${currentUser.userId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("feed:", data);
        setPicks(data.data);
      });
  }, []);

  return (
    <Wrapper>
      {picks.length === 0 ? (
        <div>
          <img src="/spinnerv1.gif" />
        </div>
      ) : (
        <FeedDiv>
          {picks.map((pick) => {
            return <SmallPicks key={pick.main_release} picks={pick} />;
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
