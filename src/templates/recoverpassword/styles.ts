import styled from 'styled-components';

export const FormHeaderTitle = styled.span`
  font-size: 30pt;
  color: ${(props) => props.theme.colors.textPrimary};
`;

export const RecoverDescription = styled.span`
  color: ${(props) => props.theme.colors.textSecondary};
  opacity: 0.8;
  font-weight: 300;
  margin-bottom: 20px;
`;

export const SecondsCOntainer = styled.div`
  margin-top: 20px;
`;

export const SecondsSpan = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.colors.textPrimary};
`;
