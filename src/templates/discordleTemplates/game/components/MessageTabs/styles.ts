import styled from 'styled-components';
import { Tabs as TabsAntd, Row } from 'antd_components';

export const Tabs = styled(TabsAntd)`
  color: ${(props) => props.theme.discordleColors.text};
`;

export const TabsPane = styled(TabsAntd.TabPane)``;

export const MessageTabTitle = styled.span`
  margin-top: -1px;
  margin-left: 4px;
`;

export const OptionItem = styled(Row)`
  padding: 5px 15px;
  background-color: ${(props) => props.theme.discordleColors.background};
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
  color: ${(props) => props.theme.discordleColors.text};
`;

export const SwitchDescription = styled.span`
  color: ${(props) => props.theme.discordleColors.text};
  font-size: 12pt;
  margin-left: 10px;
`;

export const ModalTitle = styled.span`
  color: ${(props) => props.theme.discordleColors.text};
  font-size: 20pt;
  margin-left: 10px;
  margin-right: 10px;
`;
