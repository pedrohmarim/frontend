import styled, { keyframes } from 'styled-components';
import {
  Menu as AntdMenu,
  Row as RowAntd,
  Drawer as DrawerAntd,
} from 'antd_components';

export const DesktopMenu = styled(AntdMenu)`
  margin: 25px 0;
  display: flex;
  height: fit-content;
  border-radius: 40px 0 0 40px;
  justify-content: end;
  align-items: center;
  background-color: ${(props) =>
    props.theme.discordleColors.background} !important;

  .ant-menu-item {
    min-width: 100px;
    text-align: center;
    font-size: 16pt;
    padding: 10px 0px !important;
    margin: 0 30px !important;
    height: 100%;
    color: ${(props) => props.theme.discordleColors.text} !important;
  }

  .ant-menu-item-active::after,
  .ant-menu-submenu::after {
    width: 100%;
    margin-left: -20px !important;
    border-color: ${(props) => props.theme.discordleColors.primary} !important;
  }

  .ant-menu-item-selected::after {
    margin-left: -20px !important;
    width: 100%;
    border-color: ${(props) => props.theme.discordleColors.primary} !important;
  }
`;

export const MobileMenu = styled(AntdMenu)`
  background-color: ${(props) =>
    props.theme.discordleColors.background} !important;

  .ant-menu-item-selected {
    background-color: ${(props) =>
      props.theme.discordleColors.background} !important;
  }

  .ant-menu-item {
    font-size: 14pt;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: ${(props) => props.theme.discordleColors.text} !important;
  }
`;

const slideInFromRight = keyframes`
    0% {
      transform: translateX(100%);
    }
    40% {
      transform: translateX(0);
    }
    45% {
      transform: translateX(-10px);
    }
    50% {
      transform: translateX(5px);
    }
    55% {
      transform: translateX(-2px);
    }
    60% {
      transform: translateX(1px);
    }
    65% {
      transform: translateX(-1px);
    }
    70% {
      transform: translateX(0.5px);
    }
    75% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(0);
    }
`;

export const Row = styled(RowAntd)`
  width: 100%;
  animation: ${slideInFromRight} 1.5s ease-in-out forwards;
`;

export const AbsoluteRow = styled.div<{ isMobile: boolean }>`
  cursor: pointer;
  display: flex;
  position: ${({ isMobile }) => (isMobile ? 'initial' : 'absolute')};
  margin-top: 25px;
  margin-left: ${({ isMobile }) => (isMobile ? '0' : '25px')};
  justify-content: ${({ isMobile }) => (isMobile ? 'center' : 'start')};
  width: ${({ isMobile }) => (isMobile ? '100%' : 'fit-content')};
`;

export const DrawerTitle = styled.span`
  font-size: 15pt;
`;

export const Drawer = styled(DrawerAntd)`
  .ant-drawer-title,
  .ant-drawer-close {
    color: ${(props) => props.theme.discordleColors.primary} !important;
  }
`;
