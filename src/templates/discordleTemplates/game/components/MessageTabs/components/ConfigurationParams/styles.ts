import styled from 'styled-components';

export const SwitchDescription = styled.span<{ margin?: string }>`
  color: ${(props) => props.theme.discordleColors.text};
  font-size: 12pt;
  margin: ${({ margin }) => margin};
`;
