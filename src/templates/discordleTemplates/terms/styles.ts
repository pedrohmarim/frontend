import styled from 'styled-components';
import { Row as AntdRow } from 'antd_components';

export const Row = styled(AntdRow)`
  background-color: ${({ theme }) => theme.discordleColors.background};
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  word-break: keep-all;
  margin: 0 auto 20px auto;
  text-align: left;
`;

export const PageTitle = styled.h4`
  word-break: keep-all;
  line-height: 30px;
  margin-bottom: 20px !important;
`;

export const Title = styled.h1`
  margin-bottom: 10px;
`;

export const Description = styled.span``;
