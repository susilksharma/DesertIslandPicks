import styled from "styled-components";
import { Link } from "react-router-dom";

//-----------------------------//
//---Album Icon Component---//
//-----------------------------//
const AlbumIcon = ({ album }) => {
  return (
    <AlbumDiv to={`/album/${album.master_id}`}>
      <img src={album.thumb} alt={`${album.title} album cover`} />
      <h3>{album.title}</h3>
    </AlbumDiv>
  );
};

const AlbumDiv = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  background-color: #818fb5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  text-decoration: none;

  h3 {
    text-align: center;
    margin-top: 10px;
    color: var(--white);
  }

  img {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
`;

export default AlbumIcon;
