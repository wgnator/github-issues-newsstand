import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import Button from '../UI_common/Button';
import { theme } from '../../styles/theme';

const SearchInputBox = ({
  handleOnSearchFromParent,
  handleOnChangeFromParent,
  handleOnSubmitFromParent,
  handleOnFocusFromParent,
  placeholder,
}: {
  handleOnSearchFromParent: (searchString: string) => void;
  handleOnChangeFromParent: (searchString: string) => void;
  handleOnSubmitFromParent: (searchString: string) => void;
  handleOnFocusFromParent: () => void;
  placeholder: string;
}) => {
  const [searchString, setSearchString] = useState('');
  const [isAutoSearchOn, setIsAutoSearchOn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchString(event.target.value);
  const toggleAutoSearch = () => setIsAutoSearchOn((prevState) => !prevState);
  const clearSearch = () => setSearchString('');
  const handleOnSubmit = () => handleOnSubmitFromParent(searchString);

  useEffect(() => {
    if (isAutoSearchOn) handleOnSearchFromParent(searchString);
    handleOnChangeFromParent(searchString);
  }, [searchString]);

  return (
    <InputBox onSubmit={(event) => event.preventDefault()}>
      <InputWrapper>
        <SearchInput
          ref={inputRef}
          type="text"
          id="search_string"
          placeholder={placeholder}
          autoComplete="off"
          value={searchString}
          onChange={handleOnChange}
          onFocus={handleOnFocusFromParent}
        />
        {searchString && (
          <IconWrapper>
            <CancelIcon onClick={clearSearch} />
          </IconWrapper>
        )}
        <AutoSearchToggleButton type="button" isOn={isAutoSearchOn} onClick={toggleAutoSearch}>
          자동검색 {isAutoSearchOn ? 'ON' : 'OFF'}
        </AutoSearchToggleButton>
      </InputWrapper>
      <SubmitSearch type="submit" onClick={handleOnSubmit} title="submit search">
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
  justify-content: space-between;
  gap: 0.5rem;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  border-radius: 5px;
  background-color: ${theme.secondaryBackgroundColor};
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
  width: 1.3rem;
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
