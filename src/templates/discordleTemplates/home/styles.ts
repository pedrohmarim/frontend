import styled from 'styled-components';
import { Row as RowAntd, Button as AntdButton } from 'antd_components';

export const ColumnContainer = styled.div`
  flex-direction: column;
  width: 40%;
  text-align: center;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.discordleColors.text};
`;

export const Label = styled.span`
  font-size: 13pt;
`;
export const LoadingText = styled.span`
  color: ${(props) => props.theme.discordleColors.primary};
  margin-left: 10px;
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

export const NewHighlight = styled.div`
  color: red;
  margin-left: 5px;
  font-weight: 500;
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
