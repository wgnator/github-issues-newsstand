import { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

export default function Chip({
  children,
  color,
  className,
}: {
  children?: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <Container color={color} className={className}>
      {children}
    </Container>
  );
}

const Container = styled.span<{ color?: string }>`
  background-color: ${(props) => props.color + '80'};
  border-radius: 1rem;
  padding: 0.15rem 0.4rem;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: pre;
  &:hover {
  }
`;
