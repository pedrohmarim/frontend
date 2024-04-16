import styled, { css } from 'styled-components';

export const GameTitle = styled.h2<{ margin?: string }>`
  text-align: center;
  margin: ${({ margin }) => margin};
  color: ${(props) => props.theme.discordleColors.primary};
  word-break: break-all;
`;

export const HintContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  .ant-popover-inner {
    padding: 10px !important;
  }
`;

export const Container = styled.div`
  margin-top: 25px;
  max-width: 650px;
  margin: auto;

  @media screen and (min-width: 700px) {
    min-width: 600px;
  }
`;

export const MainMessageContainer = styled.div`
  border: solid 2px rgba(138, 0, 194, 0.4);
  box-shadow: 0px 0px 15px 15px rgba(255, 255, 255, 0.08);
  padding: 10px;
  border-radius: 4px;
  margin: 30px 0;
`;

export const ScoreTextContainer = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) => {
    if (isMobile) {
      return css`
        position: relative;
        margin-bottom: 20px;
      `;
    }
  }}
`;

export const ScoreText = styled.span`
  font-size: 18pt;
`;
