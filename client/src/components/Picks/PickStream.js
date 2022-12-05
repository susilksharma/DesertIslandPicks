import { RiYoutubeFill } from "react-icons/ri";
import { ImFilm } from "react-icons/im";
import { AiFillGoogleCircle } from "react-icons/ai";
import styled from "styled-components";

//-------------------------------//
//---Picks Streaming Component---//
//-------------------------------//
const PickStream = ({ mediaPicked, pick }) => {
  return (
    <>
      <h3>Streaming:</h3>
      <Line />
      {mediaPicked === "album" ? (
        <a
          href={pick?.link?.replace("embed/", "watch?v=")}
          target="_blank"
          rel="noreferrer"
        >
          <RiYoutubeFill size={30} />
        </a>
      ) : mediaPicked === "movie" ? (
        <a href={pick?.link} target="_blank" rel="noreferrer">
          <ImFilm size={30} />
        </a>
      ) : (
        <a href={pick?.link} target="_blank" rel="noreferrer">
          <AiFillGoogleCircle size={30} />
        </a>
      )}
    </>
  );
};

const Line = styled.div`
  width: 100%;
  border-top: 1px solid var(--dark-grey);
`;

export default PickStream;
