import styled from "styled-components";
import { Link } from "react-router-dom";

//-----------------------//
//---About Link Component---//
//-----------------------//
const AboutLink = () => {
  return (
    <StyledLink to={"/about"}>
      <Footprints src="/footprints.png" />
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  background: transparent;
`;

const Footprints = styled.img`
  background: transparent;
  height: 50px;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  bottom: 10px;
  right: -10px;
  opacity: 0.6;
`;

export default AboutLink;
