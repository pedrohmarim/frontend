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
