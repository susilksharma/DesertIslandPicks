import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

//--------------------------//
//---Search Bar Component---//
//--------------------------//
const SearchBar = () => {
  const [searchvalue, setSearchValue] = useState("");
  const navigate = useNavigate();

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
      <SearchInput
        placeholder="Search Album"
        onChange={(ev) => {
          setSearchValue(ev.target.value);
        }}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            navigate(`/search/${searchvalue}`);
          }
        }}
        style={{ display: !toggleSearch ? "none" : "block" }}
        autoFocus={toggleSearch ? true : false}
      />
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

export default SearchBar;
