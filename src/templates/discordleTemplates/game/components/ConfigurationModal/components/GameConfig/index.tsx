import React, { Fragment, useState } from 'react';
import { SwitchNameEnum } from './switchNameEnum';
import DiscordleInstaceApi from 'services/DiscordleService/DiscordleInstance';
import Image1 from 'assets/image_1.png';
import * as I from './IGameConfig';
import Image2 from 'assets/image_2.png';
import { useRouter } from 'next/router';
import theme from 'globalStyles/theme';
import { useMyContext } from 'Context';
import * as S from './styles';
import {
  Col,
  Row,
  Switch,
  FeatherIcons,
  Divider,
  Popover,
  Select,
  Image,
  Tooltip,
} from 'antd_components';

export default function GameConfig() {
  const [loadingSwitch, setLoadingSwitch] = useState(false);
  const { switchValues, setSwitchValues, windowWidth } = useMyContext();
  const switches: I.ISwitches[] = [];
  const router = useRouter();
  const isMobile = windowWidth < 375;

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

  const isLoadingSwitchValues = Boolean(Object.keys(switchValues).length);

  if (guildId && channelId && isLoadingSwitchValues) {
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
            setSwitchValues({
              ...switchValues,
              ShowReferencedMessage: value,
            })
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
    <Fragment>
      {switches.map(({ label, value, img, type, onChange }, index) => (
        <Row justify="start" align="middle" gutter={[0, 8]} key={index}>
          <S.SwitchDescriptionContainer>
            <S.SwitchDescription width={isMobile ? '92%' : '100%'}>
              {label}
            </S.SwitchDescription>

            {img ? (
              <Popover
                placement="right"
                content={
                  img && (
                    <Image src={img.src} alt="img" height="100%" width="100%" />
                  )
                }
                trigger={
                  window.innerWidth < 450 ? ['click'] : ['hover', 'click']
                }
                overlayInnerStyle={{
                  border: 'solid 2px rgba(138, 0, 194, 0.5)',
                  backgroundColor: theme.discordleColors.background,
                }}
                overlayStyle={{
                  borderRadius: '5px',
                  backgroundColor: theme.discordleColors.background,
                }}
              >
                <FeatherIcons
                  style={{ cursor: 'pointer' }}
                  icon="help-circle"
                  size={20}
                  color={theme.discordleColors.text}
                />
              </Popover>
            ) : (
              <Tooltip title="Cada pergunta respondida corretamente terá o valor escolhido, mas se a resposta estiver correta e for dada uma dica, o valor será reduzido pela metade.">
                <FeatherIcons
                  style={{ cursor: 'help' }}
                  icon="help-circle"
                  size={20}
                  color={theme.discordleColors.text}
                />
              </Tooltip>
            )}
          </S.SwitchDescriptionContainer>

          <Col span={24}>
            {type !== SwitchNameEnum.PointsPerCorrectAnswer && (
              <Switch
                onChange={async (value) => {
                  setLoadingSwitch(true);
                  await onChange(value ? 1 : 0).finally(() =>
                    setLoadingSwitch(false)
                  );
                }}
                defaultChecked={Boolean(value)}
                loading={loadingSwitch}
                checkedChildren={<FeatherIcons icon="check" size={20} />}
                unCheckedChildren={
                  <FeatherIcons
                    icon="x"
                    size={20}
                    color="rgba(255, 0, 0, 0.7)"
                  />
                }
              />
            )}

            {type === SwitchNameEnum.PointsPerCorrectAnswer && (
              <Col span={24}>
                <Select
                  defaultValue={value}
                  onChange={(value) => onChange(Number(value))}
                  style={{ marginTop: '10px', width: '30%' }}
                  size="middle"
                  notFoundContent={<Row justify="center">Sem dados</Row>}
                  placeholder="Pontos por acerto"
                >
                  {[2, 4, 6, 8, 10].map((value) => (
                    <Select.Option key={value}>{value}</Select.Option>
                  ))}
                </Select>
              </Col>
            )}
          </Col>

          <Divider
            style={{
              borderColor: 'rgba(255, 255, 255, 0.1)',
              marginTop: '15px',
            }}
          />
        </Row>
      ))}
    </Fragment>
  );
}
