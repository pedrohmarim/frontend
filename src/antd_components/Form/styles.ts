import styled from 'styled-components';
import { Form as FormComponent } from 'antd';

export const Form = styled(FormComponent)<{ width: string }>`
  padding: 20px;
  color: ${(props) => props.theme.colors.textWhite};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.primary};
  width: ${(props) => props.width};
  position: relative;
`;

export const FormTitle = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.colors.textPurple};
  font-size: 25pt;
`;
