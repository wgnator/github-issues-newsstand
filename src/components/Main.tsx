import { ReactNode, Suspense } from 'react';
import styled from 'styled-components';
import { LoadingPage } from '../pages/LoadingPage';
import { theme } from '../styles/theme';

export default function Main({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Container>{children}</Container>
    </Suspense>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: calc(100% - 6rem);
  background-color: ${theme.primaryBackgroundColor};
`;
