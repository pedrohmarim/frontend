import styled from 'styled-components';
import {
  Row,
  Carousel as CarouselAntd,
  Avatar as AvatarAntd,
} from 'antd_components';

export const Title = styled.div<{ marginTop?: string }>`
  text-align: left;
  font-size: 13pt;
  font-weight: 100;
  margin-bottom: 5px;
  margin-top: ${({ marginTop }) => marginTop};
`;

export const ReferencedMessageContainer = styled.div`
  margin-top: 5px;
  text-align: left;
  opacity: 0.85;
`;

export const SpanWithMarginLeft = styled.span`
  margin-left: 5px;
`;

export const AuthorContainer = styled(Row)`
  background-color: ${(props) => props.theme.discordleColors.background};
  border-bottom: solid 1px rgba(255, 255, 255, 0.05);
  padding: 3px;
`;

export const Avatar = styled(AvatarAntd)`
  margin-left: 5px;
`;

export const DefaultContent = styled.div`
  padding: 3px 6px 6px 6px !important;
`;

export const Message = styled.div`
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
  margin-top: 10px;
`;

export const Carousel = styled(CarouselAntd)<{ cursor: string }>`
  cursor: ${({ cursor }) => cursor};

  img {
    object-fit: contain;
  }
`;
