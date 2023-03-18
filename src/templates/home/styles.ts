import styled from 'styled-components';
import { Row as RowAntd } from 'antd_components';

export const ColumnContainer = styled.div`
  flex-direction: column;
  text-align: center;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.text};
`;

export const Description = styled.span`
  color: ${(props) => props.theme.colors.text};
`;

export const Row = styled(RowAntd)`
  margin-top: 20px;
`;
