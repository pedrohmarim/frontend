import React from 'react';
import * as I from './IConfigurationModal';
import * as S from './styles';
import theme from 'globalStyles/theme';
import { Button, Modal, Row, FeatherIcons, Tabs } from 'antd_components';
import { TabsProps } from 'antd';
import { useTranslation } from 'react-i18next';
import GameConfig from './components/GameConfig';
import MembersConfig from './components/MembersConfig';
import PrivacyConfig from './components/PrivacyConfig';
import RankingConfig from './components/RankingConfig';
import FormCreateDiscordleInstance from 'templates/discordleTemplates/globalComponents/formCreateDiscordleInstance';

export default function ConfigurationModal({
  openModal,
  loadChoosedMessages,
  setOpenModal,
}: I.IConfigurationModal) {
  const { t } = useTranslation('GuildInfo');

  const items: TabsProps['items'] = [
    {
      key: '3',
      label: t('configTabModal3'),
      children: <GameConfig />,
    },
    {
      key: '5',
      label: t('configTabModal5'),
      children: <MembersConfig loadChoosedMessages={loadChoosedMessages} />,
    },
    {
      key: '4',
      label: t('configTabModal4'),
      children: <RankingConfig />,
    },
    {
      key: '2',
      label: t('configTabModal2'),
      children: <PrivacyConfig />,
    },
    {
      key: '1',
      label: t('configTabModal1'),
      children: <FormCreateDiscordleInstance />,
    },
  ];

  return (
    <Modal
      open={openModal}
      footer={false}
      destroyOnClose
      onCancel={() => setOpenModal(!openModal)}
      title={
        <Row justify="center" align="middle">
          <FeatherIcons
            icon="settings"
            size={35}
            color={theme.discordleColors.primary}
          />

          <S.ModalTitle>{t('modalTitle')}</S.ModalTitle>
        </Row>
      }
    >
      <Tabs defaultActiveKey="3" items={items} />

      <Row justify="center">
        <Button
          onClick={() => setOpenModal(!openModal)}
          width="200"
          color={theme.discordleColors.text}
          backgroundcolor={theme.discordleColors.primary}
        >
          {t('closeBtn')}
        </Button>
      </Row>
    </Modal>
  );
}
