import styled from 'styled-components';
import { Row as AntdRow } from 'antd_components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.discordleColors.background};
  width: fit-content;
  border: solid 1px rgba(255, 255, 255, 0.1);
  transition: all 0.2s;
  min-width: 180px;
  max-width: 180px;
  min-height: fit-content;
  max-height: 280px;
  margin: 25px 10px;

  :hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.08);
    scale: calc(1.1);
  }
`;

export const Row = styled(AntdRow)`
  margin-bottom: 10px;
`;

export const Username = styled.span`
  margin-top: 10px;
  max-width: 100%;
  word-break: break-all;
  text-align: center;
  font-size: 14pt;
`;

export const TimerText = styled.span`
  font-weight: 400;
  font-size: 11pt;
  text-align: center;
  width: 100%;
  margin-top: 10px;
`;

export const InvalidText = styled.span`
  color: red;
  opacity: 0.75;
  font-weight: 400;
  font-size: 11pt;
`;

export const Empty = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MemberRow = styled.div<{
  empty: boolean;
  onlyOneMember: boolean;
  showSkeleton: boolean;
}>`
  overflow-x: auto;
  display: flex;
  padding: 15px;
  margin-top: 10px;
  align-items: ${({ showSkeleton }) => (showSkeleton ? 'center' : '')};
  justify-content: ${({ onlyOneMember }) =>
    onlyOneMember ? 'center' : 'start'};
  font-size: 15pt;
  font-weight: 500;
  color: ${(props) => props.theme.discordleColors.text};
  background-color: #17171a;
  border-radius: 8px;
  scroll-snap-type: x mandatory;
  transition: scroll-left 0.5s ease-out;
  max-width: 100vw;
  cursor: ${({ empty }) => (empty ? 'default' : 'grab')} !important;

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.discordleColors.text};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.discordleColors.primary};
  }
`;
