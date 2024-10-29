import { Row } from 'antd_components';
import styled from 'styled-components';

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.discordleColors.background};
  color: ${({ theme }) => theme.discordleColors.text};
  height: 40px;
  position: relative;
  padding: 0 20px;
  border-radius: 8px;
  border: solid 1px rgba(255, 255, 255, 0.05);
`;
