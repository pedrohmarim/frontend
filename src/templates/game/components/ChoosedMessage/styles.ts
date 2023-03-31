import styled from 'styled-components';
import { Row } from 'antd_components';

export const GameTitle = styled.h2`
  color: ${(props) => props.theme.colors.primary};
`;

export const BiggerGameTitle = styled.h1`
  color: ${(props) => props.theme.colors.primary};
`;

export const Options = styled.div`
  position: absolute;
  height: 25px;
  right: 0;
  top: 0;
`;

export const ScoreContainer = styled(Row)`
  color: ${(props) => props.theme.colors.text};
  font-size: 11pt;
  position: absolute;
  margin-top: 15px;
  height: 25px;
  left: 0;
  top: 0;
`;

export const ScoreText = styled.span`
  margin-top: -1px;
  margin-left: 4px;
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

export const ServerName = styled.span`
  margin-top: 2px;
  margin-left: 8px;
`;

export const MainMessageContainer = styled.div`
  border: solid 2px rgba(138, 0, 194, 0.4);
  box-shadow: 0px 0px 15px 15px rgba(255, 255, 255, 0.08);
  padding: 10px;
  border-radius: 4px;
  margin: 30px 0;
`;

export const PaddingContainer = styled.div`
  padding: 50px 0;
`;
