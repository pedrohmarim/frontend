import styled from "styled-components";
import { Spin as AntDesignSpin } from "antd";

export const Spin = styled(AntDesignSpin)`
  position: fixed;
  top: 0;
  width: 100%;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
`;

export const SpinTip = styled.p`
  font-weight: 500;
  font-size: 11pt;
  padding-top: 1.5vh;
`;
