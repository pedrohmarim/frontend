import styled from 'styled-components';

export const ContainerWrapper = styled.div<{ isAnimationActive: boolean }>`
  padding-bottom: 20px;
  overflow: ${({ isAnimationActive }) =>
    isAnimationActive ? 'hidden' : 'visible'};
`;
