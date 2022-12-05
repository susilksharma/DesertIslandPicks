/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieIcon from "../Movies/MovieIcon";

//------------------------------------//
//---Movie Search Results Component---//
//------------------------------------//
const MovieSearchGenreResults = () => {
  const [items, setItems] = useState([]);
  const { genreId } = useParams();
  const navigate = useNavigate();

  //  ----------BACKEND FETCH----------
  useEffect(() => {
    fetch(`/search-movie-genre/${genreId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setItems(data.data.results);
      })
      .catch((err) => navigate("/error"));
  }, []);

  console.log("items: ", items);
  return (
    <main>
      {items && (
        <ResultsDiv>
          {items.map((item) => {
            return <MovieIcon key={item.backdrop_path} movie={item} />;
          })}
        </ResultsDiv>
      )}
    </main>
  );
};

const ResultsDiv = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 300px 300px;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export default MovieSearchGenreResults;
