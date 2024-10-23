import React, { useEffect } from 'react';
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
import { useTranslation } from 'react-i18next';
import { getItem } from 'utils/localStorage/User';

export default function ConfigurationModal({
  openModal,
  username,
  memberId,
  userIdThatChangedNickname,
  gridReload,
  setOpenModal,
}: I.IConfigurationModal) {
  const { i18n, t } = useTranslation('Ranking');
  const router = useRouter();

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result);
  }, [i18n]);

  function handleDescription(username: string, newNickname: string) {
    const language = getItem('i18nextLng');

    if (language === 'pt-BR')
      return `O apelido de '${username}', foi alterado para `;
    else
      return `The '${username}' nickname has been changed to '${newNickname}'.`;
  }

  function onSubmit(values: I.IFormValues) {
    const { channelId, guildId, code } = router.query;

    if (channelId && guildId && code)
      DiscordMessagesApi.ChangeNickname(
        guildId.toString(),
        channelId.toString(),
        code.toString(),
        memberId,
        values.newNickname,
        userIdThatChangedNickname
      ).then(() => {
        gridReload();
        notification.success(
          t('success'),
          handleDescription(username, values.newNickname)
        );
      });

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
          {t('punish')} <G.HomeSpan>{username}</G.HomeSpan> ?
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
          tooltip={t('formItemTooltip1')}
          name="newNickname"
          label={t('formItemLabel1')}
          required
          rules={[requiredRules]}
        >
          <Input
            maxLength={50}
            placeholder={t('formItemPlaceholder1')}
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
            {t('confirm')}
          </Button>
        </Row>
      </Form>
    </Modal>
  );
}
