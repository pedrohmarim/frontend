import styled from 'styled-components';
import { Card, Row } from 'antd_components';

export const MessageContainer = styled(Card)`
  padding: 40px;
  margin: 0 auto;
  font-size: 15pt;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  background-color: #17171a;
  border-radius: 4px;
  border-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 30px;
  position: relative;
  max-width: 65%;
`;

export const GameTitle = styled.h2`
  color: ${(props) => props.theme.colors.primary};
`;

export const Options = styled.div`
  position: absolute;
  margin: 18px 12px 0 0;
  height: 25px;
  right: 0;
  top: 0;
`;

export const OptionItem = styled(Row)`
  padding: 5px 15px;
  background-color: ${(props) => props.theme.colors.background};
  border: solid 1px rgba(255, 255, 255, 0.1);
  transition: all 0.2s;

  :hover {
    opacity: 0.9;
  }
`;

export const Hint = styled.span`
  margin: 2px 0 0 5px;
  font-size: 12pt;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
`;

export const MainMessageContainer = styled.div`
  border: solid 2px rgba(138, 0, 194, 0.4);
  box-shadow: 0px 0px 15px 15px rgba(255, 255, 255, 0.08);
  padding: 10px;
  border-radius: 4px;
  margin: 30px 0;
`;
