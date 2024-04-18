import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: ${(props) => props.theme.discordleColors.text};
  font-size: 12pt;
`;

export const Span = styled.span`
  margin-right: 5px;
`;
