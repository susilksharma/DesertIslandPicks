/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

//-----------------------------//
//---Movie Details Component---//
//-----------------------------//
const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const movieId = useParams();
  const { currentUser } = useContext(UserContext);

  // Fetch album details on component render
  useEffect(() => {
    fetch(`/movies/${movieId.movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.data);
      })
      //WHAT TO DO WITH ERROR
      .catch((err) => console.log("Error: ", err));
  }, []);

  const addMovie = () => {
    fetch(`/add-movie`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: currentUser.userId,
        userName: currentUser.name,
        pickId: movie.imdbID,
        title: movie.Title,
        artist: movie.Director,
        image: movie.Poster,
        genre: movie.Genre,
        year: movie.Year,
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
      {!movie ? (
        <LoadingDiv>
          <img src="/spinnerv1.gif" alt="spinner" />
        </LoadingDiv>
      ) : (
        <MovieDiv>
          <ImgDiv onClick={addMovie}>
            <img alt={`${movie.Title} cover`} src={movie?.Poster} />
            <div>
              <h1>Add To Picks</h1>
            </div>
          </ImgDiv>
          <InfoDiv>
            <h2>{movie.Title}</h2>
            <h3>
              Directed by {movie.Director},{" "}
              {/* <YearLink to={`/search-movies-year/${movie.Year}`}> */}
              {movie.Year}
              {/* </YearLink> */}
            </h3>
            <h3>
              <span>
                {movie.Genre}/{movie.Runtime}
              </span>
            </h3>
            <h3>Starring {movie?.Actors}</h3>
            <Description>{movie.Plot}</Description>
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

const ImgDiv = styled.div`
  position: relative;

  img {
    height: 550px;
    width: auto;
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
  height: 200px;
`;

const YearLink = styled(Link)`
  text-decoration: underline;
  color: var(--dark-grey);
`;

export default MovieDetails;
