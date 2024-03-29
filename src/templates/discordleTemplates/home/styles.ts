import styled from 'styled-components';
import { Row as RowAntd, Button as AntdButton } from 'antd_components';

export const Title = styled.h1`
  color: ${(props) => props.theme.discordleColors.text};
`;

export const Row = styled(RowAntd)`
  margin-top: 20px;
`;

export const NegativeMarginRow = styled(RowAntd)`
  margin-right: -30px;
`;

export const MarginRow = styled(RowAntd)`
  margin-top: 25px;
`;

export const Button = styled(AntdButton)`
  color: ${(props) => props.theme.discordleColors.text};
`;

export const ReloadContainer = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

export const Description = styled.span<{
  fontSize?: string;
  textAlign?: string;
  fontStyle?: string;
}>`
  color: ${(props) => props.theme.discordleColors.text};
  text-align: ${({ textAlign }) => textAlign};
  font-size: ${({ fontSize }) => fontSize || '13pt'};
  font-style: ${({ fontStyle }) => fontStyle || 'normal'};
  font-weight: normal;
`;
