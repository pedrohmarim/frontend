import React, { Fragment, useState, useEffect } from 'react';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import * as S from './styles';
import theme from 'globalStyles/theme';
import RecoverPasswordApi from 'services/RecoverPassword';
import ReactCodeInput from 'react-verification-code-input';
import {
  ISendChangePasswordUrlRequest,
  ISendCodeToEmailRequest,
} from 'services/RecoverPassword/IRecoverPasswordService';
import {
  emailRegex,
  requiredRules,
} from 'antd_components/Form/formItem.rules.constants';
import {
  Form as CustomizedForm,
  Row,
  FeatherIcons,
  Input,
  Button,
  Notification,
  Col,
} from 'antd_components';

export default function RecoverPasswordContainer() {
  const [email, setEmail] = useState<string>('');
  const router = useRouter();
  const [form] = Form.useForm();
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [codeInputState, setCodeInputState] = useState({
    loading: false,
    disabled: false,
    leftTime: 0,
  });

  function returnNotification(message: string, success: boolean) {
    return Notification.success({
      message: success ? 'Succeso!' : 'Erro',
      description: message,
      icon: success ? (
        <FeatherIcons icon="check" color="green" />
      ) : (
        <FeatherIcons icon="x" color="red" />
      ),
      duration: 5,
    });
  }

  useEffect(() => {
    if (codeInputState.leftTime == 0) return;

    const timer = setInterval(() => {
      setCodeInputState((prevState) => {
        if (prevState.leftTime > 0) {
          return {
            ...prevState,
            leftTime: prevState.leftTime - 1,
            disabled: prevState.leftTime - 1 !== 0,
          };
        } else {
          clearInterval(timer);
          return prevState;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [codeInputState.leftTime]);

  function onComplete(code: string) {
    setCodeInputState((prevState) => ({
      ...prevState,
      disabled: true,
    }));

    const dto: ISendChangePasswordUrlRequest = { Code: code, Email: email };

    RecoverPasswordApi.SendChangePasswordUrlToEmail(dto)
      .then(({ Message, Success }) => {
        setCodeInputState({
          disabled: false,
          loading: false,
          leftTime: Success ? 0 : 10,
        });

        returnNotification(Message, Success);

        if (Success) router.push('/login');
      })
      .catch(() =>
        setCodeInputState({
          disabled: false,
          loading: false,
          leftTime: 10,
        })
      );
  }

  const formHeader: JSX.Element = (
    <Fragment>
      {!showCodeInput && (
        <Col span={24}>
          <Row justify="center">
            <S.FormHeaderTitle>Verificação de E-mail</S.FormHeaderTitle>
          </Row>

          <Row justify="center">
            <S.RecoverDescription>
              Informe abaixo seu e-mail
            </S.RecoverDescription>
          </Row>
        </Col>
      )}

      {showCodeInput && (
        <Col span={24}>
          <Row justify="center">
            <S.FormHeaderTitle>Recuperação de Senha</S.FormHeaderTitle>
          </Row>

          <Row justify="center">
            <S.RecoverDescription>
              Informe abaixo o código que foi enviado no e-mail
            </S.RecoverDescription>
          </Row>
        </Col>
      )}
    </Fragment>
  );

  function onFinish(values: ISendCodeToEmailRequest) {
    setEmail(values.Email);

    RecoverPasswordApi.SendCodeToEmail(values).then(({ Message, Success }) => {
      setShowCodeInput(true);

      return returnNotification(Message, Success);
    });
  }

  return (
    <CustomizedForm
      formHeader={formHeader}
      onFinish={onFinish}
      width="450px"
      heigth="fit-content"
      form={form}
    >
      <Fragment>
        {!showCodeInput && (
          <Fragment>
            <Form.Item
              name="Email"
              label="E-mail"
              rules={[requiredRules, emailRegex]}
            >
              <Input type="email" placeholder="E-mail" />
            </Form.Item>

            <Button
              htmlType="submit"
              backgroundcolor={theme.colors.textPrimary}
              color={theme.colors.textSecondary}
            >
              Enviar código
            </Button>
          </Fragment>
        )}

        {showCodeInput && (
          <Row justify="center">
            <ReactCodeInput
              className="codeInput"
              onComplete={onComplete}
              loading={codeInputState.loading}
              disabled={codeInputState.disabled}
            />

            {codeInputState.leftTime > 0 && (
              <S.SecondsCOntainer>
                Aguarde{' '}
                <S.SecondsSpan>
                  {codeInputState.leftTime} segundo(s){' '}
                </S.SecondsSpan>
                antes de tentar novamente
              </S.SecondsCOntainer>
            )}
          </Row>
        )}

        <Row justify="center">
          <Button
            htmlType="button"
            backgroundcolor={theme.colors.textSecondary}
            color={theme.colors.textPrimary}
            margintop="20px"
            onClick={() => router.push('/login')}
          >
            Voltar
          </Button>
        </Row>
      </Fragment>
    </CustomizedForm>
  );
}
