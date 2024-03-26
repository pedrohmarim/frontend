import styled from 'styled-components';
import { Divider as DividerAntd } from 'antd_components';

export const Subtitle = styled.span`
  margin-left: 5px;
  font-size: 12pt;
  margin-bottom: 20px;
`;

export const Divider = styled(DividerAntd)`
  border-color: ${(props) => props.theme.discordleColors.text};
  opacity: 0.2;
`;

export const MarginSpan = styled.span<{ margin: string }>`
  margin: ${({ margin }) => margin};
`;

export const Span = styled.span`
  font-size: 12pt;
`;

export const TimerContainer = styled.div`
  width: fit-content;
  margin: auto;
  padding: 10px;
  margin: 20px auto 35px auto;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.08);
  border: solid 2px rgba(138, 0, 194, 0.4);
`;

export const AnswerItem = styled.div<{
  success: boolean | undefined;
  score: number;
}>`
  box-shadow: 0px 0px 7px 7px rgba(255, 255, 255, 0.06);
  background-color: ${({ success, score }) =>
    success ? (score === 2 ? '#009e3f' : '#d48a00') : '#a61f1f'};
  border-radius: 50%;
  margin: 10px;
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
