import styled from 'styled-components';
import { Card, Select as SelectAntd } from 'antd_components';

export const AuthorName = styled.span`
  margin-left: 10px;
  font-size: 13pt;
  font-weight: 500;
  color: #000;
`;

export const Message = styled(Card)`
  margin: 0 50px;
  font-size: 15pt;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.text};
  border-radius: 4px;
  margin-bottom: 50px;
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Span = styled.span`
  color: ${(props) => props.theme.colors.text};
`;

export const Select = styled(SelectAntd)`
  width: 300px;

  .ant-select-selection-placeholder {
    color: ${(props) => props.theme.colors.primary};
  }
`;
