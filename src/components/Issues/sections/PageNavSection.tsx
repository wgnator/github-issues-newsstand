import styled from 'styled-components';
import Button from '../../UI_common/Button';

export default function PageNavSection({
  page,
  hasNextPage,
  isFetchingNextPage,
  setPage,
}: {
  page: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  setPage: (page: number) => void;
}) {
  return (
    <Container>
      {page > 1 && <PrevButton onClick={() => setPage(page - 1)}>&lt; Previous Page</PrevButton>}
      Page {page}
      {isFetchingNextPage ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        hasNextPage && <NextButton onClick={() => setPage(page + 1)}>Next Page &gt;</NextButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 2rem;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 2rem;
`;
const PrevButton = styled(Button)`
  position: absolute;
  left: 1rem;
  font-size: 0.8rem;
`;
const NextButton = styled(Button)`
  position: absolute;
  right: 1rem;
  font-size: 0.8rem;
`;
const LoadingText = styled.div`
  position: absolute;
  right: 1rem;
  font-size: 0.8rem;
`;
