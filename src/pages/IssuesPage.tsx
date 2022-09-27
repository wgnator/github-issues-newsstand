import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { saveReposState } from '../atoms/reposState';
import IssuesBox from '../components/Issues/IssuesBox';
import { theme } from '../styles/theme';

export default function IssuesPage() {
  const { repoId: selectedRepoId } = useParams();
  const savedRepos = useRecoilValue(saveReposState);
  const getRepoNameById = (repoId: string) =>
    savedRepos.find((repo) => repo.id === Number(repoId))?.fullName;
  const [expandedRepoId, setExpandedRepoId] = useState<null | number>();
  return (
    <Container hasManyChildren={!selectedRepoId}>
      {selectedRepoId ? (
        <IssuesBox
          repoIndex={savedRepos.findIndex((repo) => repo.id === Number(selectedRepoId))}
          repoName={getRepoNameById(selectedRepoId)}
          expanded={true}
        />
      ) : (
        savedRepos.map((repo, index) => (
          <IssuesBox
            key={repo.id}
            repoName={repo.fullName}
            expanded={expandedRepoId === repo.id}
            repoIndex={index}
            onExpandCallback={() =>
              setExpandedRepoId(expandedRepoId === repo.id ? null : repo.id)
            }
          />
        ))
      )}
    </Container>
  );
}

const Container = styled.div<{ hasManyChildren: boolean }>`
  width: 96%;
  height: calc(100vh - 6rem);
  margin: 1rem;
  position: relative;
  background-color: ${theme.backgroundColor};
  display: ${(props) => (props.hasManyChildren ? 'grid' : 'block')};
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-content: space-between;

  > * {
    height: ${(props) =>
      props.hasManyChildren ? 'calc((100vh - 10rem) / 2) ' : 'calc(100vh - 10rem)'};
  }
`;
