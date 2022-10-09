import { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

export default function Main({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
  width: 100%;
  min-height: 0;
  background-color: ${theme.primaryBackgroundColor};
`;
