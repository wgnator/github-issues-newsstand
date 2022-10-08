import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { saveReposState } from '../atoms/reposState';
import IssuesBox from '../components/Issues/IssuesBox';
import { theme } from '../styles/theme';

export default function IssuesPage() {
  const { repoId: selectedRepoId } = useParams();
  const savedRepos = useRecoilValue(saveReposState);
  const navigate = useNavigate();

  return savedRepos.length > 0 ? (
    <Container>
      {savedRepos.map((repo, index) => (
        <IssuesBox
          key={repo.id}
          repoName={repo.fullName}
          isExpanded={Number(selectedRepoId) === repo.id}
          repoIndex={index}
          onExpandCallback={() => navigate(`/${Number(selectedRepoId) === repo.id ? '' : repo.id}`)}
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

const Container = styled.div`
  padding: 1rem;

  margin: auto;
  position: relative;
  height: 100%;
  background-color: ${theme.primaryBackgroundColor};
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  width: 100%;
  flex-wrap: wrap;

  > *:nth-child(3) {
    align-self: flex-end;
  }
  > *:nth-child(4) {
    align-self: flex-end;
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
