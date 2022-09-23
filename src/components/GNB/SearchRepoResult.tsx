import styled from "styled-components";
import { Repository } from "../../types/data";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { savedReposState } from "../../atoms/reposState";
import useIntersectionObserver from "../../UI_hooks/useIntersectionObserver";
import useDetectOutsideClick from "../../UI_hooks/useDetectOutsideClick";
import LoadingSpinner from "../UI/LoadingSpinner";
import { BsArrowRightCircle } from "react-icons/bs";
import { theme } from "../../styles/theme";
import AlertDialog from "../UI/AlertDialog";

type RepoSearchResultDropdownProps = {
  repos: Repository[] | undefined;
  fetchState: {
    fetchNextPage: () => void;
    isLoading: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean | undefined;
    isError: boolean;
    error: any;
  };
  close: () => void;
};

export default function RepoSearchResultDropdown({
  repos,
  fetchState,
  close,
}: RepoSearchResultDropdownProps) {
  const { fetchNextPage, isLoading, isFetchingNextPage, hasNextPage, isError, error } = fetchState;
  const bottomDetectorRef = useRef(null);
  const rootRef = useRef(null);
  const [savedRepos, setSavedRepos] = useRecoilState(savedReposState);
  const [alert, setAlert] = useState({ isShowing: false, message: "" });

  const saveRepo = (repo: Repository) =>
    savedRepos.length < 4
      ? setSavedRepos([...savedRepos, repo])
      : setAlert({ isShowing: true, message: "리포지토리 저장 가능 한도(4개)를 초과했어요." });

  useIntersectionObserver(
    bottomDetectorRef,
    rootRef,
    () => {
      console.log("observer intersecting");
      fetchNextPage();
    },
    [repos]
  );

  useDetectOutsideClick([rootRef], () => close());

  return (
    <Container ref={rootRef}>
      {repos &&
        repos.map((repo) => (
          <Item key={repo.id}>
            <h3>{repo.fullName}</h3>
            <div>{repo.description}</div>
            <div>
              <span>{repo.stargazers_count}</span>
              <span>{repo.language}</span>
              <span>{repo.license}</span>
              <span>{repo.updated_at.toLocaleDateString()}</span>
            </div>
            <SaveButton onClick={() => saveRepo(repo)}>
              <span> Save </span>
              <SaveRepoIcon />
            </SaveButton>
          </Item>
        ))}
      {hasNextPage && !isFetchingNextPage && <BottomDetector ref={bottomDetectorRef} />}
      {isLoading && (
        <SpinnerWrapper>
          <LoadingSpinner color={theme.primaryColor} backgroundColor={theme.backgroundColor} />
        </SpinnerWrapper>
      )}
      {isFetchingNextPage && <div>Loading...</div>}
      {alert.isShowing && (
        <AlertDialog
          onConfirm={(isConfirmed) => isConfirmed && setAlert({ isShowing: false, message: "" })}
        >
          {alert.message}
        </AlertDialog>
      )}
    </Container>
  );
}

const Container = styled.ul`
  position: absolute;
  width: 80%;
  height: 50rem;
  left: 10%;
  top: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid ${theme.borderColor};
  background-color: white;
  li {
    border-bottom: 1px solid ${theme.borderColor};
  }
  li:last-child {
    border-bottom: none;
  }
`;
const Item = styled.li`
  width: 100%;
`;
const SaveButton = styled.button`
  border: 1px solid ${theme.borderColor};
  border-radius: 5px;
  display: flex;
`;
const SaveRepoIcon = styled(BsArrowRightCircle)``;

const BottomDetector = styled.div`
  width: 100%;
  height: 10px;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
