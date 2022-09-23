import { ReactNode } from "react";
import styled from "styled-components";

export default function Main({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.main`
  display: flex;
  justify-content: stretch;
  height: calc(100% - 3rem);
`;
