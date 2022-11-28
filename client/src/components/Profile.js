import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
//-----------------------//
//---Profile Component---//
//-----------------------//
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <main>
        <h1>Welcome Back, {user.given_name}</h1>
        {user?.picture && <ProfileImg src={user.picture} alt={user?.name} />}
      </main>
    )
  );
};

const ProfileImg = styled.img`
  border-radius: 50%;
`;

export default Profile;
