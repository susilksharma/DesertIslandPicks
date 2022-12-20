import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./SearchBar";
import { BsFillMoonFill } from "react-icons/bs";
import { UserContext } from "../UserContext";
import { useContext } from "react";

//----------------------//
//---Header Component---//
//----------------------//
const Header = ({ themeToggler }) => {
  const { isLoading, error, isAuthenticated } = useAuth0();
  const { currentUser } = useContext(UserContext);

  return (
    <HeaderDiv>
      <Link to={"/"} style={{ background: "transparent" }}>
        <HomeLogo src="/logo.png" style={{ background: "transparent" }} />
      </Link>

      <MoonDiv>
        <BsFillMoonFill
          onClick={themeToggler}
          color="${({ theme }) => theme.moon}"
          size={22}
          style={{ cursor: "pointer" }}
        />
      </MoonDiv>
      {currentUser && (
        <PageLink
          to={`/picks/user/${currentUser.userId}`}
          style={{ visibility: !isAuthenticated && "hidden" }}
        >
          My Picks
        </PageLink>
      )}

      <PageLink
        to={`/profile/${currentUser.userId}`}
        style={{ visibility: !isAuthenticated && "hidden" }}
      >
        Profile
      </PageLink>

      {currentUser && (
        <PageLink
          to={"/explore"}
          style={{ visibility: !isAuthenticated && "hidden" }}
        >
          Explore
        </PageLink>
      )}

      {/*Check conditions for rendering Login/Logout button */}
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading..</p>}
      {!error && !isLoading && (
        <>
          <LogInButton />
          <LogOutButton />
        </>
      )}
      <SearchBar />
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  width: 100%;
  height: 80px;
  padding: 0 220px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--dark-grey);
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
`;

const MoonDiv = styled.div`
  color: ${({ theme }) => theme.moon};

  :hover {
    color: #8ba9f0;
    transition: all 0.2s ease-in-out;
  }
`;

const PageLink = styled(NavLink)`
  font-size: 16px;
  font-weight: 400;
  color: var(--white);
  text-decoration: none;
  cursor: pointer;

  :hover {
    color: #ec7274;
    transition: all 0.2s ease-in-out;
  }

  &.active {
    color: #ec7274;
  }
`;

const HomeLogo = styled.img`
  height: 50px;
  cursor: pointer;
`;

export default Header;
