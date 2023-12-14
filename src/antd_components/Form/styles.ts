import styled from 'styled-components';
import { Form as FormComponent } from 'antd';

export const Form = styled(FormComponent)<{ width: string; heigth?: string }>`
  padding: 20px;
  color: ${(props) => props.theme.colors.textSecondary};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  width: ${(props) => props.width};
  height: ${(props) => props.heigth};
  position: relative;
`;
