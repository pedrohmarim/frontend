import styled from 'styled-components';

export const SwitchDescriptionContainer = styled.div`
  color: ${(props) => props.theme.discordleColors.text};
  font-size: 12pt;
  display: flex;
  align-items: center;
`;

export const SwitchDescription = styled.div<{ width: string }>`
  margin-right: 5px;
  max-width: ${({ width }) => width};
`;
