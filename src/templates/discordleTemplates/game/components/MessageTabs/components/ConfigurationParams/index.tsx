import React, { useState } from 'react';
import * as I from './IConfigurationSwitches';
import * as S from './styles';
import { useMyContext } from 'Context';
import theme from 'globalStyles/theme';
import { SwitchNameEnum } from './switchNameEnum';
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

export default function ConfigurationParams({
  label,
  type,
  value,
  img,
  onChange,
}: I.ISwitches) {
  const [loadingSwitch, setLoadingSwitch] = useState(false);
  const { windowWidth } = useMyContext();

  const isMobile = windowWidth < 375;

  const content = img && (
    <Image src={img.src} alt="img" height="100%" width="100%" />
  );

  return (
    <Row justify="start" align="middle" gutter={[0, 8]}>
      <S.SwitchDescriptionContainer>
        <S.SwitchDescription width={isMobile ? '92%' : '100%'}>
          {label}
        </S.SwitchDescription>

        {img ? (
          <Popover
            placement="right"
            content={content}
            trigger={window.innerWidth < 450 ? ['click'] : ['hover', 'click']}
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
              <FeatherIcons icon="x" size={20} color="rgba(255, 0, 0, 0.7)" />
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

      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
    </Row>
  );
}
