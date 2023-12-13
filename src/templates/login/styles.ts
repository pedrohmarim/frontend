import styled from 'styled-components';

export const RegisterButton = styled.span`
  margin-left: 7px;
  color: ${(props) => props.theme.colors.textPrimary};

  &&:hover {
    transition: all 0.2s;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const HoverSpan = styled.span`
  cursor: pointer;

  &&:hover {
    transition: all 0.2s;
    color: ${(props) => props.theme.colors.textPrimary};
    text-decoration: underline;
  }
`;

export const SocialContainer = styled.div`
  background-color: ${(props) => props.theme.colors.textPrimary};
  height: fit-content;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;

  &&:hover {
    transition: all 0.2s;
    opacity: 0.8;
  }
`;

export const HeaderSpan = styled.span`
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: 500;
`;
