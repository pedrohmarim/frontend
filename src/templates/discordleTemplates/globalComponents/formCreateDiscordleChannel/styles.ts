import styled from 'styled-components';

export const ButtonContainer = styled.div<{ fromGame: boolean }>`
  position: absolute;
  right: ${({ fromGame }) => (!fromGame ? '-15px' : '8px')};
  top: ${({ fromGame }) => (!fromGame ? '32px' : '120px')};
`;
