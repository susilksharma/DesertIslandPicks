/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlbumIcon from "../Album/AlbumIcon";

//------------------------------//
//---Search Results Component---//
//------------------------------//
const MovieSearchResults = () => {
  const [items, setItems] = useState([]);
  const { searchValue } = useParams();

  //  ----------BACKEND FETCH----------
  useEffect(() => {
    fetch(`/search-movie/${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.data.results);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  //   console.log("items: ", items);
  return (
    items && (
      <main>
        <ResultsDiv>
          {items.map((item) => {
            // if (item.thumb && item.catno && item.master_id)
            return <AlbumIcon key={item.id} album={item} />;
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
