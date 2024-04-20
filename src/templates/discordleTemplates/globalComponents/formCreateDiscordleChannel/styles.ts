import styled from 'styled-components';
import { Row as AntdRow } from 'antd_components';

export const ButtonContainer = styled.div<{ fromGame: boolean }>`
  position: absolute;
  right: ${({ fromGame }) => (!fromGame ? '-15px' : '8px')};
  top: ${({ fromGame }) => (!fromGame ? '72px' : '120px')};
`;

export const Row = styled(AntdRow)`
  color: ${(props) => props.theme.discordleColors.text};
  margin-bottom: 10px;
`;
