import styled from 'styled-components';
import { Row as RowAntd, Card as AntdCard } from 'antd_components';

export const Row = styled(RowAntd)<{ isMobile: boolean }>`
  max-width: ${({ isMobile }) => (isMobile ? '100%' : '65%')};
  margin: ${({ isMobile }) => (isMobile ? '0 25px 0 25px' : '0 auto 0 auto')};
  color: ${(props) => props.theme.discordleColors.text};
`;

export const Title = styled.h1`
  text-align: center;
  width: 100%;
`;

export const Description = styled.span`
  text-align: center;
  font-size: 12pt;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
`;

export const Card = styled(AntdCard)`
  height: 100%;
  background-color: #17171a;
  border: solid 1px rgba(255, 255, 255, 0.08);
  color: ${(props) => props.theme.discordleColors.text};
`;

export const CardImage = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const CardTitle = styled.h2`
  margin-top: 10px;
`;

export const CardDescription = styled.span``;
