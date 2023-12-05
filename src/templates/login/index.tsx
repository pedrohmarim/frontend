import React from 'react';
import * as S from './styles';
import * as I from 'services/Login/ILoginService';
import { Form } from 'antd';
import LoginApi from 'services/Login';
import theme from 'globalStyles/theme';
import { useRouter } from 'next/router';
import { useMyContext } from 'Context';
import {
  emailRegex,
  requiredRules,
} from 'antd_components/Form/formItem.rules.constants';
import {
  Form as CustomizedForm,
  Input,
  Button,
  Row,
  Checkbox,
  Notification,
  FeatherIcons,
} from 'antd_components';

export default function LoginContainer() {
  const { updateLoggedUser } = useMyContext();
  const [form] = Form.useForm();
  const router = useRouter();

  function onFinish(values: I.ILoginRequest) {
    LoginApi.Login(values).then(({ Token, Message, LoginGetDto }) => {
      if (!LoginGetDto)
        return Notification.error({
          message: 'Erro!',
          description: Message,
          icon: <FeatherIcons icon="x" color="red" />,
          duration: 3.5,
        });

      window.localStorage.setItem('token', Token);

      updateLoggedUser(Token);

      Notification.success({
        message: 'Logado com sucesso!',
        icon: <FeatherIcons icon="check" color="green" />,
        duration: 3.5,
      });

      router.push('/home');
    });
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
