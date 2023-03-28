import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px 5px 15px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.background};
  width: fit-content;
  border: solid 1px rgba(255, 255, 255, 0.1);
  transition: all 0.2s;
  scale: calc(0.9);

  :hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.08);
    scale: calc(1);
  }
`;

export const Username = styled.span`
  margin-top: 10px;
  font-size: 14pt;
`;
