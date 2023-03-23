import styled from 'styled-components';
import * as I from './IButton';
import { Button as AntDesignButton } from 'antd';

export const Button = styled(AntDesignButton)<I.IButton>`
  color: ${({ color }) => color} !important;
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  border: none;
  outline: none !important;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin: ${({ margin }) => margin};
  border-radius: 4px;
  font-weight: 400;
  font-size: 12pt;
  opacity: 1;
  display: flex;
  justify-content: center;
  box-shadow: ${({ boxshadow }) => boxshadow};
  align-items: center;

  &&:hover,
  &&:focus {
    color: ${({ color }) => color} !important;
    background-color: ${({ backgroundcolor }) => backgroundcolor};
    border: none;
    opacity: 0.9;
  }
`;
