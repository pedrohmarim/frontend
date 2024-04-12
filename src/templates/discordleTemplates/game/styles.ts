import styled, { css } from 'styled-components';

export const ScoreTextContainer = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) => {
    if (isMobile) {
      return css`
        position: relative;
        margin-bottom: 20px;
      `;
    } else {
      return css`
        position: absolute;
        right: 0;
        margin-top: 40px;
      `;
    }
  }}
  margin-right: 20px;
`;

export const ScoreText = styled.span`
  font-size: 15pt;
`;
