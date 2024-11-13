import styled from 'styled-components';

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !['ismobile'].includes(prop),
})<{ ismobile: boolean }>`
  width: ${({ ismobile }) => (ismobile ? '100%' : '40%')};
  margin: auto;
  color: ${(props) => props.theme.discordleColors.text};
  background-color: #17171a;
  border-radius: 8px;
  padding: 15px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;
