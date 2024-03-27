import styled, { keyframes } from 'styled-components';

const slideAndBounce = keyframes`
    0% {
      transform: translateY(3000%);
    }
    40% {
      transform: translateY(0);
    }
    45% {
      transform: translateY(-10px);
    }
    50% {
      transform: translateY(5px);
    }
    55% {
      transform: translateY(-2px);
    }
    60% {
      transform: translateY(1px);
    }
    65% {
      transform: translateY(-1px);
    }
    70% {
      transform: translateY(0.5px);
    }
    75% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(0);
    }
`;

export const Container = styled.div<{ marginTop: number }>`
  background-color: ${(props) =>
    props.theme.discordleColors.background} !important;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  animation: ${slideAndBounce} 1.5s ease-in-out;
  margin: ${({ marginTop }) => `${marginTop}px 25px 0 25px`};
  color: ${(props) => props.theme.discordleColors.text};
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;
`;

export const ListContainer = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: lightgrey;
  background-color: #17171a;
  overflow-y: auto;
  max-height: 71vh;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.theme.discordleColors.primary} !important;
  }
`;

export const ListTitle = styled.span`
  font-size: 18pt;
  margin-bottom: 15px;
`;

export const GuildItem = styled.div``;

export const GuildName = styled.div``;
