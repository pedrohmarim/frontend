import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { requiredRules } from 'antd_components/Form/formItem.rules.constants';
import theme from 'globalStyles/theme';
import { useRouter } from 'next/router';
import { FeatherIcons, Notification } from 'antd_components';
import { RuleObject } from 'antd/lib/form';
import * as S from './styles';
import RecoverPasswordApi from 'services/RecoverPassword';
import { Form as CustomizedForm, Input, Button, Row } from 'antd_components';
import {
  IResetPasswordRequest,
  IValidateResetPasswordTokenRequest,
} from 'services/RecoverPassword/IRecoverPasswordService';

export default function RecoverPasswordContainer() {
  const [token, setToken] = useState('');
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!router.isReady) return;
    const { token } = router.query;

    if (!token) {
      router.push('/login');
      return Notification.error('Token inválido!');
    }

    setToken(token?.toString());

    const dto: IValidateResetPasswordTokenRequest = {
      Token: token?.toString(),
    };

    RecoverPasswordApi.ValidateResetPasswordToken(dto).then(
      ({ Message, Success }) => {
        if (!Success && Message.length) {
          router.push('/login');
          return Notification.error(Message);
        }
      }
    );
  }, [router]);

  const formHeader: JSX.Element = (
    <Row justify="center">
      <S.FormHeaderTitle>Redefinição de Senha</S.FormHeaderTitle>
    </Row>
  );

  function validatePassword(
    _: RuleObject,
    value: string,
    callback: (error?: string) => void
  ) {
    const { ConfirmPassword } = form.getFieldsValue();

    if (ConfirmPassword && ConfirmPassword !== value)
      return Promise.reject('As senhas devem ser iguais.');

    return callback();
  }

  function validateConfirmPassword(
    _: RuleObject,
    value: string,
    callback: (error?: string) => void
  ) {
    const { Password } = form.getFieldsValue();

    if (Password && Password !== value)
      return Promise.reject('As senhas devem ser iguais.');

    return callback();
  }

  function onFinish(values: IResetPasswordRequest) {
    const dto: IResetPasswordRequest = {
      Token: token,
      Password: values.Password,
    };

    RecoverPasswordApi.ResetPassword(dto).then(({ Message, Success }) => {
      if (Success) {
        Notification.success(Message);
        router.push('/login');
      } else Notification.error(Message);
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
      <Form.Item
        name="Password"
        label="Nova Senha"
        rules={[requiredRules, { validator: validatePassword }]}
      >
        <Input.Password
          placeholder="Nova Senha"
          prefix={
            <FeatherIcons
              icon="lock"
              color={theme.colors.textPrimary}
              size={18}
            />
          }
        />
      </Form.Item>

      <Form.Item
        name="ConfirmPassword"
        label="Confirmar Nova Senha"
        rules={[requiredRules, { validator: validateConfirmPassword }]}
      >
        <Input.Password
          placeholder="Confirmar Nova Senha"
          prefix={
            <FeatherIcons
              icon="lock"
              color={theme.colors.textPrimary}
              size={18}
            />
          }
        />
      </Form.Item>

      <Button
        htmlType="submit"
        backgroundcolor={theme.colors.textPrimary}
        color={theme.colors.textSecondary}
        margintop="10px"
      >
        Confirmar
      </Button>

      <Button
        htmlType="button"
        backgroundcolor={theme.colors.textSecondary}
        color={theme.colors.textPrimary}
        margintop="10px"
        onClick={() => router.push('/login')}
      >
        Voltar
      </Button>
    </CustomizedForm>
  );
}
