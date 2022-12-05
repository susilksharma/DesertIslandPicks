import styled from "styled-components";

import { BsBook, BsMusicNote, BsFilm } from "react-icons/bs";

const MediaPicker = ({
  albumsclicked,
  chooseAlbums,
  moviesclicked,
  chooseMovies,
  booksclicked,
  chooseBooks,
  size,
}) => {
  return (
    <MediaTypeDiv>
      <StyledMusic
        size={size}
        albumsclicked={albumsclicked}
        onClick={chooseAlbums}
      />
      <StyledMovie
        size={size}
        moviesclicked={moviesclicked}
        onClick={chooseMovies}
      />
      <StyledBook
        size={size}
        booksclicked={booksclicked}
        onClick={chooseBooks}
      />
    </MediaTypeDiv>
  );
};

const StyledBook = styled(BsBook)`
  color: ${(props) => (props.booksclicked === 1 ? "#ec7274" : "#F8F8F8")};

  :hover {
    color: #ec7274;
    transition: all 0.2s ease-in-out;
  }
`;

const StyledMusic = styled(BsMusicNote)`
  color: ${(props) => (props.albumsclicked === 1 ? "#ec7274" : "#F8F8F8")};

  :hover {
    color: #ec7274;
    transition: all 0.2s ease-in-out;
  }
`;

const StyledMovie = styled(BsFilm)`
  color: ${(props) => (props.moviesclicked === 1 ? "#ec7274" : "#F8F8F8")};

  :hover {
    color: #ec7274;
    transition: all 0.2s ease-in-out;
  }
`;

const MediaTypeDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: var(--dark-grey);
  color: ${({ theme }) => theme.text};
  padding: 2.5%;
  border-radius: 10px 10px 0 0;
`;

export default MediaPicker;
