/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlbumIcon from "../Album/AlbumIcon";

//------------------------------//
//---Search Results Component---//
//------------------------------//
const AlbumSearchResults = () => {
  const [items, setItems] = useState([]);
  const { searchValue } = useParams();

  // const token = process.env.TOKEN;

  //  ----------BACKEND FETCH----------
  useEffect(() => {
    fetch(`/search-album/${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.data.results);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  //   console.log("items: ", items);
  return (
    <main>
      {items.length === 0 ? (
        <LoadingDiv>
          <img src="/spinnerv1.gif" alt="Loading Spinner" />
        </LoadingDiv>
      ) : (
        <ResultsDiv>
          {items.map((item) => {
            //MOVE TO BACK END
            if (item.thumb && item.catno && item.master_id)
              return <AlbumIcon key={item.id} album={item} />;
          })}
        </ResultsDiv>
      )}
    </main>
  );
};

const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ResultsDiv = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 300px 300px;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export default AlbumSearchResults;
