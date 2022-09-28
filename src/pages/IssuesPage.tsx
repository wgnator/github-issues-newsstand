import { useState } from 'react';
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
  const getRepoNameById = (repoId: string) =>
    savedRepos.find((repo) => repo.id === Number(repoId))?.fullName;
  const [expandedRepoId, setExpandedRepoId] = useState<null | number>();
  const viewMode = !!selectedRepoId ? VIEW_MODE.SINGLE : VIEW_MODE.MULTIPLE;

  return (
    <Container viewMode={viewMode}>
      {viewMode === VIEW_MODE.SINGLE
        ? selectedRepoId && (
            <IssuesBox
              repoName={getRepoNameById(selectedRepoId)}
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
  );
}

const Container = styled.div<{ viewMode: ViewMode }>`
  width: 96%;
  min-height: calc(100vh - 6rem);
  height: fit-content;
  margin: 2%;
  position: relative;
  background-color: ${theme.backgroundColor};
  justify-content: space-between;
  gap: 1rem;

  @media (min-width: ${MOBILE_WIDTH}px) {
    display: ${(props) => (props.viewMode === VIEW_MODE.MULTIPLE ? 'grid' : 'block')};
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  @media (max-width: ${MOBILE_WIDTH}px) {
    display: flex;
    flex-direction: column;
  }
`;
