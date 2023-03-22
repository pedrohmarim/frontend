import styled from 'styled-components';
import { Tabs as TabsAntd } from 'antd_components';

export const Tabs = styled(TabsAntd)`
  color: ${(props) => props.theme.colors.text};
`;

export const TabsPane = styled(TabsAntd.TabPane)``;
