import styled from 'styled-components';
import { Button as AntDesignButton } from 'antd';
import { ButtonHTMLAttributes } from 'react';

type BtnProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'htmlType'> & {
  backgroundcolor?: string;
  width?: string;
  height?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
};

export const Button = styled(AntDesignButton)<BtnProps>`
  color: ${({ color }) => color} !important;
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  border: none;
  outline: none !important;
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  margin-top: ${({ marginTop }) => marginTop};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
  border-radius: 4px;
  font-weight: 500;
  font-size: 12pt;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  :disabled,
  &&:hover,
  &&:focus {
    background-color: ${({ backgroundcolor }) => backgroundcolor} !important;
    border: none;
    opacity: 0.9;
  }
`;
