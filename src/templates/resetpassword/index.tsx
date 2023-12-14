import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { requiredRules } from 'antd_components/Form/formItem.rules.constants';
import theme from 'globalStyles/theme';
import { useRouter } from 'next/router';
import { Notification } from 'antd_components';
import { RuleObject } from 'antd/lib/form';
import * as S from './styles';
import RecoverPasswordApi from 'services/RecoverPassword';
import {
  IResetPasswordRequest,
  IValidateResetPasswordTokenRequest,
} from 'services/RecoverPassword/IRecoverPasswordService';
import {
  Form as CustomizedForm,
  Input,
  Button,
  FeatherIcons,
  Row,
} from 'antd_components';

export default function RecoverPasswordContainer() {
  const [secretKey, setSecretKey] = useState('');
  const router = useRouter();
  const [form] = Form.useForm();

  function returnNotification(message: string, succes: boolean) {
    return Notification.success({
      message: succes ? 'Succeso!' : 'Erro',
      description: message,
      icon: succes ? (
        <FeatherIcons icon="check" color="green" />
      ) : (
        <FeatherIcons icon="x" color="red" />
      ),
      duration: 3.5,
    });
  }

  useEffect(() => {
    if (!router.isReady) return;
    const { token, hash } = router.query;

    if (!token || !hash) {
      router.push('/login');
      return returnNotification('Token inválido!', false);
    }

    setSecretKey(hash?.toString());

    const dto: IValidateResetPasswordTokenRequest = {
      Token: token?.toString(),
      SecretKey: hash?.toString(),
    };

    RecoverPasswordApi.ValidateResetPasswordToken(dto).then(
      ({ Message, Success }) => {
        if (!Success && Message.length) {
          router.push('/login');
          return returnNotification(Message, Success);
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
      SecretKey: secretKey,
      Password: values.Password,
    };

    RecoverPasswordApi.ResetPassword(dto).then(({ Message, Success }) => {
      router.push('/login');
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
      <Form.Item
        name="Password"
        label="Nova Senha"
        rules={[requiredRules, { validator: validatePassword }]}
      >
        <Input type="password" placeholder="Nova Senha" />
      </Form.Item>

      <Form.Item
        name="ConfirmPassword"
        label="Confirmar Nova Senha"
        rules={[requiredRules, { validator: validateConfirmPassword }]}
      >
        <Input type="password" placeholder="Confirmar Nova Senha" />
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
