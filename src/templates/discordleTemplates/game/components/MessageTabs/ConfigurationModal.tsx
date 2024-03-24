import React from 'react';
import * as I from './IMessageTabs';
import * as S from './styles';
import theme from 'globalStyles/theme';
import {
  Button,
  Modal,
  Row,
  Switch,
  FeatherIcons,
  Divider,
} from 'antd_components';

const SwitchComponent = ({ children }: { children: string }) => (
  <Row justify="start" align="middle">
    <Switch
      defaultChecked
      loading
      checkedChildren={<FeatherIcons icon="check" size={20} />}
      unCheckedChildren={
        <FeatherIcons icon="x" size={20} color="rgba(255, 0, 0, 0.7)" />
      }
    />

    <S.SwitchDescription>{children}</S.SwitchDescription>

    <Button
      backgroundcolor="transparent"
      width="fit-content"
      icon={
        <FeatherIcons
          icon="help-circle"
          size={20}
          color={theme.discordleColors.text}
        />
      }
    />

    <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
  </Row>
);

export default function ConfigurationModal({
  openModal,
  setOpenModal,
}: I.IConfigurationModal) {
  return (
    <Modal
      open={openModal}
      bodyStyle={{ backgroundColor: '#17171a' }}
      footer={false}
      closable={false}
      destroyOnClose
      title={
        <Row justify="center" align="middle">
          <FeatherIcons
            icon="settings"
            size={25}
            color={theme.discordleColors.primary}
          />

          <S.ModalTitle>Configurações</S.ModalTitle>
        </Row>
      }
      onCancel={() => {
        // setStillOpen({
        //   popconfirm: false,
        //   tooltip: false,
        //   dropdown: false,
        // });
        setOpenModal(!openModal);
      }}
    >
      {['Mostrar autores de dicas.', 'Mostrar respostas de mensagens.'].map(
        (description, index) => (
          <SwitchComponent key={index}>{description}</SwitchComponent>
        )
      )}

      <Row justify="center">
        <Button
          margin="30px 0 0 0"
          onClick={() => setOpenModal(!openModal)}
          width="200"
          color={theme.discordleColors.text}
          backgroundcolor={theme.discordleColors.primary}
        >
          Voltar
        </Button>
      </Row>
    </Modal>
  );
}
