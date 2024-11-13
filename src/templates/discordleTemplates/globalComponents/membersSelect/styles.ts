import styled from 'styled-components';

export const Span = styled.span`
  color: ${(props) => props.theme.discordleColors.text};
  background-color: ${(props) => props.theme.discordleColors.primary};
`;

export const Username = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  font-size: 12pt;
`;
