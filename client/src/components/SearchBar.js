import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AiOutlineSearch } from "react-icons/ai";

//--------------------------//
//---Search Bar Component---//
//--------------------------//
const SearchBar = () => {
  const [searchvalue, setSearchValue] = useState("");
  const navigate = useNavigate();

  return (
    <SearchForm>
      {/* <AiOutlineSearch color="#F8F8F8" size={24} /> */}
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

  :active {
    outline: none;
  }
`;

export default SearchBar;
