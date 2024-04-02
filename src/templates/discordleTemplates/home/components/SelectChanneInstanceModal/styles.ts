import { Row, List } from 'antd_components';
import styled from 'styled-components';

export const ModalTitle = styled(Row)`
  color: ${(props) => props.theme.discordleColors.text};
  font-size: 18pt;
`;

export const ChannelName = styled.span`
  width: 40%;
`;

export const SpanList = styled.span`
  color: ${(props) => props.theme.discordleColors.primary};
  font-weight: bold;
  display: none;
`;

export const ListItem = styled(List.Item)`
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: ${(props) => props.theme.discordleColors.text} !important;
  padding: 10px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
    background-color: rgba(255, 255, 255, 0.03);

    & ${SpanList} {
      display: block;
    }
  }
`;

export const ListItemMeta = styled(List.Item.Meta)`
  .ant-list-item-meta-title {
    color: ${(props) => props.theme.discordleColors.text} !important;
  }
`;

export const RowContainer = styled(Row)`
  height: 33px;
`;

export const EmptyContent = styled(Row)`
  color: ${(props) => props.theme.discordleColors.text} !important;
`;

export const Description = styled.span<{
  fontSize?: string;
  fontStyle?: string;
}>`
  text-align: center;
  color: ${(props) => props.theme.discordleColors.text};
  font-size: ${({ fontSize }) => fontSize};
  font-style: ${({ fontStyle }) => fontStyle};
`;
