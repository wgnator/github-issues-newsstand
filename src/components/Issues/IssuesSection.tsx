import { Children, forwardRef, ReactNode, RefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Issue } from '../../types/data';
import IssueItem from './IssueItem';

export default function IssuesSection({
  issues,
  isLoading,
}: {
  issues: Issue[];
  isLoading: boolean;
}) {
  const containerRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
  }, [issues]);
  return (
    <Container ref={containerRef}>
      <IssuesContainer>
        {issues &&
          isLoading &&
          new Array(5).fill(null).map((_, index) => <IssueItem key={index} />)}
        {issues &&
          !isLoading &&
          issues.map((issue) => <IssueItem key={issue.id} data={issue} />)}
      </IssuesContainer>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const IssuesContainer = styled.div`
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
