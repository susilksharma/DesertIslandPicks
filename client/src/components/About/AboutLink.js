import styled from "styled-components";
import { Link } from "react-router-dom";

//--------------------------//
//---About Link Component---//
//--------------------------//
const AboutLink = () => {
  return (
    <Wrapper>
      <StyledLink to={"/about"}>
        <Footprints src="/footprints.png" />
      </StyledLink>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: ${({ theme }) => theme.background};
  width: 100%;
`;

const StyledLink = styled(Link)`
  background: transparent;
`;

const Footprints = styled.img`
  background: transparent;
  height: 50px;
  position: fixed;
  bottom: 20px;
  right: 30px;
  opacity: 0.5;
  :hover {
    filter: opacity(0.8);
    transition: all 0.5s ease-in-out;
  }
`;

export default AboutLink;
