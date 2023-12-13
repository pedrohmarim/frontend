import React, { Fragment, useState } from 'react';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import * as S from './styles';
import theme from 'globalStyles/theme';
import {
  emailRegex,
  requiredRules,
} from 'antd_components/Form/formItem.rules.constants';
import {
  Form as CustomizedForm,
  Row,
  Col,
  FeatherIcons,
  Tooltip,
  Input,
  Button,
} from 'antd_components';

export default function RecoverPasswordContainer() {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();

  const formHeader: JSX.Element = (
    <Fragment>
      {!showCodeInput && (
        <Fragment>
          <Row justify="center">
            <S.RecoverTitle>Recuperação de senha</S.RecoverTitle>
          </Row>

          <Row justify="center">
            <S.RecoverDescription>
              Informe abaixo seu e-mail
            </S.RecoverDescription>
          </Row>
        </Fragment>
      )}

      {showCodeInput && (
        <Row>
          <Col span={24}>
            <S.RecoverTitle>Verificação de E-mail</S.RecoverTitle>
          </Col>

          <Col span={24}>
            <S.RecoverDescription>
              Mandamos um código para seu endereço de e-mail
            </S.RecoverDescription>
          </Col>
        </Row>
      )}
    </Fragment>
  );

  function onFinish() {}

  return (
    <S.RecoverContainer>
      <CustomizedForm
        formHeader={formHeader}
        onFinish={onFinish}
        width="400px"
        heigth="fit-content"
        form={form}
      >
        <Form.Item
          name="Email"
          label="E-mail"
          rules={[requiredRules, emailRegex]}
        >
          <Input type="email" placeholder="E-mail" />
        </Form.Item>

        <Button
          htmlType="submit"
          margintop="25px"
          marginbottom="20px"
          backgroundcolor={theme.colors.textPrimary}
          color={theme.colors.textSecondary}
        >
          Enviar código
        </Button>

        <Tooltip title="Voltar" color={theme.colors.textPrimary}>
          <S.BackButton onClick={() => router.push('/login')}>
            <FeatherIcons icon="chevron-left" />
          </S.BackButton>
        </Tooltip>
      </CustomizedForm>
    </S.RecoverContainer>
  );
}
