import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

//-----------------------------//
//---Log In Button Component---//
//-----------------------------//
const LogInButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <ButtonLogIn onClick={() => loginWithRedirect()}>Sign In</ButtonLogIn>
    )
  );
};

const ButtonLogIn = styled.button`
  background: transparent;
  color: var(--white);
  text-decoration: none;
  cursor: pointer;
  border: none;
  font-size: 16px;
  font-weight: 400;
  :hover {
    color: #fc8888;
    transition: all 0.2s ease-in-out;
  }
`;

export default LogInButton;
