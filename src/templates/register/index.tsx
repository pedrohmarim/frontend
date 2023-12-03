import React, { useCallback, useState } from 'react';
import * as S from './styles';
import { Form } from 'antd';
import { requiredRules } from 'antd_components/Form/formItem.rules.constants';
import UserApi from 'services/User';
import theme from 'globalStyles/theme';
import { useRouter } from 'next/router';
import * as I from '../../services/User/IUserService';
import { Notification } from 'antd_components';
import {
  Form as CustomizedForm,
  Input,
  Button,
  Tooltip,
  FeatherIcons,
} from 'antd_components';

export default function RegisterContainer() {
  const [form] = Form.useForm();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [validationState, setValidationState] = useState({
    message: '',
    isValid: false,
  });

  function onFinish(values: I.ICreateUserRequest) {
    UserApi.RegisterUser(values).then(() => {
      Notification.success({
        message: 'Sucesso!',
        description: 'Usuário criado.',
        icon: <FeatherIcons icon="check" color="green" />,
        duration: 3.5,
      });

      form.resetFields();

      router.push('/login');
    });
  }

  const handleDebouncedSearch = useCallback(async (email: string) => {
    setLoading(true);

    setTimeout(() => {
      UserApi.ValidateEmail(email)
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

  return (
    <S.FormContainer>
      <CustomizedForm
        form={form}
        title="Formulário Registro"
        onFinish={onFinish}
        width="400px"
      >
        <Form.Item
          name="Username"
          label="Nome Completo"
          rules={[requiredRules]}
        >
          <Input type="text" placeholder="Nome Completo" />
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
          />
        </Form.Item>

        <Form.Item
          name="Birthday"
          label="Data Nascimento"
          rules={[requiredRules]}
        >
          <Input type="date" placeholder="Data Nascimento" />
        </Form.Item>

        <Form.Item name="Password" label="Senha" rules={[requiredRules]}>
          <Input type="password" placeholder="Senha" />
        </Form.Item>

        <Button
          disabled={loading}
          htmlType="submit"
          backgroundcolor={theme.colors.textPurple}
          color={theme.colors.textWhite}
          marginTop="10px"
        >
          Registrar
        </Button>

        <Tooltip title="Voltar" color={theme.colors.textPurple}>
          <S.BackButton onClick={() => router.push('/login')}>
            <FeatherIcons icon="chevron-left" />
          </S.BackButton>
        </Tooltip>
      </CustomizedForm>
    </S.FormContainer>
  );
}
