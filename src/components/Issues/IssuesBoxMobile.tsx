import { useRef, useState } from 'react';
import styled from 'styled-components';
import { ISSUE_STATE } from '../../consts/consts';
import useIssuesQuery from '../../fetch_modules/issues/useIssuesQuery';
import { theme } from '../../styles/theme';
import { IssueOpenOrClosedState } from '../../types/states';
import useIntersectionObserver from '../../UI_hooks/useIntersectionObserver';
import LoadingSpinner from '../UI_common/LoadingSpinner';
import IssuesSection from './sections/IssuesSection';
import IssuesToolbarSection from './sections/IssuesToolbarSection';

export default function IssuesBoxMobile({
  repoName,
  repoIndex,
}: {
  repoName: string | undefined;
  repoIndex: number;
}) {
  if (repoName === undefined)
    return (
      <Container>
        <ErrorMessage>해당 리포지토리를 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );

  const [issuesOpenOrClosed, setIssuesOpenOrClosed] = useState<IssueOpenOrClosedState>(
    ISSUE_STATE.OPEN,
  );
  const [page, setPage] = useState(1);
  const rootRef = useRef(null);
  const bottomDetectorRef = useRef(null);
  const { data, hasNextPage, isLoading, isFetching, isFetchingNextPage, isError } = useIssuesQuery(
    repoName,
    issuesOpenOrClosed,
    page,
  );
  const issues = data?.pages.flat();
  console.log(page);

  useIntersectionObserver(bottomDetectorRef, rootRef, () => setPage(page + 1), [data]);

  return (
    <Container ref={rootRef}>
      <TitleSection color={theme.repoColor[repoIndex]}>
        <RepoTitle>{repoName}</RepoTitle>
      </TitleSection>
      <IssuesToolbarSection
        issuesOpenOrClosed={issuesOpenOrClosed}
        toggleOpenOrClosed={(issuesOpenOrClosed) => setIssuesOpenOrClosed(issuesOpenOrClosed)}
      />

      <IssuesSection
        issues={issues}
        queryState={{ isLoading, isError }}
        shouldScrollTopOnUpdate={false}
      >
        {(isLoading || isFetching || isFetchingNextPage) && (
          <SpinnerWrapper>
            <LoadingSpinner color={theme.primaryDarkColor} />
          </SpinnerWrapper>
        )}
        {hasNextPage && !isFetchingNextPage && (
          <BottomDetector ref={bottomDetectorRef}>Detector</BottomDetector>
        )}
      </IssuesSection>
    </Container>
  );
}

const ErrorMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div<{ isExpanded?: boolean }>`
  width: 100vw;
  flex: 1;
  display: flex;
  flex-direction: column;
  > * {
    border-bottom: 0.5px solid ${theme.borderColor};
    padding: 0.5rem;
  }
  > *:last-child,
  > *:first-child {
    border-bottom: none;
  }
`;

const TitleSection = styled.section`
  width: 100%;
  min-height: 1.4375rem;
  height: 1.4375rem;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: ${(props) => props.color};
  position: relative;
`;
const RepoTitle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const BottomDetector = styled.div`
  width: 100%;
  height: 10px;
`;

const SpinnerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
