import styled from "styled-components";
import SmallPicks from "../Picks/SmallPicks";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import { UserContext } from "../UserContext";
import { useContext } from "react";

//-----------------------//
//---Profile Component---//
//-----------------------//
const Profile = () => {
  const userId = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [recent, setRecent] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    fetch(`/profile/${userId.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data.data);
      });
    fetch(`/recent`)
      .then((response) => response.json())
      .then((data) => {
        setRecent(data.data);
      });
  }, []);
  console.log(userInfo);

  return (
    <main>
      {!userInfo ? (
        <LoadingDiv>
          <img src="/spinnerv1.gif" alt="loading spinner" />
        </LoadingDiv>
      ) : (
        <>
          <HeaderDiv>
            <UserDiv>
              <ProfileImg src={userInfo?.picture} alt={userInfo.name} />
              <div>
                <h1>
                  {userInfo.given_name} {userInfo.family_name}
                </h1>
                {userId.userId === currentUser.userId && (
                  <EditProfile userInfo={userInfo} />
                )}
              </div>
            </UserDiv>
            <div>
              <h3>
                Favorite Movie:
                <FavLink to={`/search-movie/${userInfo?.favMovie}`}>
                  <span> {userInfo?.favMovie}</span>
                </FavLink>
              </h3>
              <h3>
                Favorite Musical Artist:
                <FavLink to={`/search-album/${userInfo?.favMusicalArtist}`}>
                  <span> {userInfo?.favMusicalArtist}</span>
                </FavLink>{" "}
              </h3>
              <h3>
                Favorite Author:
                <FavLink to={`/search-book/${userInfo?.favAuthor}`}>
                  <span> {userInfo?.favAuthor}</span>
                </FavLink>{" "}
              </h3>
            </div>
          </HeaderDiv>
          <Line />
          <PicksDiv>
            <div>
              <section>
                <SmallPicks user={userInfo} />
              </section>
            </div>
            <div>Recent Activity</div>
            {recent &&
              recent.map((activity) => {
                return (
                  <div>
                    {recent.userName} {recent.activity}{" "}
                  </div>
                );
              })}
          </PicksDiv>
        </>
      )}
    </main>
  );
};

const HeaderDiv = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.text};

  h3 {
    font-size: 20px;
    font-style: normal;
    font-weight: bold;

    span {
      font-size: 18px;
      font-style: italic;
    }
  }
`;

const Line = styled.div`
  width: 100%;
  border-top: 3px solid ${({ theme }) => theme.text};
  margin: 15px 0;
`;

const UserDiv = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  gap: 20px;

  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  button {
    background: #919191;
    color: var(--white);
    border: none;
    border-radius: 5px;
    width: fit-content;
    padding: 5px 10px;
  }
`;

const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  height: 150px;
  width: 150px;
`;

const PicksDiv = styled.div`
  color: ${({ theme }) => theme.text};
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;

const FavLink = styled(Link)`
  text-decoration: underline;
  color: var(--dark-grey);
  text-decoration-thickness: 1.5px;

  :hover {
    text-decoration-thickness: 3px;
  }
`;

export default Profile;
