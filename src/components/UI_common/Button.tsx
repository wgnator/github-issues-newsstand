import { ComponentProps } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

export default function Button(props: ComponentProps<any>) {
  return <Container {...props} />;
}

const Container = styled.button`
  color: ${theme.primaryColor};
  padding: 0.2rem 0.5rem;
  border: 1px solid ${theme.primaryColor};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.1s, color 0.1s;
  &:hover {
    background-color: ${theme.primaryColor};
    color: white;
  }
`;
