import styled from 'styled-components';
import { useRef, useState } from 'react';
import SearchInputBox from '../UI_common/SearchInputBox';
import RepoSearchResultDropdown from './RepoSearchResult';
import useReposQuery from '../../fetch_modules/repos/useReposQuery';
import { theme } from '../../styles/theme';
import useDetectOutsideClick from '../../UI_hooks/useDetectOutsideClick';
import { useNavigate } from 'react-router-dom';

export default function GNB() {
  const { setSearchQuery, searchedRepos: repos, ...fetchState } = useReposQuery();
  const outsideClickRef = useRef(null);
  const [isShowingSearchResult, setIsShowingSearchResult] = useState(false);
  const navigate = useNavigate();
  const onSearchSubmit = (searchString: string) => {
    setSearchQuery(encodeURIComponent(searchString));
    setIsShowingSearchResult(true);
  };
  useDetectOutsideClick([outsideClickRef], () => setIsShowingSearchResult(false));

  return (
    <Container>
      {isShowingSearchResult && <Veil />}
      <Title onClick={() => navigate('/')}>Github Issues Newsstand</Title>
      <InputBoxWrapper ref={outsideClickRef}>
        <SearchInputBox
          onSubmitHandler={onSearchSubmit}
          closeResults={() => setIsShowingSearchResult(false)}
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
`;
const InputBoxWrapper = styled.div`
  width: 50%;
  height: 100%;
`;
