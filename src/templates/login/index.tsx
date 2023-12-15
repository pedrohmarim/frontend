import React, { useState, useEffect } from 'react';
import * as S from './styles';
import * as I from 'services/Login/ILoginService';
import { Form } from 'antd';
import LoginApi from 'services/Login';
import theme from 'globalStyles/theme';
import { useRouter } from 'next/router';
import { useMyContext } from 'Context';
import Lottie from 'lottie-react';
import loginAnimation from 'assets/loginAnimation.json';
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
  Layout,
  Col,
  Divider,
} from 'antd_components';

export default function LoginContainer() {
  const [showImage, setShowImage] = useState(true);
  const { Sider, Content } = Layout;
  const { updateLogin } = useMyContext();
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const localStorageRememberMeDto =
        window.localStorage.getItem('rememberme');

      if (localStorageRememberMeDto) {
        const parsed: I.ILoginRequest = JSON.parse(localStorageRememberMeDto);

        console.log(parsed);

        form.setFieldsValue({
          Email: parsed.Email,
          Password: parsed.Password,
          Rememberme: true,
        });
      }
    }
  }, [form, router]);

  function handleRememberme(values: I.ILoginRequest) {
    window.localStorage.removeItem('rememberme');

    if (values.Rememberme) {
      const dto = {
        Email: values.Email,
        Password: values.Password,
      };

      window.localStorage.setItem('rememberme', JSON.stringify(dto));
    }
  }

  function onFinish(values: I.ILoginRequest) {
    LoginApi.Login(values).then(({ Token, Message }) => {
      if (!Token) return Notification.error(Message);

      handleRememberme(values);
      updateLogin(Token);

      Notification.success(Message);

      router.push('/home');
    });
  }

  function toRegister() {
    router.push('/register');
  }

  function toRecover() {
    router.push('/recoverpassword');
  }

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  };

  const siderStyle: React.CSSProperties = {
    backgroundColor: theme.colors.background,
    height: 'auto',
  };

  const formHeader: JSX.Element = (
    <Row gutter={[16, 16]} align="middle" justify="start">
      <Col>
        <S.HeaderSpan>Entre com</S.HeaderSpan>
      </Col>

      <Col>
        <S.SocialContainer>
          <FeatherIcons
            icon="facebook"
            size={25}
            color={theme.colors.textSecondary}
          />
        </S.SocialContainer>
      </Col>

      <Col>
        <S.SocialContainer>
          <FeatherIcons
            icon="twitter"
            size={25}
            color={theme.colors.textSecondary}
          />
        </S.SocialContainer>
      </Col>

      <Col>
        <S.SocialContainer>
          <FeatherIcons
            icon="linkedin"
            size={25}
            color={theme.colors.textSecondary}
          />
        </S.SocialContainer>
      </Col>

      <Divider style={{ borderColor: 'white' }}>
        <span>Ou</span>
      </Divider>
    </Row>
  );

  return (
    <Layout hasSider>
      <Sider
        hidden={showImage}
        style={siderStyle}
        width="50%"
        breakpoint="xl"
        onBreakpoint={(broken) => setShowImage(broken)}
      >
        <Lottie animationData={loginAnimation} />
      </Sider>

      <Content style={contentStyle}>
        <CustomizedForm
          formHeader={formHeader}
          onFinish={onFinish}
          width="100%"
          heigth="fit-content"
          form={form}
        >
          <Form.Item
            name="Email"
            label="E-mail"
            rules={[requiredRules, emailRegex]}
          >
            <Input
              type="email"
              placeholder="E-mail"
              prefix={
                <FeatherIcons
                  icon="mail"
                  color={theme.colors.textPrimary}
                  size={18}
                />
              }
            />
          </Form.Item>

          <Form.Item name="Password" label="Senha" rules={[requiredRules]}>
            <Input.Password
              placeholder="Senha"
              prefix={
                <FeatherIcons
                  icon="lock"
                  color={theme.colors.textPrimary}
                  size={18}
                />
              }
            />
          </Form.Item>

          <Row justify="space-between">
            <Form.Item name="Rememberme" valuePropName="checked">
              <Checkbox>Lembrar senha</Checkbox>
            </Form.Item>

            <S.HoverSpan onClick={toRecover}>Esqueci minha senha</S.HoverSpan>
          </Row>

          <Row justify="center">
            <Button
              htmlType="submit"
              marginbottom="20px"
              backgroundcolor={theme.colors.textPrimary}
              color={theme.colors.textSecondary}
            >
              Entrar
            </Button>
          </Row>

          <Row>
            Não possui uma conta?
            <S.RegisterButton onClick={toRegister}>Registrar</S.RegisterButton>
          </Row>
        </CustomizedForm>
      </Content>
    </Layout>
  );
}
