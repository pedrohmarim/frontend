import styled from 'styled-components';
import { Row as RowAntd, Button as AntdButton } from 'antd_components';

export const ColumnContainer = styled.div`
  flex-direction: column;
  width: 40%;
  text-align: center;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.text};
`;

export const Description = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: 13pt;
`;

export const Label = styled.span`
  font-size: 13pt;
`;
export const LoadingText = styled.span`
  color: ${(props) => props.theme.colors.primary};
  margin-left: 10px;
`;

export const Row = styled(RowAntd)``;

export const MarginRow = styled(RowAntd)`
  margin-top: 25px;
`;

export const Button = styled(AntdButton)`
  color: ${(props) => props.theme.colors.text};
`;
