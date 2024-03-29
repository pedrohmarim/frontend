import styled, { keyframes } from 'styled-components';
import { Row, Pagination as PaginationAntd } from 'antd_components';

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

export const Container = styled.div<{
  marginTop: number;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) =>
    props.theme.discordleColors.background} !important;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  animation: ${slideAndBounce} 1.5s ease-in-out;
  margin: ${({ marginTop }) => `${marginTop}px 25px 0 25px`};
  color: ${(props) => props.theme.discordleColors.text};
  border-radius: 10px;
  padding: 20px;
  height: 85vh;
`;

export const ListContainer = styled.div`
  border-radius: 10px;
  height: 100%;
  margin: 15px 0;
  background-color: #17171a;
  border: solid 1px rgba(255, 255, 255, 0.08);
  overflow-y: auto;
  min-height: 81%;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    margin: 5px 0;
    background-color: ${(props) =>
      props.theme.discordleColors.background} !important;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${(props) =>
      props.theme.discordleColors.primary} !important;
  }
`;

export const ListTitle = styled.span`
  font-size: 18pt;
  text-align: center;
  width: 100%;
  margin-left: 10px;
`;

export const GuildItem = styled.div`
  padding: 10px;
  height: 300px;
  margin: 20px 0;
  border-radius: 8px;
  transition: all 0.2s;
  scale: calc(0.9);
  background-color: ${(props) =>
    props.theme.discordleColors.background} !important;

  :hover {
    :hover {
      cursor: pointer;
      box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.08);
      scale: calc(1);
    }
  }
`;

export const GuildName = styled.div`
  margin-top: 10px;
  text-align: center;
`;

export const TextContainer = styled.div``;

export const InputContainer = styled.div<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '100%' : '300px')};
  margin-top: ${({ isMobile }) => (isMobile ? '15px' : '0')};
`;

export const Pagination = styled(PaginationAntd)`
  color: ${(props) => props.theme.discordleColors.text};

  .ant-pagination-item-ellipsis {
    color: ${(props) => props.theme.discordleColors.text} !important;
  }
`;

export const PaginationContainer = styled(Row)`
  font-size: 12pt;
`;

export const PrimaryTextColor = styled.span`
  color: ${(props) => props.theme.discordleColors.primary};
  margin-right: 5px;
  font-weight: bold;
`;
