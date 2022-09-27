import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { saveReposState } from '../atoms/reposState';
import { theme } from '../styles/theme';
import { IoIosClose } from 'react-icons/io';
import Button from './UI_common/Button';

export default function RepositoriesNav() {
  const [savedRepos, setSavedRepos] = useRecoilState(saveReposState);
  const navigate = useNavigate();
  return (
    <Container>
      {savedRepos.map((repo, index) => (
        <Item
          key={repo.id}
          color={theme.repoColor[index]}
          onClick={() => {
            navigate(`/${repo.id}`);
          }}
        >
          <RepoName>{repo.fullName}</RepoName>
          <RemoveIcon
            onClick={(event) => {
              event.stopPropagation();
              setSavedRepos(savedRepos.filter((_repo) => _repo.id !== repo.id));
              navigate('/');
            }}
          />
        </Item>
      ))}
      <ShowAllButton onClick={() => navigate(`/`)}>Show All</ShowAllButton>
    </Container>
  );
}

const Container = styled.nav`
  min-height: 3rem;
  width: 100%;
  justify-content: flex-start;
  display: flex;
  padding: 0.5rem 1rem;
  gap: 1rem;
`;

const ShowAllButton = styled(Button)`
  width: 18%;
  margin-left: auto;
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
`;
const RepoName = styled.div`
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const RemoveIcon = styled(IoIosClose)`
  min-width: 1rem;
  height: 1rem;
`;
