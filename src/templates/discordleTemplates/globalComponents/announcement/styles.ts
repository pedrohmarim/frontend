import styled from 'styled-components';
import { Row as AntdRow } from 'antd_components';

export const Row = styled(AntdRow)`
  position: relative;
  color: ${(props) => props.theme.discordleColors.text};
  height: 100px;
  margin: 0 25px 20px 25px !important;
`;

export const Ins = styled.ins`
  display: block;
  height: 100%;
  width: 100%;
`;
