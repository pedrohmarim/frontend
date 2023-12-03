import React from 'react';
import * as S from './styles';
import { Form } from 'antd';
import { requiredRules } from 'antd_components/Form/formItem.rules.constants';
import theme from 'globalStyles/theme';
import { useRouter } from 'next/router';
import {
  Form as CustomizedForm,
  Input,
  Button,
  Row,
  Checkbox,
} from 'antd_components';

export default function LoginContainer() {
  const router = useRouter();

  function onFinish() {
    // UserApi.GetUser({ id: 1 }).then((data) => console.log(data));
  }

  function toRegister() {
    router.push('/register');
  }

  return (
    <S.FormContainer>
      <CustomizedForm
        title="Formulário Login"
        onFinish={onFinish}
        width="400px"
      >
        <Form.Item name="username" label="Usuário" rules={[requiredRules]}>
          <Input type="text" />
        </Form.Item>

        <Form.Item name="password" label="Senha" rules={[requiredRules]}>
          <Input type="password" />
        </Form.Item>

        <Row justify="space-between">
          <Checkbox>Lembrar senha</Checkbox>

          <S.HoverSpan>Esqueci minha senha</S.HoverSpan>
        </Row>

        <Button
          htmlType="submit"
          marginTop="20px"
          color={theme.colors.textPurple}
          backgroundcolor={theme.colors.mainBackground}
        >
          Entrar
        </Button>

        <Button
          onClick={toRegister}
          htmlType="button"
          backgroundcolor={theme.colors.textPurple}
          color={theme.colors.textWhite}
          marginTop="10px"
        >
          Registrar
        </Button>
      </CustomizedForm>
    </S.FormContainer>
  );
}
