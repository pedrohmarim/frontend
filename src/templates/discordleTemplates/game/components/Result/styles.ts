import styled, { css } from 'styled-components';
import { Divider as DividerAntd, Row as AntdRow } from 'antd_components';

export const Subtitle = styled.span`
  margin-left: 5px;
  font-size: 12pt;
`;

export const Row = styled(AntdRow)`
  width: 100%;
  font-size: 16pt;
`;

export const Divider = styled(DividerAntd)`
  border-color: rgba(255, 255, 255, 0.15);
`;

export const MarginSpan = styled.div`
  font-size: 22pt;
  margin-bottom: 15px;
`;

export const Span = styled.span`
  font-size: 14pt;
`;

export const MessageContent = styled.div`
  margin-top: 20px;
`;

export const TimerContainer = styled.div`
  width: fit-content;
  margin: auto;
  font-size: 14pt;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.08);
  border: solid 2px rgba(138, 0, 194, 0.4);
`;

export const AnswerContainer = styled.div<{ isMobile: boolean }>`
  margin: 0px 20px 0 20px;
  display: flex;
  width: ${({ isMobile }) => (isMobile ? '100%' : '')};
  flex-direction: column;
  align-items: center;
`;

export const AnswerItem = styled.h2<{
  success: boolean | undefined;
  score: number;
}>`
  margin-right: 10px;
  box-shadow: 0px 0px 7px 7px rgba(255, 255, 255, 0.06);
  background-color: ${({ success, score }) =>
    success ? (score === 2 ? '#009e3f' : '#d48a00') : '#a61f1f'};
  border-radius: 50%;
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const AsideGuildInfo = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ isMobile }) => {
    if (isMobile) {
      return css`
        position: relative;
      `;
    } else {
      return css`
        margin-right: 20px;
        position: absolute;
        right: 0;
      `;
    }
  }}
`;
