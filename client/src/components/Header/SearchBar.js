import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import MediaPicker from "../Picks/MediaPicker";

//--------------------------//
//---Search Bar Component---//
//--------------------------//
const SearchBar = () => {
  const [searchvalue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [mediaPicked, setMediaPicked] = useState("album");

  //MAKE BETTER LOGIC FOR THIS
  const [albumsclicked, setAlbumsclicked] = useState(1);
  const [moviesclicked, setMoviesclicked] = useState(0);
  const [booksclicked, setBooksclicked] = useState(0);

  const chooseBooks = (e) => {
    e.preventDefault();
    setMediaPicked("book");
    setAlbumsclicked(0);
    setMoviesclicked(0);
    setBooksclicked(1);
  };

  const chooseAlbums = (e) => {
    e.preventDefault();
    setMediaPicked("album");
    setAlbumsclicked(1);
    setMoviesclicked(0);
    setBooksclicked(0);
  };

  const chooseMovies = (e) => {
    e.preventDefault();
    setMediaPicked("movie");
    setAlbumsclicked(0);
    setMoviesclicked(1);
    setBooksclicked(0);
  };

  const [togglesearch, settogglesearch] = useState(0);

  const toggleVisibility = () => {
    settogglesearch(!togglesearch);
  };

  return (
    <>
      <SearchIcon
        size={24}
        onClick={toggleVisibility}
        togglesearch={togglesearch}
      />
      <SearchForm togglesearch={togglesearch}>
        <SearchDiv togglesearch={togglesearch}>
          <CloseSearch size={48} onClick={toggleVisibility} />
          <SearchInput
            placeholder={`Search ${mediaPicked}`}
            onChange={(ev) => {
              setSearchValue(ev.target.value);
            }}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                navigate(`/search-${mediaPicked}/${searchvalue}`);
              }
            }}
            autoFocus={togglesearch === 1 ? true : false}
          />{" "}
          <MediaPicker
            albumsclicked={albumsclicked}
            chooseAlbums={chooseAlbums}
            moviesclicked={moviesclicked}
            chooseMovies={chooseMovies}
            booksclicked={booksclicked}
            chooseBooks={chooseBooks}
            size={20}
          />
        </SearchDiv>
      </SearchForm>
    </>
  );
};

const SearchIcon = styled(AiOutlineSearch)`
  color: var(--white);
  display: ${(props) => (props.togglesearch ? "none" : "block")};

  :hover {
    color: #ec7274;
    transition: all 0.2s ease-in-out;
  }
`;

const CloseSearch = styled(AiOutlineClose)`
  color: var(--white);

  :hover {
    color: #ec7274;
    transition: all 0.2s ease-in-out;
  }
`;

const SearchForm = styled.form`
  width: ${(props) => (props.togglesearch ? "300px" : "0px")};
  opacity: ${(props) => (props.togglesearch ? "1" : "0")};
  transition: width 0.5s ease-in-out, opacity 1s ease-in-out;
  overflow: hidden;
`;

const SearchInput = styled.input`
  border-radius: 5px;
  border: none;
  text-align: end;
  padding-right: 10px;
  outline: none;
  height: 20px;

  :active {
    outline: none;
  }
`;

const SearchDiv = styled.div`
  display: ${(props) => (props.togglesearch ? "flex" : "none")};
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export default SearchBar;
