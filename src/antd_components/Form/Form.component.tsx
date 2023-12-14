import React, { Fragment } from 'react';
import * as S from './styles';
import * as I from './IForm';

export default function Form({
  formHeader,
  children,
  width,
  heigth,
  form,
  onFinish,
}: I.IForm) {
  return (
    <S.Form
      layout="vertical"
      onFinish={onFinish}
      width={width}
      heigth={heigth}
      form={form}
    >
      <Fragment>{formHeader}</Fragment>

      {children}
    </S.Form>
  );
}
