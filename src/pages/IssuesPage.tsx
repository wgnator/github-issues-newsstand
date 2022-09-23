import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { savedReposState } from "../atoms/reposState";
import useIssuesQuery from "../fetch_modules/issues/useIssuesQuery";
import { theme } from "../styles/theme";
import { Issue } from "../types/data";

export default function IssuesPage() {
  const { repositoryId } = useParams();
  const { issues } = useIssuesQuery();
  const savedRepos = useRecoilValue(savedReposState);

  return (
    <Container>
      {issues
        ? repositoryId
          ? issues[repositoryId].map((issue: Issue) => <Item>{issue.title}</Item>)
          : Object.values(issues)
              .flat()
              .map((issue: Issue) => <Item>{issue.title}</Item>)
        : ""}
    </Container>
  );
}

const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow: auto;
`;

const Item = styled.li`
  border: 0.5px solid ${theme.borderColor};
`;
