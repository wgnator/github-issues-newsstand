import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { IssueOpenOrClosedState, ISSUE_STATE } from '../../types/data';
import { useState } from 'react';
import useIssuesQuery from '../../fetch_modules/issues/useIssuesQuery';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import IssuesToolbarSection from './IssuesToolbarSection';
import IssuesSection from './IssuesSection';
import PageNavSection from './PageNavSection';

export type IssueOptions = {
  openOrClosed: IssueOpenOrClosedState;
  page: number;
};

export default function IssuesBox({
  repoName,
  expanded,
  repoIndex,
  onExpandCallback,
}: {
  repoName: string | undefined;
  expanded: boolean;
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

  const {
    isLoading,
    isError,
    data: issues,
    hasNextPage,
  } = useIssuesQuery(repoName, optionsState);

  return isError ? (
    <Container>
      <ErrorMessage>데이터를 가져오는데 문제가 있습니다.</ErrorMessage>
    </Container>
  ) : (
    <Container>
      <SubContainer expanded={expanded} index={repoIndex}>
        <TitleSection color={theme.repoColor[repoIndex]}>
          <RepoTitle>{repoName}</RepoTitle>
          {onExpandCallback && (
            <ExpandIconWrapper onClick={() => onExpandCallback()}>
              <ExpandIcon />
            </ExpandIconWrapper>
          )}
        </TitleSection>
        <IssuesToolbarSection
          optionsState={optionsState}
          setOptionsState={setOptionsState}
        />
        {issues && <IssuesSection issues={issues} isLoading={isLoading} />}
        <PageNavSection
          page={optionsState.page}
          hasNextPage={hasNextPage}
          setPage={(page) => setOptionsState({ ...optionsState, page: page })}
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
const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SubContainer = styled.div<{ expanded: boolean; index: number }>`
  border: 1px solid ${theme.borderColor};
  border-radius: 5px;
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
    props.expanded &&
    `
    position: absolute;
    z-index: 10;
    background-color: ${theme.backgroundColor};
    ${props.index === 0 || props.index === 2 ? 'left: 0; ' : 'right: 0;'}
    ${props.index === 0 || props.index === 1 ? 'top: 0; ' : 'bottom: 0;'}
    animation: expand 0.2s linear forwards;
  `}
  @keyframes expand {
    0% {
      width: 49%;
      height: 49%;
    }
    100% {
      width: 100%;
      height: 100%;
    }
  }
`;

const TitleSection = styled.section`
  width: 100%;
  height: 2rem;
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
