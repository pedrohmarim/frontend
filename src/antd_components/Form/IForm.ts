import { FormInstance } from 'antd';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IForm {
  title: string;
  width: string;
  children: JSX.Element | string | JSX.Element[];
  form: FormInstance<any>;
  onFinish: (data: any) => void;
}
