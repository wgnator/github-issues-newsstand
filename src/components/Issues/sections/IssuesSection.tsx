import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import IssueItem from '../IssueItem';
import { VIEW_MODE } from '../../../consts/consts';
import { theme } from '../../../styles/theme';
import { Issue } from '../../../types/data';
import { ViewMode } from '../../../types/states';

export default function IssuesSection({
  queryState,
  viewMode,
}: {
  queryState: {
    data: Issue[] | undefined;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
  };
  viewMode: ViewMode;
}) {
  const { data: issues, isLoading, isFetching, isError } = queryState;
  const containerRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
    if (viewMode === VIEW_MODE.SINGLE) window.scrollTo(0, 0);
  }, [issues]);

  return (
    <Container ref={containerRef}>
      {(isLoading || isFetching) && (
        <IssuesContainer>
          {new Array(5).fill(null).map((_, index) => (
            <IssueItem key={index} />
          ))}
        </IssuesContainer>
      )}
      {issues &&
        !isLoading &&
        !isFetching &&
        (issues.length > 0 ? (
          <IssuesContainer>
            {issues.map((issue) => (
              <IssueItem key={issue.id} data={issue} />
            ))}
          </IssuesContainer>
        ) : (
          <NoIssues>No Issues</NoIssues>
        ))}
      {isError && <NoIssues>데이터를 가져오는데 문제가 있습니다.</NoIssues>}
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const IssuesContainer = styled.ul`
  width: 100%;
  margin: auto;

  border-radius: 5px;
  > * {
    border-bottom: 0.5px solid ${theme.borderColor};
    padding: 0.5rem;
  }
  > *:last-child {
    border-bottom: none;
  }
`;

const NoIssues = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
