import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import SmallPicks from "./MyPicks/SmallPicks";
//-----------------------//
//---Profile Component---//
//-----------------------//
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <main>
        <HeaderDiv>
          <UserDiv>
            {user?.picture && (
              <ProfileImg src={user.picture} alt={user?.name} />
            )}
            <div>
              <h1>{user.name}</h1>
              <button>Edit Profile</button>
            </div>
          </UserDiv>
          <div>
            <h3>
              <span>Favorite Genre:</span>Rock
            </h3>
            <h3>
              <span>Favorite Artist:</span>Oasis
            </h3>
          </div>
        </HeaderDiv>
        <PicksDiv>
          <div>
            {/* My Picks: */}
            <SmallPicks />
          </div>
        </PicksDiv>
      </main>
    )
  );
};

const HeaderDiv = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const ProfileImg = styled.img`
  border-radius: 50%;
  height: 120px;
`;

const PicksDiv = styled.div``;

export default Profile;
