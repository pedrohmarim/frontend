import React, { useState } from 'react';
import * as S from './styles';
import * as I from 'services/Login/ILoginService';
import { Form } from 'antd';
import LoginApi from 'services/Login';
import theme from 'globalStyles/theme';
import { useRouter } from 'next/router';
import { useMyContext } from 'Context';
import ImageLogin from 'assets/loginImg.png';
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
  Image,
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

  function onFinish(values: I.ILoginRequest) {
    LoginApi.Login(values).then(({ Token, Message }) => {
      if (!Token)
        return Notification.error({
          message: 'Erro!',
          description: Message,
          icon: <FeatherIcons icon="x" color="red" />,
          duration: 3.5,
        });

      updateLogin(Token);

      Notification.success({
        message: 'Sucesso!',
        description: Message,
        icon: <FeatherIcons icon="check" color="green" />,
        duration: 3.5,
      });

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
        width="40vw"
        breakpoint="xl"
        onBreakpoint={(broken) => setShowImage(broken)}
      >
        <Image
          src={ImageLogin.src}
          alt="Login_img"
          preview={false}
          height="100%"
          width="100%"
        />
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
            name="email"
            label="E-mail"
            rules={[requiredRules, emailRegex]}
          >
            <Input
              type="email"
              placeholder="E-mail"
              prefix={<FeatherIcons icon="mail" color="#cecfd3" size={18} />}
            />
          </Form.Item>

          <Form.Item name="password" label="Senha" rules={[requiredRules]}>
            <Input.Password
              type="password"
              placeholder="Senha"
              prefix={<FeatherIcons icon="lock" color="#cecfd3" size={18} />}
            />
          </Form.Item>

          <Row justify="space-between">
            <Checkbox>Lembrar senha</Checkbox>

            <S.HoverSpan onClick={toRecover}>Esqueci minha senha</S.HoverSpan>
          </Row>

          <Row justify="center">
            <Button
              htmlType="submit"
              margintop="20px"
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
