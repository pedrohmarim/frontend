import styled, { css, keyframes } from 'styled-components';
import { Row, Pagination as PaginationAntd } from 'antd_components';
import Lottie from 'lottie-react';

export const StyledLottie = styled(Lottie)`
  position: relative;
  z-index: -999;

  svg {
    margin-top: -3.2%;
  }
`;

export const Title = styled(Row)`
  font-size: 36pt;
  margin-bottom: 10px;
`;

export const Description = styled(Row)<{
  width: string;
  fontSize: string;
  fontStyle?: string;
}>`
  font-size: ${({ fontSize }) => fontSize};
  width: ${({ width }) => width};
  font-style: ${({ fontStyle }) => fontStyle};
`;

export const ApresentationContainer = styled.div<{ isMobile: boolean }>`
  padding: 0 25px;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  width: 100%;
  font-size: 13pt;
  height: 40%;
  color: ${(props) => props.theme.discordleColors.text};

  ${({ isMobile }) =>
    !isMobile
      ? css`
          position: absolute;
        `
      : ''};
`;

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

export const AnimationContainer = styled.div`
  position: relative;
  animation: ${slideAndBounce} 1.5s ease-in-out;
`;

export const Container = styled.div<{
  margin: string;
  maxHeight: string;
  height?: string;
  padding: string;
  alignItems?: string;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${({ alignItems }) => alignItems};
  background-color: ${(props) =>
    props.theme.discordleColors.background} !important;
  box-shadow: rgba(0, 0, 0, 1) 0px 0px 120px 50px;
  margin: ${({ margin }) => margin};
  color: ${(props) => props.theme.discordleColors.text};
  border-radius: 10px;
  padding: ${({ padding }) => padding};
  max-height: ${({ maxHeight }) => maxHeight};
  height: ${({ height }) => height};
`;

export const ListContainer = styled.div`
  border-radius: 10px;
  height: 100%;
  margin: 15px 0;
  background-color: #17171a;
  border: solid 1px rgba(255, 255, 255, 0.08);
  overflow-y: auto;

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

export const SpanEnterRoom = styled.div`
  text-align: center;
  font-size: 11.5pt;
  position: absolute;
  bottom: 0;
  margin-bottom: 15px;
  display: none;
  color: ${(props) => props.theme.discordleColors.primary};
  font-weight: bold;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #17171a;
  opacity: 0.9;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  height: 100%;
`;

export const GuildItemBackgroundImage = styled.div<{ icon: string }>`
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: ${({ icon }) => `url(${icon})`};
  filter: blur(4px);
  background-size: cover;
  background-position: center;
`;

export const GuildItem = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  border-radius: 8px;
  border: solid 2px rgba(255, 255, 255, 0.25);
  transition: all 0.2s;
  scale: calc(0.9);
  background-color: ${(props) =>
    props.theme.discordleColors.background} !important;

  :hover {
    cursor: pointer;
    scale: calc(1);

    & ${SpanEnterRoom} {
      display: block;
    }
  }
`;

export const GuildName = styled.div`
  text-align: center;
  font-size: 13pt;
`;

export const EmptyContainer = styled.div``;

export const InputContainer = styled.div<{ ismobile: boolean }>`
  width: ${({ ismobile }) => (ismobile ? '100%' : '300px')};
  margin-top: ${({ ismobile }) => (ismobile ? '15px' : '0')};
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

export const EmptyContent = styled(Row)`
  height: 100%;
  width: 100%;
`;

export const PrimaryTextColor = styled.span`
  color: ${(props) => props.theme.discordleColors.primary};
  margin-right: 5px;
  font-weight: bold;
`;
