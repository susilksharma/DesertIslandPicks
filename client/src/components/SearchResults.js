/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlbumIcon from "./AlbumIcon";

//------------------------------//
//---Search Results Component---//
//------------------------------//
const SearchResults = () => {
  const [items, setItems] = useState([]);
  const { searchValue } = useParams();

  //   const token = process.env.TOKEN;

  //   FRONTEND FETCH
  //   useEffect(() => {
  //     fetch(
  //       `https://api.discogs.com/database/search?q=${searchValue}&type=master&token=oyaFRPoxMTzLFVmoqMQOzbmvHNWeDoFzgItISPcw`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         setItems(data.results);
  //       })
  //       .catch((err) => console.log("Error: ", err));
  //   }, []);

  //  ----------BACKEND FETCH----------
  useEffect(() => {
    fetch(`/search/${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.data.results);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);
  //  ----------BACKEND FETCH----------

  //   console.log("items: ", items);
  return (
    items && (
      <main>
        <ResultsDiv>
          {items.map((item) => {
            if (item.thumb && item.catno && item.master_id)
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

export default SearchResults;
