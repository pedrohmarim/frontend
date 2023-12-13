import React from 'react';
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
      {formHeader && <S.FormHeader>{formHeader}</S.FormHeader>}

      {children}
    </S.Form>
  );
}
