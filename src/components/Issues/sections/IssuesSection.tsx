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
  };
  viewMode: ViewMode;
}) {
  const { data: issues, isLoading, isFetching } = queryState;
  const containerRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
    if (viewMode === VIEW_MODE.SINGLE) window.scrollTo(0, 0);
  }, [issues]);

  return (
    <Container ref={containerRef}>
      <IssuesContainer>
        {(isLoading || isFetching) &&
          new Array(5).fill(null).map((_, index) => <IssueItem key={index} />)}
        {issues &&
          !isLoading &&
          !isFetching &&
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
