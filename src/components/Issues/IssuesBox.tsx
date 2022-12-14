import styled from 'styled-components';
import useIssuesQuery from '../../fetch_modules/issues/useIssuesQuery';
import IssuesSection from './sections/IssuesSection';
import IssuesToolbarSection from './sections/IssuesToolbarSection';
import PageNavSection from './sections/PageNavSection';
import { theme } from '../../styles/theme';
import { useState } from 'react';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import { ISSUE_STATE } from '../../consts/consts';
import { IssueOpenOrClosedState } from '../../types/states';

export type IssueOptions = {
  openOrClosed: IssueOpenOrClosedState;
  page: number;
};

export default function IssuesBox({
  repoName,
  isExpanded,
  repoIndex,
  onExpandCallback,
}: {
  repoName: string | undefined;
  isExpanded: boolean;
  repoIndex: number;
  onExpandCallback?: () => void;
}) {
  if (repoName === undefined)
    return (
      <Container>
        <ErrorMessage>해당 리포지토리를 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );

  const [optionsState, setOptionsState] = useState<IssueOptions>({
    openOrClosed: ISSUE_STATE.OPEN,
    page: 1,
  });

  const { data, hasNextPage, isLoading, isFetchingNextPage, isError } = useIssuesQuery(
    repoName,
    optionsState.openOrClosed,
    optionsState.page,
  );

  return (
    <Container isExpanded={isExpanded}>
      <SubContainer isExpanded={isExpanded} index={repoIndex}>
        <TitleSection color={theme.repoColor[repoIndex]}>
          <RepoTitle>{repoName}</RepoTitle>
          {onExpandCallback && (
            <ExpandIconWrapper onClick={onExpandCallback}>
              <ExpandIcon />
            </ExpandIconWrapper>
          )}
        </TitleSection>
        <IssuesToolbarSection
          issuesOpenOrClosed={optionsState.openOrClosed}
          toggleOpenOrClosed={(issuesOpenOrClosed) =>
            setOptionsState((prevState) => ({ ...prevState, openOrClosed: issuesOpenOrClosed }))
          }
        />
        <IssuesSection
          issues={data?.pages[optionsState.page - 1]}
          queryState={{ isLoading, isError }}
          shouldScrollTopOnUpdate={true}
        />
        <PageNavSection
          page={optionsState.page}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          setPage={(page) => setOptionsState((prevState) => ({ ...prevState, page: page }))}
        />
      </SubContainer>
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
  overflow: hidden;
  transition: height 0.3s linear;
  width: 49%;
  height: calc((100vh - 9rem) / 2);
`;

const SubContainer = styled.div<{ isExpanded: boolean; index: number }>`
  border: 1px solid ${theme.borderColor};
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  > * {
    border-bottom: 1px solid ${theme.borderColor};
  }
  > *:last-child {
    border-bottom: none;
  }

  ${(props) =>
    props.isExpanded &&
    `
      position: absolute;

      z-index: 10;
      background-color: ${theme.primaryBackgroundColor};
      ${props.index === 0 || props.index === 2 ? 'left: 1rem; ' : 'right: 1rem;'}
      ${props.index === 0 || props.index === 1 ? 'top: 1rem; ' : 'bottom: 1rem;'}
      animation: expand 0.2s linear forwards;`}

  @keyframes expand {
    0% {
      width: 49%;
      height: 49%;
    }
    100% {
      width: calc(100% - 2rem);
      height: calc(100% - 2rem);
    }
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
const ExpandIconWrapper = styled.div`
  width: 1rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExpandIcon = styled(BsArrowsAngleExpand)`
  height: 60%;
`;
