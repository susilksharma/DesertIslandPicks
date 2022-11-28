/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

//-----------------------//
//---Home Component---//
//-----------------------//
const Home = () => {
  const { user, isAuthenticated } = useAuth0();

  //ADD USER TO DB IF NOT ALREADY THERE (CHECK EMAIL)
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
          picture: user.picture,
        }),
      }).then((res) => res.json());
    //DO I NEED TO DO SOMETHING WITH THE RESPONSE??
    // .then((data) => {
    //   console.log(data);
    // });
  }, [isAuthenticated]);

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
          <h2>Welcome back, {user?.given_name}</h2>
        ) : (
          <h2>What are your favorite albums?</h2>
        )}
        {/* <ol>
          <li>feed</li>
          <li>recommendations</li>
        </ol> */}
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: var(--dark-grey);
`;

const Line = styled.div`
  width: 100%;
  border-top: 3px solid var(--dark-grey);
  margin: 15px 0;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  h1 {
    font-size: 80px;
  }
`;

const HomeLogo = styled.img`
  height: 200px;
`;
export default Home;