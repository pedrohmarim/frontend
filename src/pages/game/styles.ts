import styled from 'styled-components';
import { Card, Select as SelectAntd } from 'antd_components';

export const ColumnContainer = styled.div`
  flex-direction: column;
  text-align: center;
`;

export const Message = styled(Card)`
  padding: 25px;
  margin: 0 50px;
  font-size: 15pt;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  background-color: #17171a;
  border-radius: 4px;
  margin-bottom: 30px;
  position: relative;
`;

export const Date = styled.span`
  font-size: 11pt;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0 5px 5px 0;
`;

export const Select = styled(SelectAntd)`
  width: 300px;

  .ant-select-selection-placeholder {
    color: ${(props) => props.theme.colors.background};
  }
`;

export const AuthorName = styled.span`
  margin-left: 10px;
  font-size: 13pt;
  font-weight: 500;
  color: #000;
`;
