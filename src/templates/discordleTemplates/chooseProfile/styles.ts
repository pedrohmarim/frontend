import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px 5px 15px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.discordleColors.background};
  width: fit-content;
  border: solid 1px rgba(255, 255, 255, 0.1);
  transition: all 0.2s;
  scale: calc(0.9);
  min-width: 180px;
  max-width: 180px;

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

export const InvalidText = styled.span`
  color: red;
  opacity: 0.75;
  font-weight: 400;
`;

export const MemberRow = styled.div`
  margin: -20px 0 -5px 0;
  overflow-x: auto;
  padding: 15px;
  display: flex;
  scroll-snap-type: x mandatory;
  transition: scroll-left 0.5s ease-out;

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.discordleColors.text};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.discordleColors.primary};
  }
`;
