import React from 'react';
import * as I from './IConfigurationModal';
import * as S from './styles';
import theme from 'globalStyles/theme';
import GameConfig from './components/GameConfig';
import PrivacyConfig from './components/PrivacyConfig';
import RankingConfig from './components/RankingConfig';
import { Button, Modal, Row, FeatherIcons, Tabs } from 'antd_components';
import { TabsProps } from 'antd';
import FormCreateDiscordleChannel from 'templates/discordleTemplates/globalComponents/formCreateDiscordleChannel';

export default function ConfigurationModal({
  openModal,
  setOpenModal,
}: I.IConfigurationModal) {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Criação',
      children: <FormCreateDiscordleChannel />,
    },
    {
      key: '2',
      label: 'Privacidade',
      children: <PrivacyConfig />,
    },
    {
      key: '3',
      label: 'Jogo',
      children: <GameConfig />,
    },
    {
      key: '4',
      label: 'Ranking',
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

          <S.ModalTitle>Configurações</S.ModalTitle>
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
          Fechar
        </Button>
      </Row>
    </Modal>
  );
}
