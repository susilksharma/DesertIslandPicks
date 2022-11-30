import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./SearchBar";
import { BsFillMoonFill } from "react-icons/bs";

//----------------------//
//---Header Component---//
//----------------------//
const Header = ({ themeToggler }) => {
  const { isLoading, error, isAuthenticated } = useAuth0();

  return (
    <HeaderDiv>
      <Link to={"/"} style={{ background: "transparent" }}>
        <HomeLogo src="/logo.png" style={{ background: "transparent" }} />
      </Link>

      <BsFillMoonFill
        onClick={themeToggler}
        color="#F8F8F8"
        size={22}
        style={{ cursor: "pointer" }}
      />
      <PageLink
        to={`/mypicks/`}
        style={{ visibility: !isAuthenticated && "hidden" }}
      >
        My Picks
      </PageLink>

      <PageLink
        to={"/profile"}
        style={{ visibility: !isAuthenticated && "hidden" }}
      >
        Profile
      </PageLink>
      <PageLink to={"/explore"}>Explore</PageLink>
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
  padding: 0 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--dark-grey);
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
`;

const PageLink = styled(NavLink)`
  font-size: 16px;
  font-weight: 400;
  color: var(--white);
  text-decoration: none;
  cursor: pointer;

  :hover {
    color: #ec7274;
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
