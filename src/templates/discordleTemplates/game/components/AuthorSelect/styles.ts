import styled from 'styled-components';
import { Select as SelectAntd } from 'antd_components';

export const Select = styled(SelectAntd)<{
  isMobile: boolean;
  usedHint: boolean;
}>`
  margin-top: ${({ usedHint }) => (usedHint ? '30px' : '0px')};
  width: ${({ isMobile }) => (isMobile ? '100%' : '300px')};

  @media screen and (max-width: 350px) {
    width: 100%;
  }
`;

export const AuthorName = styled.span`
  white-space: nowrap;
  width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
  font-size: 13pt;
  font-weight: 500;
  text-align: left;
  color: #000;
`;

export const AuthorHighlight = styled.span`
  color: #8a00c2;
  font-weight: 500;
`;
