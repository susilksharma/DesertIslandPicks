/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieIcon from "../Movies/MovieIcon";

//------------------------------------//
//---Movie Search Results Component---//
//------------------------------------//
const MovieSearchResults = () => {
  const [items, setItems] = useState([]);
  const { searchValue } = useParams();

  //Fetch search results from backend and set in state
  useEffect(() => {
    fetch(`/search-movie/${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.data.results);
      })
      .catch((err) => console.error("Error: ", err));
  }, []);

  return (
    <main>
      {items && (
        <ResultsDiv>
          {items.map((item) => {
            if (item.poster_path)
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

export default MovieSearchResults;
