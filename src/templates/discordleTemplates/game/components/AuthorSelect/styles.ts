import styled from 'styled-components';
import { Select as SelectAntd } from 'antd_components';

export const Select = styled(SelectAntd)`
  width: 300px;

  @media screen and (max-width: 350px) {
    width: 100%;
  }

  .ant-select-selection-placeholder {
    font-weight: 500;
    color: ${(props) => props.theme.discordleColors.background} !important;
  }
`;

export const AuthorName = styled.span`
  white-space: nowrap;
  width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
  font-size: 13pt;
  font-weight: 500;
  text-align: left;
  color: #000;
`;

export const AuthorHighlight = styled.span`
  color: #8a00c2;
  font-weight: 500;
`;
