import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

//-----------------------------//
//---Album Icon Component---//
//-----------------------------//
const AlbumIcon = ({ album }) => {
  return (
    <AlbumDiv to={`/album/${album.master_id}`}>
      <ImgDiv>
        <img src={album.thumb} alt={`${album.title} album cover`} />
        <div>
          <figure>
            <AiOutlineEye color="#F8F8F8" size={40} />
          </figure>
        </div>
      </ImgDiv>
      <h3>{album.title}</h3>
    </AlbumDiv>
  );
};

const AlbumDiv = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  background-color: #c1cce3;
  border-radius: 10px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  text-decoration: none;

  h3 {
    text-align: center;
    margin-top: 10px;
    color: var(--dark-grey);
  }
`;

const ImgDiv = styled.div`
  position: relative;

  img {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }

  div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
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

export default AlbumIcon;
