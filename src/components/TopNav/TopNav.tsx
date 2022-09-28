import styled from 'styled-components';
import { useRef, useState } from 'react';
import SearchInputBox from './SearchInputBox';
import RepoSearchResultDropdown from './RepoSearchResult';
import useReposQuery from '../../fetch_modules/repos/useReposQuery';
import { theme } from '../../styles/theme';
import useDetectOutsideClick from '../../UI_hooks/useDetectOutsideClick';
import { useNavigate } from 'react-router-dom';
import createDebouncedAction from '../../utils/debouncer';
import { DEBOUNCER_DELAY_TIME, MOBILE_WIDTH } from '../../consts/consts';

export default function TopNav() {
  const { setSearchQuery, data: repos, ...fetchState } = useReposQuery();
  const outsideClickRef = useRef(null);
  const [isShowingSearchResult, setIsShowingSearchResult] = useState(false);
  const navigate = useNavigate();

  const setSearchWithDebouncer = createDebouncedAction<string>(
    (searchString) => setSearchQuery(encodeURIComponent(searchString)),
    DEBOUNCER_DELAY_TIME,
  );

  useDetectOutsideClick([outsideClickRef], () => setIsShowingSearchResult(false));

  return (
    <Container>
      {isShowingSearchResult && <Veil />}
      <Title onClick={() => navigate('/')}>Github Issues Newsstand</Title>
      <InputBoxWrapper ref={outsideClickRef}>
        <SearchInputBox
          handleOnSearchFromParent={(searchString) =>
            setSearchWithDebouncer(searchString)
          }
          handleOnSubmitFromParent={(searchString) =>
            setSearchQuery(encodeURIComponent(searchString))
          }
          handleOnFocusFromParent={() => setIsShowingSearchResult(true)}
          handleOnChangeFromParent={(searchString) =>
            setIsShowingSearchResult(!!searchString)
          }
          placeholder="Search Repositories"
        />
        {isShowingSearchResult && (
          <RepoSearchResultDropdown
            repos={repos}
            fetchState={fetchState}
            close={() => setIsShowingSearchResult(false)}
          />
        )}
      </InputBoxWrapper>
    </Container>
  );
}

const Container = styled.header`
  background-color: ${theme.primaryColor};
  color: white;
  position: relative;
  height: 3rem;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${MOBILE_WIDTH}px) {
    flex-direction: column;
    height: fit-content;
    gap: 0.3rem;
  }
`;

const Veil = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: calc(100vh - 3rem);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const Title = styled.h2`
  cursor: pointer;
  height: 2rem;
`;
const InputBoxWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${MOBILE_WIDTH}px) {
    width: 100%;
    max-width: 30rem;
    height: 2rem;
  }
`;
