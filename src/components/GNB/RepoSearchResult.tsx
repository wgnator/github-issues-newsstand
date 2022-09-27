import styled from 'styled-components';
import { Repository } from '../../types/data';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { saveReposState } from '../../atoms/reposState';
import useIntersectionObserver from '../../UI_hooks/useIntersectionObserver';
import LoadingSpinner from '../UI_common/LoadingSpinner';
import { BsArrowRightCircle } from 'react-icons/bs';
import { theme } from '../../styles/theme';
import AlertDialog from '../UI_common/AlertDialog';
import Button from '../UI_common/Button';
import toast, { Toaster } from 'react-hot-toast';

type RepoSearchResultDropdownProps = {
  repos: Repository[] | undefined;
  fetchState: {
    fetchNextPage: () => void;
    isLoading: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean | undefined;
    isError: boolean;
    error: unknown;
  };
  close: () => void;
};

export default function RepoSearchResultDropdown({
  repos,
  fetchState,
  close,
}: RepoSearchResultDropdownProps) {
  const { fetchNextPage, isLoading, isFetchingNextPage, hasNextPage, error } = fetchState;
  const bottomDetectorRef = useRef(null);
  const rootRef = useRef(null);
  const [savedRepos, setSavedRepos] = useRecoilState(saveReposState);
  const [alert, setAlert] = useState({ isShowing: false, message: '' });
  const saveRepo = (repo: Repository) => {
    if (savedRepos.length < 4) {
      setSavedRepos([...savedRepos, repo]);
      close();
    } else
      setAlert({
        isShowing: true,
        message: '리포지토리 저장 가능 한도(4개)를 초과했어요.',
      });
  };
  useIntersectionObserver(
    bottomDetectorRef,
    rootRef,
    () => {
      fetchNextPage();
    },
    [repos],
  );

  useEffect(() => {
    if (error) toast.error(error.message, { duration: 2000 });
  }, [error]);

  return (
    <Container ref={rootRef}>
      <Toaster />
      {repos && repos.length > 0 ? (
        repos.map((repo) => (
          <Item key={repo.id}>
            <ItemInfo>
              <h3>{repo.fullName}</h3>
              <div>{repo.description}</div>
              <ItemDetails>
                <span>⭐ {repo.stargazers_count}</span>
                <span>|</span>
                <span>{repo.language}</span>
                <span>|</span>
                <span>{repo.license}</span>
                <span>|</span>
                <span>Last Update: {repo.updated_at.toLocaleDateString()}</span>
              </ItemDetails>
            </ItemInfo>
            <SaveButton
              onClick={(event: React.MouseEvent) => {
                event.stopPropagation();
                saveRepo(repo);
              }}
            >
              <span> Save </span>
              <SaveRepoIcon />
            </SaveButton>
          </Item>
        ))
      ) : isLoading ? (
        <SpinnerWrapper>
          <LoadingSpinner
            color={theme.primaryColor}
            backgroundColor={theme.backgroundColor}
          />
        </SpinnerWrapper>
      ) : (
        <Status>No Results</Status>
      )}
      {hasNextPage && !isFetchingNextPage && <BottomDetector ref={bottomDetectorRef} />}

      {isFetchingNextPage && <Loading>Loading...</Loading>}
      {alert.isShowing && (
        <AlertDialog
          onConfirm={(isConfirmed) =>
            isConfirmed && setAlert({ isShowing: false, message: '' })
          }
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
  height: 80vh;
  left: 10%;
  top: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  color: ${theme.fontColor};
  background-color: white;
  z-index: 10;
  li {
    border-bottom: 1px solid ${theme.primaryColor};
  }
  li:last-child {
    border-bottom: none;
  }
`;
const Item = styled.li`
  width: 100%;
  padding: 0.3rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;
const ItemDetails = styled.div`
  display: flex;
  gap: 0.3rem;
`;
const SaveButton = styled(Button)`
  border: 1px solid ${theme.primaryColor};
  border-radius: 5px;
  display: flex;
  gap: 0.2rem;
  width: 5rem;
  height: 2rem;
  color: ${theme.primaryColor};
`;
const SaveRepoIcon = styled(BsArrowRightCircle)``;

const BottomDetector = styled.div`
  width: 100%;
  height: 10px;
`;

const Loading = styled.div`
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Status = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
