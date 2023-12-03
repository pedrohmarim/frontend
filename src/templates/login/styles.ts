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
