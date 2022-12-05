/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { ImFilm } from "react-icons/im";

//-----------------------------//
//---Movie Details Component---//
//-----------------------------//
const MovieDetails = () => {
  const [movieInfo, setMovieInfo] = useState(null);
  const movieId = useParams();
  const { currentUser } = useContext(UserContext);
  const { isAuthenticated } = useAuth0();

  // Fetch album details on component render
  useEffect(() => {
    fetch(`/movie/${movieId.movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieInfo(data.data);
      })
      //WHAT TO DO WITH ERROR
      .catch((err) => console.log("Error: ", err));
  }, []);

  console.log(movieInfo);

  const addMovie = () => {
    isAuthenticated &&
      fetch(`/add-movie`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: currentUser.userId,
          userName: currentUser.name,
          pickId: movieInfo.details?.imdb_id,
          title: movieInfo.details?.title,
          artist: movieInfo.director[0].name,
          image: `https://image.tmdb.org/t/p/original/${movieInfo.details?.poster_path}`,
          genres: movieInfo.details?.genres,
          year: movieInfo.details?.release_date.slice(0, 4),
          link: movieInfo.streamingLink.link,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            window.alert("Movie added to Picks!");
          } else {
            window.alert(data.message);
          }
        })
        .catch((error) => {
          window.alert("Sorry, please try again.", error);
        });
  };

  return (
    <main>
      {!movieInfo ? (
        <LoadingDiv>
          <img src="/spinnerv1.gif" alt="spinner" />
        </LoadingDiv>
      ) : (
        <MovieDiv>
          <ImgDiv onClick={addMovie} isAuthenticated={isAuthenticated}>
            <img
              alt={`${movieInfo.details?.title} cover`}
              src={`https://image.tmdb.org/t/p/original/${movieInfo.details?.poster_path}`}
            />
            <div>
              {isAuthenticated ? (
                <h1>Add To Picks</h1>
              ) : (
                <h1>Sign In To Add To Picks</h1>
              )}
            </div>
          </ImgDiv>
          <InfoDiv>
            <h2>{movieInfo.details?.title}</h2>
            <h3>
              Directed by{" "}
              <GenreLink
                to={`/search-movie-director/${movieInfo?.director[0].id}`}
              >
                {movieInfo?.director[0].name},{" "}
              </GenreLink>
              {movieInfo.details?.release_date.slice(0, 4)}
            </h3>
            <h3>
              {movieInfo.details?.genres.map((genre) => {
                return (
                  <span key={genre?.id}>
                    <GenreLink to={`/search-movie-genre/${genre?.id}`}>
                      {genre?.name}
                    </GenreLink>
                    /
                  </span>
                );
              })}
              <span>{movieInfo.details?.runtime} min</span>
            </h3>
            <div>
              <h3>Starring: </h3>
              {movieInfo.cast?.map((cast, i) => {
                return <p key={i}>{cast}</p>;
              })}
            </div>
            <Description>{movieInfo.details?.overview}</Description>
            <div>
              <h3>Streaming Options:</h3>
              <a
                href={movieInfo.streamingLink.link}
                target="_blank"
                rel="noreferrer"
              >
                <FilmIcon size={30} />
              </a>
            </div>
          </InfoDiv>
        </MovieDiv>
      )}
    </main>
  );
};

const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MovieDiv = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  color: var(--dark-grey);

  h2 {
    font-size: 2em;
  }

  h3 {
    font-size: 1em;
    span {
      font-style: italic;
    }
  }

  p {
    font-size: 0.8em;
  }
`;

const FilmIcon = styled(ImFilm)`
  color: var(--dark-grey);
`;

const ImgDiv = styled.div`
  position: relative;

  img {
    height: 500px;
    width: auto;
  }

  div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 500px;
    width: 100%;
    transition: 0.5s ease;
    background-color: #464646;
    opacity: 0;
  }

  :hover div {
    opacity: 0.7;
    cursor: ${(props) => (props.isAuthenticated ? "pointer" : "not-allowed")};
  }

  h1 {
    color: white;
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

export default MovieDetails;
