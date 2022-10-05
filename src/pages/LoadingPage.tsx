import styled from 'styled-components';
import { theme } from '../styles/theme';

export function LoadingPage() {
  return <Container>Loading...</Container>;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.primaryBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
