import React from 'react';
import * as S from './styles';
import * as I from 'services/Login/ILoginService';
import { Form } from 'antd';
import LoginApi from 'services/Login';
import {
  emailRegex,
  requiredRules,
} from 'antd_components/Form/formItem.rules.constants';
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
  const [form] = Form.useForm();
  const router = useRouter();

  function onFinish(values: I.ILoginRequest) {
    LoginApi.Login(values).then((data) => console.log(data));
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
        form={form}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[requiredRules, emailRegex]}
        >
          <Input type="email" />
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
