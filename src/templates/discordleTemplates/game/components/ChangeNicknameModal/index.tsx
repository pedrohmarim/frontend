import React from 'react';
import * as I from './IChangeNicknameModal';
import theme from 'globalStyles/theme';
import { Form, Input } from 'antd';
import DiscordMessagesApi from 'services/DiscordleService/DiscordleRanking';
import { Button, Modal, Row } from 'antd_components';
import { useRouter } from 'next/router';
import * as S from './styles';
import * as G from 'globalStyles/global';
import { requiredRules } from 'antd_components/Form/formItem.rules.constants';
import notification from 'antd_components/Notification/Notification.component';

export default function ConfigurationModal({
  openModal,
  username,
  memberId,
  gridReload,
  setOpenModal,
}: I.IConfigurationModal) {
  const router = useRouter();

  function onSubmit(values: I.IFormValues) {
    const { channelId, guildId, code } = router.query;

    if (channelId && guildId && code)
      DiscordMessagesApi.ChangeNickname(
        guildId.toString(),
        channelId.toString(),
        code.toString(),
        memberId,
        values.newNickname
      )
        .then(() => {
          gridReload();
          //
          notification.success(
            'Sucesso',
            `O apelido de '${username}', foi alterado para '${values.newNickname}'`
          );
        })
        .catch((err) =>
          notification.error(
            'Erro',
            'Não foi possível alterar o apelido.' + err
          )
        );

    setOpenModal({ memberId: '', memberUsername: '', show: !openModal });
  }

  return (
    <Modal
      open={openModal}
      footer={false}
      destroyOnClose
      onCancel={() =>
        setOpenModal({ memberId: '', memberUsername: '', show: !openModal })
      }
      title={
        <S.ModalTitle>
          Deseja castigar <G.HomeSpan>{username}</G.HomeSpan> ?
        </S.ModalTitle>
      }
    >
      <Form
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          newNickname: undefined,
        }}
      >
        <Form.Item
          tooltip="O usuário selecionado poderá remover o apelido caso quiser nas configurações do Servidor no Discord."
          name="newNickname"
          label="Dê um novo apelido a ele(a) no servidor!"
          required
          rules={[requiredRules]}
        >
          <Input
            maxLength={50}
            placeholder="Novo apelido"
            onClick={(e) => e.stopPropagation()}
            size="middle"
          />
        </Form.Item>

        <Row justify="center">
          <Button
            htmlType="submit"
            width="200"
            color={theme.discordleColors.text}
            backgroundcolor={theme.discordleColors.primary}
          >
            Confirmar
          </Button>
        </Row>
      </Form>
    </Modal>
  );
}
