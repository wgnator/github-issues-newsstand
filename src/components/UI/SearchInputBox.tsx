import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const SearchInputBox = ({
  onSubmitHandler,
}: {
  onSubmitHandler: (searchString: string) => void;
}) => {
  const [searchString, setSearchString] = useState("");
  const handleOnChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchString(event.target.value);

  return (
    <InputBox>
      <SearchInput
        type="text"
        id="search_string"
        placeholder="Search Repositories"
        value={searchString}
        onChange={handleOnChangeSearchInput}
      />
      <SubmitSearch onClick={() => onSubmitHandler(searchString)}>
        <AiOutlineSearch />
      </SubmitSearch>
    </InputBox>
  );
};

const InputBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const SearchInput = styled.input`
  width: 80%;
  height: 100%;
  border: 1px solid black;
  border-radius: 5px;
`;
const SubmitSearch = styled.button`
  width: 2rem;
  height: 100%;
  border: 1px solid black;
  border-radius: 5px;
  * {
    width: 100%;
    height: 100%;
  }
`;

export default SearchInputBox;
