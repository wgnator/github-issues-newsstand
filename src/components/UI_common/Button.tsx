import { ComponentProps } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

export default function Button(props: ComponentProps<any> & { color: string }) {
  return <Container {...props} color={props.color} />;
}

const Container = styled.button<{ color?: string }>`
  color: ${(props) => (props.color ? props.color : theme.primaryDarkColor)};
  padding: 0.2rem 0.5rem;
  border: 1px solid ${(props) => (props.color ? props.color : theme.primaryDarkColor)};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.1s, color 0.1s;

  @media (pointer: fine) {
    &:hover {
      background-color: ${(props) => (props.color ? props.color : theme.primaryDarkColor)};
      color: white;
    }
  }
`;
