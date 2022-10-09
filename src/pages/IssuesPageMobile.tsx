import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { saveReposState } from '../atoms/reposState';
import IssuesBoxMobile from '../components/Issues/IssuesBoxMobile';
import { theme } from '../styles/theme';
import { screenSizeState } from '../atoms/screenSizeState';
import { useEffect, useRef } from 'react';
import useSwipe from '../UI_hooks/useSwipe';

export default function IssuesPageMobile() {
  const savedRepos = useRecoilValue(saveReposState);
  const { repoId: selectedRepoId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const screenWidth = useRecoilValue(screenSizeState);
  console.log('issue page rendering...');

  useEffect(() => {
    containerRef.current &&
      containerRef.current.scrollTo({
        left: savedRepos.findIndex((repo) => repo.id === Number(selectedRepoId)) * screenWidth,
        behavior: 'smooth',
      });
  }, [selectedRepoId]);

  useSwipe(containerRef, screenWidth, 'x');

  return savedRepos.length > 0 ? (
    <Container ref={containerRef}>
      <IssuesContainer>
        {savedRepos.map((repo, index) => (
          <IssuesBoxMobile key={repo.id} repoName={repo.fullName} repoIndex={index} />
        ))}
      </IssuesContainer>
    </Container>
  ) : (
    <NoRepositories>
      {' '}
      <h2>Search &#38; Add Repositories</h2>
    </NoRepositories>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: ${theme.primaryBackgroundColor};
`;
const IssuesContainer = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
`;
const NoRepositories = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
`;
