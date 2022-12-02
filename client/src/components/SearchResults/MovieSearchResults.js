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

  //  ----------BACKEND FETCH----------
  useEffect(() => {
    fetch(`/search-movies/${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItems(data.data.Search);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  console.log("items: ", items);
  return (
    items && (
      <main>
        <ResultsDiv>
          {items.map((item) => {
            return <MovieIcon key={item.imdbId} movie={item} />;
          })}
        </ResultsDiv>
      </main>
    )
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
