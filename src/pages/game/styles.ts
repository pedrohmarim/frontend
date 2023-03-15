import styled from 'styled-components';
import { Card, Select as SelectAntd, Row } from 'antd_components';

export const ColumnContainer = styled.div`
  flex-direction: column;
  text-align: center;
  max-width: 75%;
`;

export const Title = styled.div<{ marginTop?: string }>`
  text-align: left;
  font-size: 14pt;
  font-weight: 100;
  margin-bottom: 5px;
  margin-top: ${({ marginTop }) => marginTop};
`;

export const Message = styled.div`
  padding: 15px;
  text-align: left;
  font-size: 13pt;
  font-weight: 1;
  position: relative;
  background-color: ${(props) => props.theme.colors.background};
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  max-height: 300px;
  height: 300px;
  max-width: auto;
  width: auto;
`;

export const MessageContainer = styled(Card)`
  padding: 25px;
  margin: 0 50px;
  font-size: 15pt;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  background-color: #17171a;
  border-radius: 4px;
  border-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 30px;
`;

export const Date = styled(Row)`
  font-size: 11pt;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0 10px 10px 0;
`;

export const Span = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  font-weight: 500;
`;

export const GameTitle = styled.h2`
  color: ${(props) => props.theme.colors.primary};
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
