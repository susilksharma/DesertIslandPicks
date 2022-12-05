/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookIcon from "../Book/BookIcon";

//-----------------------------------//
//---Book Search Results Component---//
//-----------------------------------//
const BookSearchResults = () => {
  const [books, setBooks] = useState([]);
  const { searchValue } = useParams();
  const navigate = useNavigate();

  //  ----------BACKEND FETCH----------
  useEffect(() => {
    fetch(`/search-book/${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.data);
      })
      .catch((err) => navigate("/error"));
  }, []);

  console.log("books: ", books);
  return (
    <main>
      {books && (
        <ResultsDiv>
          {books.map((book) => {
            return <BookIcon key={book.id} book={book} />;
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

export default BookSearchResults;
