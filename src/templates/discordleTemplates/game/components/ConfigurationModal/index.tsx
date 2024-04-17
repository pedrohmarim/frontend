import React from 'react';
import * as I from './IConfigurationModal';
import * as S from './styles';
import theme from 'globalStyles/theme';
import GameConfig from './components/GameConfig';
import RankingConfig from './components/RankingConfig';
import { Button, Modal, Row, FeatherIcons, Tabs } from 'antd_components';
import { TabsProps } from 'antd';

export default function ConfigurationModal({
  openModal,
  setOpenModal,
}: I.IConfigurationModal) {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Jogo',
      children: <GameConfig />,
    },
    {
      key: '2',
      label: 'Ranking',
      children: <RankingConfig />,
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];

  return (
    <Modal
      open={openModal}
      footer={false}
      closable={false}
      destroyOnClose
      onCancel={() => setOpenModal(!openModal)}
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
    >
      <Tabs defaultActiveKey="1" items={items} />

      <Row justify="center">
        <Button
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
