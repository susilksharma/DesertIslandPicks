/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import BookInfo from "./BookInfo";

//----------------------------//
//---Book Details Component---//
//----------------------------//
const BookDetails = () => {
  const [book, setBook] = useState(null);
  const bookId = useParams();
  const { currentUser } = useContext(UserContext);
  const { isAuthenticated } = useAuth0();

  // Fetch album details on component render
  useEffect(() => {
    fetch(`/book/${bookId.bookId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setBook(data.data.items[0]);
      })
      .catch((err) => {
        console.error("Error, ", err);
      });
  }, []);

  //Add Book to Pick database
  const addBook = () => {
    isAuthenticated &&
      fetch(`/add-book`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: currentUser.userId,
          userName: currentUser.name,
          pickId: book.id,
          title: book.volumeInfo?.title,
          artist: book.volumeInfo?.authors?.[0],
          image: book.volumeInfo?.imageLinks?.thumbnail,
          genre: book.volumeInfo?.categories?.[0],
          year: book.volumeInfo?.publishedDate,
          publisher: book.volumeInfo?.publisher,
          link: book.volumeInfo?.infoLink,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            window.alert("Book added to Picks!");
          } else {
            window.alert(data.message);
          }
        })
        .catch((error) => {
          console.error("Error, ", error);
        });
  };

  return (
    <main>
      {!book ? (
        <LoadingDiv>
          <img src="/spinnerv1.gif" alt="spinner" />
        </LoadingDiv>
      ) : (
        <BookDiv>
          <ImgDiv onClick={addBook} isAuthenticated={isAuthenticated}>
            <img
              alt={`${book?.volumeInfo?.title} cover`}
              src={book?.volumeInfo?.imageLinks?.thumbnail}
            />
            <div>
              {isAuthenticated ? (
                <h1>Add To Picks</h1>
              ) : (
                <h1>Sign In To Add To Picks</h1>
              )}
            </div>
          </ImgDiv>
          <BookInfo book={book} />
        </BookDiv>
      )}
    </main>
  );
};

const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BookDiv = styled.div`
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

  a {
    color: var(--dark-grey);
    :hover {
      opacity: 0.8;
      transition: all 0.4 ease-in-out;
    }
  }
`;

const ImgDiv = styled.div`
  position: relative;

  img {
    height: 400px;
    width: auto;
  }

  div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 400px;
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

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Description = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: fit-content;
`;

const ArtistLink = styled(Link)`
  text-decoration: underline;
  color: var(--dark-grey);
  text-decoration-thickness: 1.5px;

  :hover {
    text-decoration-thickness: 3px;
  }
`;

export default BookDetails;
