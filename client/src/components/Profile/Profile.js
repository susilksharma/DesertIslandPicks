import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import SmallPicks from "../MyPicks/SmallPicks";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { AiFillEdit } from "react-icons/ai";

//-----------------------//
//---Profile Component---//
//-----------------------//
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [genre, setGenre] = useState("");
  const [favArtist, setFavArtist] = useState("");
  const [picks, setPicks] = useState(null);
  const { currentUser } = useContext(UserContext);

  //LOGIC TO GET SPECIFIC USER PICKS NEEDS TO CHANGE
  useEffect(() => {
    fetch(`/mypicks/${currentUser.userId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setPicks(data.data);
      });
  }, []);

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
              Favorite Genre:
              <span> Rock</span>
              <AiFillEdit />
            </h3>
            <h3>
              Favorite Artist:
              <span> Oasis</span>
              <AiFillEdit />
            </h3>
          </div>
        </HeaderDiv>
        <Line />
        <h2>My Picks:</h2>
        {picks && (
          <PicksDiv>
            <section>
              <SmallPicks picks={picks} />
            </section>
          </PicksDiv>
        )}
      </main>
    )
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

const ProfileImg = styled.img`
  border-radius: 50%;
  height: 120px;
`;

const PicksDiv = styled.div`
  color: ${({ theme }) => theme.text};

  width: 100%;
  display: flex;
  justify-content: center;
`;

export default Profile;
