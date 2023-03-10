import styled from "styled-components";
import { Select as SelectStyled } from "antd";

export const Select = styled(SelectStyled)`
  width: ${({ width }) => width} !important;
  margin-top: ${({ margintop }) => margintop} !important;

  .ant-select-selection-placeholder {
    opacity: 0.7 !important;
  }
`;
