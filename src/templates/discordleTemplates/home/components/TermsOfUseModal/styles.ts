import { Row as AntdRow } from 'antd_components';
import styled from 'styled-components';

export const ModalTitle = styled(AntdRow)`
  color: ${(props) => props.theme.discordleColors.text};
  font-size: 18pt;
`;

export const Span = styled.span`
  color: ${(props) => props.theme.discordleColors.text};
  font-size: 12pt;
`;

export const Row = styled(AntdRow)`
  background-color: ${({ theme }) => theme.discordleColors.background};
  padding: 20px;
  border-radius: 8px;
  word-break: keep-all;
  margin: 0 auto 20px auto;
  text-align: left;

  @media screen and (max-width: 1500px) {
    width: 100%;
  }
`;

export const Title = styled.h2`
  margin-bottom: 10px;
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.discordleColors.background};
  border-radius: 8px;
  word-break: keep-all;
  height: 100%;
  padding: 12px;
`;

export const Description = styled.span`
  text-align: justify;
  font-size: 12pt;
`;
