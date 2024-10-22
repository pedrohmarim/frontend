import React, { useEffect } from 'react';
import * as I from './IConfigurationModal';
import * as S from './styles';
import theme from 'globalStyles/theme';
import GameConfig from './components/GameConfig';
import PrivacyConfig from './components/PrivacyConfig';
import RankingConfig from './components/RankingConfig';
import { Button, Modal, Row, FeatherIcons, Tabs } from 'antd_components';
import { TabsProps } from 'antd';
import FormCreateDiscordleInstance from 'templates/discordleTemplates/globalComponents/formCreateDiscordleInstance';
import { useTranslation } from 'react-i18next';
import { getItem } from 'utils/localStorage/User';

export default function ConfigurationModal({
  openModal,
  setOpenModal,
}: I.IConfigurationModal) {
  const { i18n, t } = useTranslation('GuildInfo');

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result);
  }, [i18n]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('configTabModal1'),
      children: <FormCreateDiscordleInstance />,
    },
    {
      key: '2',
      label: t('configTabModal2'),
      children: <PrivacyConfig />,
    },
    {
      key: '3',
      label: t('configTabModal3'),
      children: <GameConfig />,
    },
    {
      key: '4',
      label: t('configTabModal4'),
      children: <RankingConfig />,
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
      <Tabs defaultActiveKey="1" items={items} />

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
