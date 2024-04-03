import styled from 'styled-components';
import * as I from './IButton';
import { Button as AntDesignButton } from 'antd';

export const Button = styled(AntDesignButton)<I.IButton>`
  color: ${({ color }) => color} !important;
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  border: none;
  outline: none !important;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  border-radius: 4px;
  font-weight: 500;
  font-size: 12pt;
  opacity: 1;
  display: flex;
  justify-content: center;
  box-shadow: ${({ boxshadow }) => boxshadow};
  align-items: center;

  &&:hover,
  &&:focus {
    color: ${({ color }) => color} !important;
    background-color: ${({ backgroundcolor }) => backgroundcolor} !important;
    border: none;
    opacity: 0.9;
  }
`;
