/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookIcon from "../Book/BookIcon";

//-----------------------------------//
//---Book Search Results Component---//
//-----------------------------------//
const BookSearchResults = () => {
  const [books, setBooks] = useState([]);
  const { searchValue } = useParams();

  //  ----------BACKEND FETCH----------
  useEffect(() => {
    fetch(`/search-books/${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.data.items);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  console.log("books: ", books);
  return (
    books && (
      <main>
        <ResultsDiv>
          {books.map((book) => {
            return <BookIcon key={book.id} book={book} />;
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

export default BookSearchResults;
