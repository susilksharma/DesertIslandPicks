import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";

//-----------------------------//
//---Book Info Component-------//
//-----------------------------//
const BookInfo = ({ book }) => {
  return (
    <InfoDiv>
      {book?.volumeInfo?.authors ? (
        <h2>
          <ArtistLink to={`/search-book/${book?.volumeInfo?.authors?.[0]}`}>
            {book?.volumeInfo?.authors?.[0]}
          </ArtistLink>{" "}
          - {book?.volumeInfo?.title}
        </h2>
      ) : (
        <h2>{book?.volumeInfo?.title}</h2>
      )}
      <h3>
        <span>
          {book?.volumeInfo?.categories?.[0]}/{book.volumeInfo?.publisher}
        </span>
      </h3>
      <h3>
        {book?.volumeInfo?.pageCount} pages
        {", "}
        {book?.volumeInfo?.publishedDate.slice(0, 4)}
      </h3>
      <Description>{book?.volumeInfo?.description}</Description>
      <div>
        <h3>Google Books:</h3>
        <a href={book?.volumeInfo?.infoLink}>
          <AiFillGoogleCircle size={30} />
        </a>
      </div>
    </InfoDiv>
  );
};

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

export default BookInfo;
