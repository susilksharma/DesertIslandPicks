/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

//----------------------------//
//---Book Details Component---//
//----------------------------//
const BookDetails = () => {
  const [book, setBook] = useState(null);
  const bookId = useParams();
  const { currentUser } = useContext(UserContext);

  // Fetch album details on component render
  useEffect(() => {
    fetch(`/books/${bookId.bookId}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data.data.items[0]);
      })
      //WHAT TO DO WITH ERROR
      .catch((err) => console.log("Error: ", err));
  }, []);

  const addBook = () => {
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
        window.alert("Sorry, please try again.");
      });
  };

  // console.log("album: ", album);
  return (
    <main>
      {!book ? (
        <LoadingDiv>
          <img src="/spinnerv1.gif" alt="spinner" />
        </LoadingDiv>
      ) : (
        <BookDiv>
          <ImgDiv onClick={addBook}>
            <img
              alt={`${book.volumeInfo?.title} cover`}
              src={book.volumeInfo?.imageLinks?.thumbnail}
            />
            <div>
              <h1>Add To Picks</h1>
            </div>
          </ImgDiv>
          <InfoDiv>
            <h2>
              <ArtistLink to={`/search-book/${book.volumeInfo?.authors?.[0]}`}>
                {book.volumeInfo?.authors?.[0]}
              </ArtistLink>{" "}
              - {book.volumeInfo?.title}
            </h2>
            <h3>
              <span>
                {book.volumeInfo?.categories?.[0]}/{book.volumeInfo?.publisher}
              </span>
              {", "}
              {book.volumeInfo?.publishedDate}
            </h3>
            <Description>{book.volumeInfo?.description}</Description>
          </InfoDiv>
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

const ArtistLink = styled(Link)`
  text-decoration: underline;
  color: var(--dark-grey);
`;

export default BookDetails;
