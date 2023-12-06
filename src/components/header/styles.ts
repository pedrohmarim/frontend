import { Avatar as AvatarAntd } from 'antd_components';
import styled from 'styled-components';

export const Header = styled.div`
  padding: 0 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.primary} !important;
  height: 65px;
  max-height: 65px;
`;

export const Avatar = styled(AvatarAntd)`
  cursor: pointer;
`;
