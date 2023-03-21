import styled from 'styled-components';
import { Select as SelectAntd } from 'antd_components';

export const Select = styled(SelectAntd)`
  width: 300px;

  .ant-select-selection-placeholder {
    font-weight: 500;
    color: ${(props) => props.theme.colors.background};
  }
`;

export const AuthorName = styled.span`
  margin-left: 10px;
  font-size: 13pt;
  font-weight: 500;
  color: #000;
`;

export const AuthorHighlight = styled.span`
  color: #8a00c2;
`;
