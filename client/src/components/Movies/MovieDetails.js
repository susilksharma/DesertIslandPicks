/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import MovieInfo from "./MovieInfo";

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
      .catch((err) => console.error("Error: ", err));
  }, []);

  // Add Movie Pick to database
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
              alt={`${movieInfo?.details?.title} cover`}
              src={`https://image.tmdb.org/t/p/original/${movieInfo?.details?.poster_path}`}
            />
            <div>
              {isAuthenticated ? (
                <h1>Add To Picks</h1>
              ) : (
                <h1>Sign In To Add To Picks</h1>
              )}
            </div>
          </ImgDiv>
          <MovieInfo movieInfo={movieInfo} />
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

export default MovieDetails;
