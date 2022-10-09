import styled from 'styled-components';

export default function LoadingSpinner({ color }: { color: string }) {
  return <MainCircle color={color} />;
}

const MainCircle = styled.div<{ color: string }>`
  width: 3rem;
  height: 3rem;
  position: relative;
  border: 7px solid ${(props) => props.color};
  border-top: 7px solid transparent;
  border-radius: 50%;
  animation: 0.8s infinite linear rotate;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
