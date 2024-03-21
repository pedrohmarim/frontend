import styled from 'styled-components';
import Lottie from 'lottie-react';

export const LottieContainer = styled(Lottie)`
  margin-top: -40px;
  width: 250px;
  height: 250px;
`;

export const LoadingDescription = styled.span`
  margin-top: -80px;
  padding: 0 10px;
  background-color: rgba(4, 4, 4, 1);
  color: ${(props) => props.theme.discordleColors.text};
  font-size: 15pt;
`;

export const ScreenBlocker = styled.div`
  display: none;
  background-color: rgba(4, 4, 4, 0.65);
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
