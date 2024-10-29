import { Row } from 'antd_components';
import styled from 'styled-components';

export const ModalTitle = styled(Row)`
  color: ${(props) => props.theme.discordleColors.text};
  font-size: 18pt;
`;

export const Span = styled.span`
  color: ${(props) => props.theme.discordleColors.text};
  font-size: 12pt;
`;
