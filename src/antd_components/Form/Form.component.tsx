import React from 'react';
import { Row, Divider } from 'antd';
import * as S from './styles';
import * as I from './IForm';

export default function Form({
  title,
  children,
  width,
  form,
  onFinish,
}: I.IForm) {
  return (
    <S.Form layout="vertical" onFinish={onFinish} width={width} form={form}>
      <Row justify="center">
        <S.FormTitle>{title}</S.FormTitle>
      </Row>

      <Divider style={{ borderColor: 'white', marginTop: '3px' }} />

      {children}
    </S.Form>
  );
}
