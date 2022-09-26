import styled from "styled-components";
import { useRef, useState } from "react";
import SearchInputBox from "../UI/SearchInputBox";
import RepoSearchResultDropdown from "./SearchRepoResult";
import useReposQuery from "../../fetch_modules/repos/useReposQuery";
import { theme } from "../../styles/theme";
import useDetectOutsideClick from "../../UI_hooks/useDetectOutsideClick";

export default function GNB() {
  const { setSearchQuery, searchedRepos: repos, ...fetchState } = useReposQuery();
  const outsideClickRef = useRef(null);
  const [isShowingSearchResult, setIsShowingSearchResult] = useState(false);
  const onSearchSubmit = (searchString: string) => {
    setSearchQuery(encodeURIComponent(searchString));
    setIsShowingSearchResult(true);
  };
  useDetectOutsideClick([outsideClickRef], () => setIsShowingSearchResult(false));

  return (
    <Container>
      {isShowingSearchResult && <Veil />}
      <h2>Github Issues Newsstand</h2>
      <InputBoxWrapper ref={outsideClickRef}>
        <SearchInputBox
          onSubmitHandler={onSearchSubmit}
          closeResults={() => setIsShowingSearchResult(false)}
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
`;

const InputBoxWrapper = styled.div`
  width: 50%;
  height: 100%;
`;
