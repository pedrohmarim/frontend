import { FormInstance } from 'antd';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IForm {
  formHeader?: JSX.Element | string | JSX.Element[];
  width: string;
  heigth?: string;
  children: JSX.Element | string | JSX.Element[];
  form: FormInstance<any>;
  onFinish: (data: any) => void;
}
