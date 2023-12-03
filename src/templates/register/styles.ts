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
    color: ${(props) => props.theme.colors.textPurple};
    text-decoration: underline;
  }
`;

export const BackButton = styled.span`
  cursor: pointer;
  margin: 33.5px 0 0 15px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const SpanValidateEmail = styled.span`
  color: ${(props) => props.color || props.theme.colors.textPurple};
  font-size: 10pt;
`;
