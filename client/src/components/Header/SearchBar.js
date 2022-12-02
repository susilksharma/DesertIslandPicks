import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBook, BsMusicNote, BsFilm } from "react-icons/bs";

//--------------------------//
//---Search Bar Component---//
//--------------------------//
const SearchBar = () => {
  const [searchvalue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [mediaPicked, setMediaPicked] = useState("albums");

  //MAKE BETTER LOGIC FOR THIS
  const [albumsClicked, setAlbumsClicked] = useState(true);
  const [moviesClicked, setMoviesClicked] = useState(false);
  const [booksClicked, setBooksClicked] = useState(false);

  const chooseBooks = (e) => {
    e.preventDefault();
    setMediaPicked("books");
    setAlbumsClicked(false);
    setMoviesClicked(false);
    setBooksClicked(true);
  };

  const chooseAlbums = (e) => {
    e.preventDefault();
    setMediaPicked("albums");
    setAlbumsClicked(true);
    setMoviesClicked(false);
    setBooksClicked(false);
  };

  const chooseMovies = (e) => {
    e.preventDefault();
    setMediaPicked("movies");
    setAlbumsClicked(false);
    setMoviesClicked(true);
    setBooksClicked(false);
  };

  const [toggleSearch, setToggleSearch] = useState(false);

  const toggleVisibility = () => {
    setToggleSearch(!toggleSearch);
  };

  return (
    <SearchForm>
      <AiOutlineSearch
        color="#F8F8F8"
        size={24}
        onClick={toggleVisibility}
        style={{ display: toggleSearch ? "none" : "block" }}
      />
      <SearchDiv>
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
          style={{
            display: !toggleSearch ? "none" : "block",
          }}
          autoFocus={toggleSearch ? true : false}
        />{" "}
        <MediaTypeDiv style={{ display: !toggleSearch ? "none" : "block" }}>
          <BsMusicNote
            size={20}
            color={albumsClicked ? "#ec7274" : "#F8F8F8"}
            onClick={chooseAlbums}
          />
          <BsFilm
            size={20}
            color={moviesClicked ? "#ec7274" : "#F8F8F8"}
            onClick={chooseMovies}
          />
          <BsBook
            size={20}
            color={booksClicked ? "#ec7274" : "#F8F8F8"}
            onClick={chooseBooks}
          />
        </MediaTypeDiv>
      </SearchDiv>
    </SearchForm>
  );
};

const SearchForm = styled.form``;

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
  display: flex;
  flex-direction: row;
`;

const MediaTypeDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export default SearchBar;
