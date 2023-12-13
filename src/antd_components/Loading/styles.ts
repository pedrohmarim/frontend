import styled, { keyframes } from 'styled-components';

export const ScreenBlocker = styled.div`
  display: none;
  background-color: rgba(4, 4, 4, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999999;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

export const Span = styled.span`
  color: #fff;
  font-size: 1.1em;
  margin-top: 15px;
`;

const Spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  border: 8px solid transparent;
  border-radius: 50%;
  border-top: 10px solid ${(props) => props.theme.colors.textPrimary};
  border-bottom: 10px solid ${(props) => props.theme.colors.textPrimary};
  width: 80px;
  height: 80px;
  animation: ${Spin} 1.5s linear infinite;
`;
