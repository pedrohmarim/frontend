import styled, { css } from 'styled-components';
import { Row, Popover as PopOverAntd } from 'antd_components';

export const ServerInfoContainer = styled(Row)`
  width: 100%;
`;

export const Popover = styled(PopOverAntd)<{ ismobile: boolean }>`
  ${({ ismobile }) => {
    if (ismobile) {
      return css`
        position: absolute;
        top: -85px;
        z-index: 999999;
        right: 0;
      `;
    } else {
      return css`
        cursor: pointer;
      `;
    }
  }}
`;

export const ServerName = styled.span<{ isMobile: boolean }>`
  margin-left: 12px;
  font-size: 22pt;
  text-align: ${({ isMobile }) => (isMobile ? 'center' : 'start')};
  margin-bottom: ${({ isMobile }) => (isMobile ? '10px' : '0px')};
  margin-top: ${({ isMobile }) => (isMobile ? '10px' : '0px')};
`;

export const ServerCode = styled.span<{ isMobile: boolean }>`
  margin-left: 12px;
  text-align: ${({ isMobile }) => (isMobile ? 'center' : 'start')};
`;

export const Clipboard = styled.div`
  cursor: pointer;
  margin-left: 10px;
`;

export const Container = styled.div``;
