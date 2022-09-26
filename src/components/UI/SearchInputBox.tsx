import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const SearchInputBox = ({
  onSubmitHandler,
}: {
  onSubmitHandler: (searchString: string) => void;
  closeResults: () => void;
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const SearchInput = styled.input`
  width: 80%;
  height: 100%;
  border: 1px solid white;
  border-radius: 5px;
  padding: 0.5rem;
`;
const SubmitSearch = styled.button`
  width: 2rem;
  height: 100%;
  border: 1px solid white;
  border-radius: 5px;
  * {
    width: 100%;
    height: 100%;
    color: white;
  }
`;

export default SearchInputBox;
