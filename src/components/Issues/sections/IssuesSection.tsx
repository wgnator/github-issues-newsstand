import { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';
import IssueItem from '../IssueItem';
import { theme } from '../../../styles/theme';
import { Issue } from '../../../types/data';

export default function IssuesSection({
  shouldScrollTopOnUpdate,
  issues,
  queryState,
  children,
}: {
  shouldScrollTopOnUpdate: boolean;
  issues: Issue[] | undefined;
  queryState: {
    isLoading: boolean;
    isError: boolean;
  };
  children?: ReactNode;
}) {
  const { isLoading, isError } = queryState;
  const containerRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    containerRef.current && shouldScrollTopOnUpdate && (containerRef.current.scrollTop = 0);
  }, [issues]);

  return (
    <Container ref={containerRef}>
      {isLoading && (
        <IssuesContainer>
          {new Array(10).fill(null).map((_, index) => (
            <IssueItem key={index} />
          ))}
        </IssuesContainer>
      )}
      {issues &&
        !isLoading &&
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
      {children}
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 100%;
  min-height: 0;

  overflow-y: auto;
  -webkit-overflow-scrolling-y: auto;
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
