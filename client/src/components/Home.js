/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import Feed from "./Feed";

//-----------------------//
//---Home Component---//
//-----------------------//
const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const { currentUser, receiveCurrentUser } = useContext(UserContext);

  //Add user to db if not already there
  useEffect(() => {
    user &&
      fetch("/add-user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          given_name: user.given_name,
          family_name: user.family_name,
          name: user.name,
          nickname: user.nickname,
          picture: user.picture,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //Enter Id, name in session storage
          data.status === 200 &&
            receiveCurrentUser({
              userId: data.data.userId,
              name: data.data.given_name,
            });
        });
  }, [user]);

  return (
    <main>
      <Wrapper>
        <TitleDiv>
          <HomeLogo src="/logo.png" style={{ background: "transparent" }} />
          <div>
            <h1>Desert</h1>
            <h1>IslandPicks</h1>
          </div>
        </TitleDiv>
        <Line />
        {isAuthenticated ? (
          <>
            <h2>Welcome back, {currentUser.name}</h2>
            <Feed />
          </>
        ) : (
          <ul>
            <li>1 Island</li>
            <li>5 Records</li>
            <li>5 Movies</li>
            <li>5 Books</li>
            <li>What are your Picks?</li>
          </ul>
        )}
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  transition: none;

  ul {
    list-style-type: none;
    font-size: 22px;
  }
`;

const Line = styled.div`
  width: 100%;
  border-top: 3px solid ${({ theme }) => theme.text};
  margin: 15px 0;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  h1 {
    font-size: 60px;
  }
`;

const HomeLogo = styled.img`
  height: 145px;
  margin-right: 10px;
`;
export default Home;
