import styled from 'styled-components';

export const RecoverContainer = styled.div``;

export const RecoverTitle = styled.span`
  font-size: 26.5pt;
  color: ${(props) => props.theme.colors.textPrimary};
`;

export const RecoverDescription = styled.span`
  color: ${(props) => props.theme.colors.textSecondary};
  opacity: 0.8;
  font-weight: 300;
`;

export const BackButton = styled.span`
  cursor: pointer;
  margin: 33.5px 0 0 -15px;
  position: absolute;
  top: 0;
  left: 0;
`;
