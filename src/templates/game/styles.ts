import styled from 'styled-components';
import { Tabs as TabsAntd } from 'antd_components';

export const ColumnContainer = styled.div`
  flex-direction: column;
  text-align: center;
  max-height: 90%;
  max-width: 35%;
  min-width: 35%;
`;

export const Tabs = styled(TabsAntd)`
  color: ${(props) => props.theme.colors.text};
`;

export const TabsPane = styled(TabsAntd.TabPane)``;
