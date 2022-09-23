import styled from "styled-components";
import { useState } from "react";
import SearchInputBox from "../UI/SearchInputBox";
import RepoSearchResultDropdown from "./SearchRepoResult";
import useReposQuery from "../../fetch_modules/repos/useReposQuery";

export default function GNB() {
  const { setSearchQuery, repos, ...fetchState } = useReposQuery();

  const [isShowingSearchResult, setIsShowingSearchResult] = useState(false);

  const onSearchSubmit = (searchString: string) => {
    setSearchQuery(encodeURIComponent(searchString));
    setIsShowingSearchResult(true);
  };

  return (
    <Container>
      <h2>Github Issues Newsstand</h2>
      <SearchInputBox onSubmitHandler={onSearchSubmit} />
      {isShowingSearchResult && (
        <RepoSearchResultDropdown
          repos={repos}
          fetchState={fetchState}
          close={() => setIsShowingSearchResult(false)}
        />
      )}
    </Container>
  );
}

const Container = styled.header`
  position: relative;
  height: 3rem;
  border-bottom: 1px solid black;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
