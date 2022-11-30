import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

//------------------------------//
//---Log Out Button Component---//
//------------------------------//
const LogOutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <ButtonLogOut onClick={() => logout()}>Sign Out</ButtonLogOut>
    )
  );
};

const ButtonLogOut = styled.button`
  background: transparent;
  color: var(--white);
  text-decoration: none;
  cursor: pointer;
  border: none;
  font-size: 16px;
  font-weight: 400;
  :hover {
    color: #fc8888;
  }
`;

export default LogOutButton;
