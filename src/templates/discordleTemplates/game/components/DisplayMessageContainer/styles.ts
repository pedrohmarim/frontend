import styled from 'styled-components';
import { Row, Carousel as CarouselAntd } from 'antd_components';

export const Title = styled.div<{ marginTop?: string }>`
  text-align: left;
  font-size: 13pt;
  font-weight: 100;
  margin-bottom: 5px;
  margin-top: ${({ marginTop }) => marginTop};
`;

export const Message = styled.div`
  padding: 8px 8px 5px 8px;
  text-align: left;
  font-size: 12pt;
  font-weight: 1;
  background-color: ${(props) => props.theme.discordleColors.background};
  word-break: break-all;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.discordleColors.background};
`;

export const Date = styled(Row)`
  font-size: 11pt;
  margin-top: 12px;
`;

export const Carousel = styled(CarouselAntd)<{ cursor: string }>`
  cursor: ${({ cursor }) => cursor};

  img {
    object-fit: contain;
  }
`;
