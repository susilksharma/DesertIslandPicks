import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsBook, BsMusicNote, BsFilm } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";

//--------------------------------//
//---Explore Icon Component-------//
//--------------------------------//
const ExploreIcon = ({ pick }) => {
  return (
    <IconDiv to={`/${pick.type}/${pick.pickId}`}>
      {pick.userName ? (
        <Header>
          <h4>Liked by {pick.userName}</h4>
        </Header>
      ) : (
        <Header>
          <h4>Because you like {pick.basedOn}</h4>
        </Header>
      )}
      <ImgDiv>
        <img src={pick.image} alt={`${pick.title} cover`} />
        <div>
          <figure>
            <AiOutlineEye color="#F8F8F8" size={40} />
          </figure>
        </div>
      </ImgDiv>
      <InfoDiv>
        <h3>{pick.title}</h3>
        <div>
          <BsMusicNote
            size={20}
            style={{
              display: pick.type === "album" ? "block" : "none",
            }}
          />
          <BsFilm
            size={20}
            style={{
              display: pick.type === "movie" ? "block" : "none",
            }}
          />
          <BsBook
            size={20}
            style={{
              display: pick.type === "book" ? "block" : "none",
            }}
          />
        </div>
      </InfoDiv>
    </IconDiv>
  );
};

const IconDiv = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #94d1d9;
  border-radius: 10px;
  color: var(--dark-grey);
  padding: 20px;
  height: 330px;
  width: 300px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  text-decoration: none;
  overflow: hidden;
`;

const Header = styled.div`
  width: 300px;
  background-color: var(--dark-grey);
  color: var(--white);
  padding: 4%;
  border-radius: 10px 10px 0 0;
  position: relative;
  bottom: 20px;
  h4 {
    font-size: 16px;
    font-weight: normal;
  }
`;

const ImgDiv = styled.div`
  position: relative;

  img {
    height: 180px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }

  div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 180px;
    width: 100%;
    transition: 0.5s ease;
    background-color: #464646;
    opacity: 0;
  }

  :hover div {
    opacity: 0.7;
    cursor: pointer;
  }

  figure {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-end;
  gap: 10px;
  color: var(--dark-grey);

  h3 {
    font-size: 16px;
  }
`;

export default ExploreIcon;
