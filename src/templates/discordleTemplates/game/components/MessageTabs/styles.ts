import styled from 'styled-components';
import { Tabs as TabsAntd } from 'antd_components';

export const Tabs = styled(TabsAntd)`
  color: ${(props) => props.theme.discordleColors.text};
`;

export const TabsPane = styled(TabsAntd.TabPane)``;

export const MessageTabTitle = styled.span`
  margin-top: -1px;
  margin-left: 4px;
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
