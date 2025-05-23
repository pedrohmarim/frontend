import React, { useCallback, useState } from 'react';
import * as S from './styles';
import { Form } from 'antd';
import { requiredRules } from 'antd_components/Form/formItem.rules.constants';
import AccountApi from 'services/Account';
import theme from 'globalStyles/theme';
import { useRouter } from 'next/router';
import * as I from '../../services/Account/IAccountService';
import { FeatherIcons, Notification } from 'antd_components';
import { RuleObject } from 'antd/lib/form';
import { Form as CustomizedForm, Input, Button, Row } from 'antd_components';

export default function RegisterContainer() {
  const [form] = Form.useForm();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [validationState, setValidationState] = useState({
    message: '',
    isValid: false,
  });

  function onFinish(values: I.ICreateAccountRequest) {
    if (!validationState.isValid) return;

    AccountApi.CreateAccount(values).then(({ Message, Success }) => {
      if (!Success) return Notification.error(Message);

      form.resetFields();
      Notification.success(Message);
      router.push('/login');
    });
  }

  const handleDebouncedSearch = useCallback(async (email: string) => {
    setLoading(true);

    setTimeout(() => {
      AccountApi.ValidateEmail(email)
        .then(({ IsValid, Message }) =>
          setValidationState({ isValid: IsValid, message: Message })
        )
        .catch(() =>
          setValidationState({ message: 'Erro ao validar.', isValid: false })
        )
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  const debounce = useCallback(
    (func: (value: string) => void, delay: number) => {
      let timerId: NodeJS.Timeout;

      return function (value: string) {
        if (timerId) clearTimeout(timerId);

        timerId = setTimeout(() => {
          func(value);
        }, delay);
      };
    },
    []
  );

  const debouncedSearch = debounce(handleDebouncedSearch, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value === '' || !value) {
      setValidationState({ message: '', isValid: false });
      return;
    }

    debouncedSearch(value);
  };

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

  const formHeader = (
    <Row justify="center">
      <S.FormHeaderTitle>Formulário Registro</S.FormHeaderTitle>
    </Row>
  );

  return (
    <CustomizedForm
      form={form}
      formHeader={formHeader}
      onFinish={onFinish}
      width="400px"
    >
      <Form.Item name="Username" label="Nome Completo" rules={[requiredRules]}>
        <Input
          type="text"
          placeholder="Nome Completo"
          prefix={
            <FeatherIcons
              icon="user"
              color={theme.colors.textPrimary}
              size={18}
            />
          }
        />
      </Form.Item>

      <Form.Item
        name="Email"
        label="E-mail"
        rules={[requiredRules]}
        validateStatus={loading ? 'validating' : ''}
        help={
          loading ? (
            <S.SpanValidateEmail>Validando E-mail...</S.SpanValidateEmail>
          ) : !loading && validationState.message.length > 0 ? (
            <S.SpanValidateEmail
              color={validationState.isValid ? 'lightgreen' : 'red'}
            >
              {validationState.message}
            </S.SpanValidateEmail>
          ) : null
        }
      >
        <Input
          type="email"
          placeholder="E-mail"
          onChange={handleInputChange}
          prefix={
            <FeatherIcons
              icon="mail"
              color={theme.colors.textPrimary}
              size={18}
            />
          }
        />
      </Form.Item>

      <Form.Item
        name="Birthday"
        label="Data Nascimento"
        rules={[requiredRules]}
      >
        <Input
          type="date"
          placeholder="Data Nascimento"
          prefix={
            <FeatherIcons
              icon="calendar"
              color={theme.colors.textPrimary}
              size={18}
            />
          }
        />
      </Form.Item>

      <Form.Item
        name="Password"
        label="Senha"
        rules={[requiredRules, { validator: validatePassword }]}
      >
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

      <Form.Item
        name="ConfirmPassword"
        label="Confirmar Senha"
        rules={[requiredRules, { validator: validateConfirmPassword }]}
      >
        <Input.Password
          type="password"
          placeholder="Confirmar Senha"
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
        disabled={loading}
        htmlType="submit"
        backgroundcolor={theme.colors.textPrimary}
        color={theme.colors.textSecondary}
        margin="10px 0 0 0"
      >
        Registrar
      </Button>

      <Button
        htmlType="button"
        backgroundcolor={theme.colors.textSecondary}
        color={theme.colors.textPrimary}
        margin="10px 0 0 0"
        onClick={() => router.push('/login')}
      >
        Voltar
      </Button>
    </CustomizedForm>
  );
}
