import styled from 'styled-components';
import { Repository } from '../../types/data';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { saveReposState } from '../../atoms/reposState';
import useIntersectionObserver from '../../UI_hooks/useIntersectionObserver';
import LoadingSpinner from '../UI_common/LoadingSpinner';
import { theme } from '../../styles/theme';
import AlertDialog from '../UI_common/AlertDialog';
import { InfiniteData } from '@tanstack/react-query';
import { MOBILE_WIDTH } from '../../consts/consts';
import RepoItem from './RepoItem';
import { MdClose } from 'react-icons/md';
import Button from '../UI_common/Button';

type RepoSearchResultDropdownProps = {
  repos: InfiniteData<Repository[]> | undefined;
  fetchState: {
    fetchNextPage: () => void;
    isLoading: boolean;
    isFetching: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean | undefined;
    isError: boolean;
    error: Error | null;
  };
  close: () => void;
};

export default function RepoSearchResultDropdown({
  repos,
  fetchState,
  close,
}: RepoSearchResultDropdownProps) {
  const { fetchNextPage, isLoading, isFetching, isFetchingNextPage, hasNextPage } = fetchState;
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

  const onAlertDialogConfirm = (isConfirmed: boolean) =>
    isConfirmed && setAlert({ isShowing: false, message: '' });

  const flattenPage = (data: undefined | InfiniteData<Repository[]>) =>
    data && data.pages ? data.pages.flat() : null;

  const flattenedPage = flattenPage(repos);

  useIntersectionObserver(
    bottomDetectorRef,
    rootRef,
    () => {
      fetchNextPage();
    },
    [repos],
  );

  return (
    <Container ref={rootRef}>
      <CloseButtonWrapper>
        <CloseButton onClick={() => close()}>
          Close
          <CloseIcon />
        </CloseButton>
      </CloseButtonWrapper>
      {repos && flattenedPage && flattenedPage.length > 0 ? (
        flattenedPage.map((repo) => <RepoItem key={repo.id} repo={repo} saveRepo={saveRepo} />)
      ) : isLoading || isFetching ? (
        <SpinnerWrapper>
          <LoadingSpinner
            color={theme.primaryColor}
            backgroundColor={theme.secondaryBackgroundColor}
          />
        </SpinnerWrapper>
      ) : (
        <Status>No Results</Status>
      )}
      {hasNextPage && !isFetchingNextPage && <BottomDetector ref={bottomDetectorRef} />}

      {isFetchingNextPage && <Loading>Loading...</Loading>}
      {alert.isShowing && (
        <AlertDialog onConfirm={onAlertDialogConfirm}>{alert.message}</AlertDialog>
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
  background-color: ${theme.secondaryBackgroundColor};
  z-index: 10;

  li {
    border-bottom: 1px solid ${theme.primaryColor};
  }
  li:last-child {
    border-bottom: none;
  }
  @media (max-width: ${MOBILE_WIDTH}px) {
    width: 100%;
    left: 0;
  }
`;

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
const CloseButtonWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: right;

  padding: 0.2rem 1rem;
  width: 80%;
  height: 1.5rem;
  z-index: 20;
  @media (max-width: ${MOBILE_WIDTH}px) {
    width: 100%;
  }
`;
const CloseButton = styled((props) => Button({ ...props, color: theme.primaryColor }))`
  height: 1.5rem;
  font-size: 0.7rem;
  background-color: ${theme.secondaryBackgroundColor};
`;

const CloseIcon = styled(MdClose)``;
