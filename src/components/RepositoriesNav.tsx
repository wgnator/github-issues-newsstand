import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { savedReposState } from "../atoms/reposState";
import { theme } from "../styles/theme";

export default function RepositoriesNav() {
  const [savedRepos, setSavedRepos] = useRecoilState(savedReposState);
  const navigate = useNavigate();
  return (
    <Container>
      {savedRepos.map((repo) => (
        <Item onClick={() => navigate(`/${repo.id}`)}>{repo.fullName}</Item>
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
`;
