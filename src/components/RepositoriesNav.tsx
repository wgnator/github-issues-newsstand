import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { saveReposState } from '../atoms/reposState';
import { theme } from '../styles/theme';
import { IoIosClose } from 'react-icons/io';
import Button from './UI_common/Button';
import { MOBILE_WIDTH } from '../consts/consts';

export default function RepositoriesNav() {
  const [savedRepos, setSavedRepos] = useRecoilState(saveReposState);
  const navigate = useNavigate();
  const navigateToSingleRepoPage = (repoId: number) => navigate(`/${repoId}`);
  const navigateToShowAllPage = () => navigate(`/`);
  const removeRepo = (repoIdToRemove: number) => {
    setSavedRepos(savedRepos.filter((repo) => repo.id !== repoIdToRemove));
    navigateToShowAllPage();
  };

  return (
    <Container>
      {savedRepos.map((repo, index) => (
        <Item
          key={repo.id}
          color={theme.repoColor[index]}
          onClick={() => navigateToSingleRepoPage(repo.id)}
        >
          <RepoName>{repo.fullName}</RepoName>
          <RemoveIcon
            onClick={(event) => {
              event.stopPropagation();
              removeRepo(repo.id);
            }}
          />
        </Item>
      ))}

      <ButtonWrapper>
        <ShowAllButton onClick={navigateToShowAllPage} />{' '}
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.ul`
  height: 3rem;
  width: 100%;
  justify-content: flex-start;
  display: flex;
  padding: 0.5rem 1rem;
  gap: 1rem;
  @media (max-width: ${MOBILE_WIDTH}px) {
    padding: 0.3rem 0.5rem;
    gap: 1%;
  }
`;

const ButtonWrapper = styled.li`
  width: 18%;
  margin-left: auto;

  @media (max-width: ${MOBILE_WIDTH}px) {
    display: none;
  }
`;
const ShowAllButton = styled(Button)`
  width: 100%;
  height: 100%;
  &::before {
    content: 'Show All';
  }
  @media (max-width: ${MOBILE_WIDTH}px) {
    &::before {
      content: 'All';
    }
  }
`;
const Item = styled.li<{ color: string }>`
  width: 18%;
  background-color: ${(props) => props.color};
  color: white;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 0.5rem;
  position: relative;

  @media (max-width: ${MOBILE_WIDTH}px) {
    padding: 0.2rem 0.2rem;
    font-size: 0.8rem;
    width: 24%;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      z-index: -1;
      background-color: ${(props) => props.color};
    }
  }
`;
const RepoName = styled.div`
  width: 100%;
  height: 100%;
  line-height: 1.5;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: ${MOBILE_WIDTH}px) {
    text-overflow: inherit;
    display: flex;
    align-items: center;
  }
`;

const RemoveIcon = styled(IoIosClose)`
  min-width: 1rem;
  height: 1rem;
`;
