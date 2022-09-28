import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useState } from 'react';
import useIssuesQuery from '../../fetch_modules/issues/useIssuesQuery';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import IssuesToolbarSection from './IssuesToolbarSection';
import IssuesSection from './IssuesSection';
import PageNavSection from './PageNavSection';
import { ISSUE_STATE, MOBILE_WIDTH, VIEW_MODE } from '../../consts/consts';
import { IssueOpenOrClosedState, ViewMode } from '../../types/states';

export type IssueOptions = {
  openOrClosed: IssueOpenOrClosedState;
  page: number;
};

export default function IssuesBox({
  repoName,
  isExpanded,
  viewMode,
  repoIndex,
  onExpandCallback,
}: {
  repoName: string | undefined;
  isExpanded: boolean;
  viewMode: ViewMode;
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
    <Container isExpanded={isExpanded} viewMode={viewMode}>
      <SubContainer isExpanded={isExpanded} index={repoIndex}>
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
const Container = styled.div<{ isExpanded?: boolean; viewMode?: ViewMode }>`
  width: 100%;
  overflow: hidden;
  transition: height 0.3s linear;

  @media (min-width: ${MOBILE_WIDTH}px) {
    height: ${(props) =>
      props.viewMode === VIEW_MODE.MULTIPLE
        ? 'calc((100vh - 10rem) / 2)'
        : 'calc(100vh - 10rem)'};
  }

  @media (max-width: ${MOBILE_WIDTH}px) {
    height: ${(props) =>
      props.viewMode === VIEW_MODE.MULTIPLE
        ? props.isExpanded
          ? '80vh'
          : '40vh'
        : '100%'};
  }
`;

const SubContainer = styled.div<{ isExpanded: boolean; index: number }>`
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

  @media (min-width: ${MOBILE_WIDTH}px) {
    ${(props) =>
      props.isExpanded &&
      `
      position: absolute;
      z-index: 10;
      background-color: ${theme.backgroundColor};
      ${props.index === 0 || props.index === 2 ? 'left: 0; ' : 'right: 0;'}
      ${props.index === 0 || props.index === 1 ? 'top: 0; ' : 'bottom: 0;'}
      animation: expand 0.2s linear forwards;`}

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
