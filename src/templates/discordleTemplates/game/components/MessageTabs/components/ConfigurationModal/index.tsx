import React, { Fragment } from 'react';
import * as I from './IConfigurationModal';
import * as S from './styles';
import theme from 'globalStyles/theme';
import { SwitchNameEnum } from '../ConfigurationParams/switchNameEnum';
import DiscordleInstaceApi from 'services/DiscordleService/DiscordleInstance';
import { useRouter } from 'next/router';
import { Button, Modal, Row, FeatherIcons } from 'antd_components';
import { ISwitches } from '../ConfigurationParams/IConfigurationSwitches';
import ConfigurationParams from '../ConfigurationParams';
import Image1 from 'assets/image_1.png';
import Image2 from 'assets/image_2.png';

export default function ConfigurationModal({
  openModal,
  switchValues,
  setOpenModal,
  setSwitchValues,
}: I.IConfigurationModal) {
  const router = useRouter();

  if (!router.isReady) return <Fragment />;

  async function updateSwitchValue(
    value: number,
    switchName: SwitchNameEnum,
    guildId: string,
    channelId: string
  ) {
    const dto: I.IChangeSwitchRequest = {
      value,
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
        img: Image1,
        value: switchValues.ShowHintsAuthors,
        type: SwitchNameEnum.ShowHintsAuthors,
        onChange: (value: number) =>
          updateSwitchValue(
            value,
            SwitchNameEnum.ShowHintsAuthors,
            guildId.toString(),
            channelId.toString()
          ).then(() =>
            setSwitchValues({ ...switchValues, ShowHintsAuthors: value })
          ),
      },
      {
        label: 'Mostrar respostas de mensagens.',
        img: Image2,
        type: SwitchNameEnum.ShowReferencedMessage,
        value: switchValues.ShowReferencedMessage,
        onChange: (value: number) =>
          updateSwitchValue(
            value,
            SwitchNameEnum.ShowReferencedMessage,
            guildId.toString(),
            channelId.toString()
          ).then(() =>
            setSwitchValues({ ...switchValues, ShowReferencedMessage: value })
          ),
      },
      {
        label: 'Pontos por acerto. (Dica valerá metade dos pontos).',
        type: SwitchNameEnum.PointsPerCorrectAnswer,
        value: switchValues.PointsPerCorrectAnswer,
        onChange: (value: number) =>
          updateSwitchValue(
            value,
            SwitchNameEnum.PointsPerCorrectAnswer,
            guildId.toString(),
            channelId.toString()
          ).then(() =>
            setSwitchValues({
              ...switchValues,
              PointsPerCorrectAnswer: value,
            })
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
      {switches.map(({ label, value, img, type, onChange }, index) => (
        <ConfigurationParams
          key={index.toString()}
          value={value}
          img={img}
          type={type}
          label={label}
          onChange={onChange}
        />
      ))}

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
