import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import Button from './Button';
import { theme } from '../../styles/theme';

const SearchInputBox = ({
  handleOnSearch,
  handleOnSubmit,
  handleOnFocus,
  placeholder,
}: {
  handleOnSearch: (searchString: string) => void;
  handleOnSubmit: (searchString: string) => void;
  handleOnFocus: () => void;
  placeholder: string;
}) => {
  const [searchString, setSearchString] = useState('');
  const [isAutoSearchOn, setIsAutoSearchOn] = useState(false);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  useEffect(() => {
    if (isAutoSearchOn) handleOnSearch(searchString);
  }, [searchString]);

  return (
    <InputBox onSubmit={(event) => event.preventDefault()}>
      <InputWrapper>
        <SearchInput
          type="text"
          id="search_string"
          placeholder={placeholder}
          value={searchString}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
        />
        {searchString && (
          <IconWrapper>
            <CancelIcon onClick={() => setSearchString('')} />
          </IconWrapper>
        )}
        <AutoSearchToggleButton
          type="button"
          isOn={isAutoSearchOn}
          onClick={() => setIsAutoSearchOn(!isAutoSearchOn)}
        >
          자동검색 {isAutoSearchOn ? 'ON' : 'OFF'}
        </AutoSearchToggleButton>
      </InputWrapper>
      <SubmitSearch
        type="submit"
        onClick={() => {
          handleOnSubmit(searchString);
        }}
      >
        <AiOutlineSearch />
      </SubmitSearch>
    </InputBox>
  );
};

const InputBox = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InputWrapper = styled.div`
  width: 80%;
  height: 100%;
  border: 1px solid white;
  border-radius: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 0.3rem;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  border: none;
`;

const IconWrapper = styled.div`
  width: 1rem;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
`;
const CancelIcon = styled(MdCancel)`
  width: 100%;
  color: rgba(0, 0, 0, 0.5);
`;
const AutoSearchToggleButton = styled(Button)`
  font-size: 0.65rem;
  font-weight: 600;
  width: 7rem;
  height: 70%;
  color: ${theme.primaryDarkColor};
  border: 1px solid ${theme.primaryDarkColor};
  border-radius: 7px;
  padding: 0;
  ${(props) =>
    props.isOn &&
    `    background-color: ${theme.primaryDarkColor};
    color: white;`}
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
