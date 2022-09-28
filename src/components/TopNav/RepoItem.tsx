import { BsArrowRightCircle } from 'react-icons/bs';
import styled from 'styled-components';
import { Repository } from '../../types/data';
import Button from '../UI_common/Button';

export default function RepoItem({
  repo,
  saveRepo,
}: {
  repo: Repository;
  saveRepo: (repo: Repository) => void;
}) {
  return (
    <Container>
      <ItemInfo>
        <h3>{repo.fullName}</h3>
        <div>{repo.description}</div>
        <ItemDetails>
          {repo.stargazers_count && <Detail>⭐ {repo.stargazers_count}</Detail>}
          {repo.language && <Detail>{repo.language}</Detail>}
          {repo.license && <Detail>{repo.license}</Detail>}
          <Detail>Last Update: {repo.updated_at.toLocaleDateString()}</Detail>
        </ItemDetails>
      </ItemInfo>
      <SaveButton
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          saveRepo(repo);
        }}
      >
        <span> Save </span>
        <SaveRepoIcon />
      </SaveButton>
    </Container>
  );
}

const Container = styled.li`
  width: 100%;
  padding: 0.3rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 120%;
`;
const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;
const ItemDetails = styled.div`
  gap: 0.3rem;
`;
const Detail = styled.span`
  &::after {
    content: ' | ';
  }
  &:last-child::after {
    content: '';
  }
`;
const SaveButton = styled(Button)`
  border-radius: 5px;
  display: flex;
  gap: 0.2rem;
  width: 5rem;
  height: 2rem;
`;
const SaveRepoIcon = styled(BsArrowRightCircle)``;
