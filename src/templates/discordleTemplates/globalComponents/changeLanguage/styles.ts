import styled, { css } from 'styled-components';
import { Select as AntdSelect } from 'antd_components';

export const Label = styled.span`
  margin-left: 5px;
`;

export const Select = styled(AntdSelect).withConfig({
  shouldForwardProp: (prop) =>
    !['fromhome'].includes(prop) ||
    !['ismobile'].includes(prop) ||
    !['sessionuser'].includes(prop),
})<{ fromhome?: boolean; ismobile?: boolean; sessionuser?: boolean }>`
  ${({ fromhome, ismobile, sessionuser }) => {
    if (fromhome)
      return css`
        margin-bottom: 40px !important;
        margin-right: 15px;
      `;

    if (ismobile && !sessionuser)
      return css`
        margin-top: 15px;
      `;

    if (ismobile && sessionuser)
      return css`
        margin-right: 70px;
      `;

    return css`
      margin: 0px !important;
      padding: 0px;
    `;
  }}

  .ant-select-selector {
    background-color: transparent !important;
    border: none !important;
  }

  .ant-select-selection-item {
    padding: 5px !important;
  }

  .ant-select-arrow {
    display: none;
  }
`;
