import styled from "styled-components";
import { Link } from "react-router-dom";
import { ImFilm } from "react-icons/im";

//------------------------------//
//---Movie Info Component-------//
//------------------------------//
const MovieInfo = ({ movieInfo }) => {
  return (
    <InfoDiv>
      <h2>{movieInfo?.details?.title}</h2>
      <h3>
        Directed by{" "}
        <GenreLink to={`/search-movie-director/${movieInfo?.director?.[0].id}`}>
          {movieInfo?.director?.[0].name},{" "}
        </GenreLink>
        {movieInfo?.details?.release_date.slice(0, 4)}
      </h3>
      <h3>
        {movieInfo?.details?.genres.map((genre) => {
          return (
            <span key={genre?.id}>
              <GenreLink to={`/search-movie-genre/${genre?.id}`}>
                {genre?.name}
              </GenreLink>
              /
            </span>
          );
        })}
        <span>{movieInfo?.details?.runtime} min</span>
      </h3>
      <div>
        <h3>Starring: </h3>
        {movieInfo?.cast?.map((cast, i) => {
          return <p key={i}>{cast}</p>;
        })}
      </div>
      <Description>{movieInfo?.details?.overview}</Description>
      <div>
        <h3>Streaming Options:</h3>
        <a
          href={movieInfo?.streamingLink?.link}
          target="_blank"
          rel="noreferrer"
        >
          <FilmIcon size={30} />
        </a>
      </div>
    </InfoDiv>
  );
};

const FilmIcon = styled(ImFilm)`
  color: var(--dark-grey);
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Description = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: fit-content;
  width: 500px;
`;

const GenreLink = styled(Link)`
  text-decoration: underline;
  color: var(--dark-grey);
  text-decoration-thickness: 0.5px;

  :hover {
    text-decoration-thickness: 2px;
  }
`;

export default MovieInfo;
