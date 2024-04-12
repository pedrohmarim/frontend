import styled, { css } from 'styled-components';
import {
  Row,
  Carousel as CarouselAntd,
  Avatar as AvatarAntd,
} from 'antd_components';

export const Title = styled.div<{ isHint: boolean }>`
  text-align: left;
  font-size: 13pt;
  font-weight: 100;
  margin-bottom: 5px;

  ${({ isHint }) => {
    if (isHint) {
      return css`
        margin-bottom: -33px;
      `;
    }
  }}
`;

export const ReferencedMessageContainer = styled.div<{ width: number }>`
  margin-top: 5px;
  text-align: left;
  opacity: 0.85;
  max-width: ${({ width }) => (width < 625 ? width - 99 + 'px' : '603px')};
`;

export const HintAuthorUsername = styled.span`
  margin-left: 5px;
`;

export const ReferecendMessageContent = styled.div<{ width: number }>`
  overflow-x: auto;
  max-width: ${({ width }) => (width < 625 ? width - 80 + 'px' : '625px')};
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AuthorContainer = styled(Row)`
  background-color: ${(props) => props.theme.discordleColors.background};
  border-bottom: solid 1px rgba(255, 255, 255, 0.05);
  padding: 6px;
`;

export const Avatar = styled(AvatarAntd)`
  margin-left: 5px;
`;

export const DefaultContent = styled.div`
  padding: 8px;

  a {
    color: blueviolet !important;
  }
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
