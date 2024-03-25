import React, { Fragment } from 'react';
import * as I from './IConfigurationModal';
import * as S from './styles';
import theme from 'globalStyles/theme';
import { SwitchNameEnum } from '../ConfigurationSwitches/switchNameEnum';
import DiscordleInstaceApi from 'services/DiscordleService/DiscordleInstance';
import { useRouter } from 'next/router';
import { Button, Modal, Row, FeatherIcons } from 'antd_components';
import { ISwitches } from '../ConfigurationSwitches/IConfigurationSwitches';
import ConfigurationSwitches from '../ConfigurationSwitches';

export default function ConfigurationModal({
  openModal,
  switchValues,
  setOpenModal,
  setSwitchValues,
}: I.IConfigurationModal) {
  const router = useRouter();

  if (!router.isReady) return <Fragment />;

  async function updateSwitchValue(
    checked: boolean,
    switchName: SwitchNameEnum,
    guildId: string,
    channelId: string
  ) {
    const dto: I.IChangeSwitchRequest = {
      checked,
      switch: switchName,
      guildId,
      channelId,
    };

    await DiscordleInstaceApi.UpdateSwitchDiscordleInstance(dto);
  }

  const { guildId, channelId } = router.query;

  const switches = [] as ISwitches[];

  if (guildId && channelId && switchValues !== undefined) {
    switches.push(
      {
        label: 'Mostrar autores de dicas.',
        checked: switchValues.ShowHintsAuthors,
        onChange: (checked: boolean) =>
          updateSwitchValue(
            checked,
            SwitchNameEnum.ShowHintsAuthors,
            guildId.toString(),
            channelId.toString()
          ).then(() =>
            setSwitchValues({ ...switchValues, ShowHintsAuthors: checked })
          ),
      },
      {
        label: 'Mostrar respostas de mensagens.',
        checked: switchValues.ShowReferencedMessage,
        onChange: (checked: boolean) =>
          updateSwitchValue(
            checked,
            SwitchNameEnum.ShowReferencedMessage,
            guildId.toString(),
            channelId.toString()
          ).then(() =>
            setSwitchValues({ ...switchValues, ShowReferencedMessage: checked })
          ),
      }
    );
  }

  return (
    <Modal
      open={openModal}
      bodyStyle={{ backgroundColor: '#17171a' }}
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
      {switches.map(({ label, checked, onChange }, index) => (
        <ConfigurationSwitches
          key={index.toString()}
          checked={checked}
          label={label}
          onChange={onChange}
        />
      ))}

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
