import styled from "styled-components";
import { Link } from "react-router-dom";

//-----------------------------//
//---Album Info Component------//
//-----------------------------//
const AlbumInfo = ({ album }) => {
  return (
    <InfoDiv>
      <h2>
        <ArtistLink
          to={`/search-album/${album.artists?.[0]?.name.replace(
            / *\([^)]*\) */g,
            ""
          )}`}
        >
          {album.artists?.[0]?.name.replace(/ *\([^)]*\) */g, "")}
        </ArtistLink>{" "}
        - {album.title}
      </h2>
      <h3>
        <span>
          {album.genres?.[0]}/{album.styles?.[0]}
        </span>
        {", "}
        {album?.year}
      </h3>

      {/*Map Tracklist*/}
      <Tracklist>
        {album.tracklist
          ?.map((track) => {
            return (
              <p key={track?.position}>
                {track?.position}. {track?.title}
              </p>
            );
          })
          .slice(0, 26)}
      </Tracklist>

      <iframe
        src={album.videos?.[0]?.uri.replace("watch?v=", "embed/")}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
        width="400px"
        height="220px"
      />
    </InfoDiv>
  );
};

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Tracklist = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: 200px;
  max-width: 300px;
`;

const ArtistLink = styled(Link)`
  text-decoration: underline;
  color: var(--dark-grey);
  text-decoration-thickness: 1.5px;

  :hover {
    text-decoration-thickness: 3px;
  }
`;

export default AlbumInfo;
