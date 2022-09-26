import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { savedRepoNames } from "../atoms/reposState";
import { theme } from "../styles/theme";
import { IoIosClose } from "react-icons/io";

export default function RepositoriesNav() {
  const [savedRepos, setSavedRepos] = useRecoilState(savedRepoNames);
  const navigate = useNavigate();
  return (
    <Container>
      {savedRepos.map((repo) => (
        <Item key={repo.id} onClick={() => navigate(`/${repo.fullName}`)}>
          {repo.fullName}
          <CloseIcon
            onClick={() => setSavedRepos(savedRepos.filter((_repo) => _repo.id !== repo.id))}
          />
        </Item>
      ))}
      <Item onClick={() => navigate(`/`)}>Show All</Item>
    </Container>
  );
}

const Container = styled.nav`
  height: 100%;
  width: 30%;
  max-width: 300px;
  min-width: 200px;
  border-left: 1px solid black;
`;

const Item = styled.li`
  border: 1px solid ${theme.borderColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem;
`;

const CloseIcon = styled(IoIosClose)``;
