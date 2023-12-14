import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const HoverSpan = styled.span`
  cursor: pointer;

  &&:hover {
    transition: all 0.2s;
    color: ${(props) => props.theme.colors.textPrimary};
    text-decoration: underline;
  }
`;

export const SpanValidateEmail = styled.span`
  color: ${(props) => props.color || props.theme.colors.textPrimary};
  font-size: 10pt;
`;

export const FormHeaderTitle = styled.span`
  font-size: 25pt;
  margin-bottom: 15px;
  font-weight: 500;
  color: ${(props) => props.color || props.theme.colors.textPrimary};
`;
