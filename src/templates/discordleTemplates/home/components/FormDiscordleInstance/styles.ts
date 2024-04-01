import { Row as AntdRow } from 'antd_components';
import styled from 'styled-components';

export const ReloadContainer = styled.div`
  color: ${(props) => props.theme.discordleColors.text};
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

export const NegativeMarginRow = styled(AntdRow)``;

export const Row = styled(AntdRow)``;

export const Description = styled.span<{
  fontSize: string;
  textAlign?: string;
}>`
  font-size: ${({ fontSize }) => fontSize};
  text-align: ${({ textAlign }) => textAlign};
`;
