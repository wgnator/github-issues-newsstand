import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { saveReposState } from '../atoms/reposState';
import IssuesBox from '../components/Issues/IssuesBox';
import { MOBILE_WIDTH, VIEW_MODE } from '../consts/consts';
import { theme } from '../styles/theme';
import { ViewMode } from '../types/states';

export default function IssuesPage() {
  const { repoId: selectedRepoId } = useParams();
  const savedRepos = useRecoilValue(saveReposState);
  const [expandedRepoId, setExpandedRepoId] = useState<null | number>();
  const viewMode = !!selectedRepoId ? VIEW_MODE.SINGLE : VIEW_MODE.MULTIPLE;

  const getRepoNameById = (repoId: string | undefined) =>
    repoId && savedRepos.find((repo) => repo.id === Number(repoId))?.fullName;

  const selectedRepoName = useMemo(
    () => getRepoNameById(selectedRepoId),
    [selectedRepoId],
  );

  return savedRepos.length > 0 ? (
    <Container viewMode={viewMode}>
      {viewMode === VIEW_MODE.SINGLE
        ? selectedRepoName && (
            <IssuesBox
              repoName={selectedRepoName}
              viewMode={VIEW_MODE.SINGLE}
              isExpanded={true}
              repoIndex={savedRepos.findIndex(
                (repo) => repo.id === Number(selectedRepoId),
              )}
            />
          )
        : savedRepos.map((repo, index) => (
            <IssuesBox
              key={repo.id}
              repoName={repo.fullName}
              viewMode={VIEW_MODE.MULTIPLE}
              isExpanded={expandedRepoId === repo.id}
              repoIndex={index}
              onExpandCallback={() =>
                setExpandedRepoId(expandedRepoId === repo.id ? null : repo.id)
              }
            />
          ))}
    </Container>
  ) : (
    <NoRepositories>
      {' '}
      <h2>Search &#38; Add Repositories</h2>
    </NoRepositories>
  );
}

const Container = styled.div<{ viewMode: ViewMode }>`
  width: 100%;
  padding: 1rem;
  min-height: calc(100vh - 6rem);
  margin: auto;
  position: relative;
  background-color: ${theme.primaryBackgroundColor};
  justify-content: space-between;
  align-items: stretch;

  > *:nth-child(3) {
    align-self: flex-end;
  }
  > *:nth-child(4) {
    align-self: flex-end;
  }
  @media (min-width: ${MOBILE_WIDTH}px) {
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: ${MOBILE_WIDTH}px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const NoRepositories = styled.div`
  width: 100%;
  height: calc(100vh - 6rem);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
`;
