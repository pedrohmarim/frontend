import React, { useState } from 'react';
import * as I from './IConfigurationSwitches';
import * as S from './styles';
import theme from 'globalStyles/theme';
import { Button, Row, Switch, FeatherIcons, Divider } from 'antd_components';

export default function ConfigurationSwitches({
  label,
  checked,
  onChange,
}: I.ISwitches) {
  const [loadingSwitch, setLoadingSwitch] = useState(false);

  return (
    <Row justify="start" align="middle">
      <Switch
        onChange={async (checked) => {
          setLoadingSwitch(true);
          await onChange(checked).finally(() => setLoadingSwitch(false));
        }}
        defaultChecked={checked}
        loading={loadingSwitch}
        checkedChildren={<FeatherIcons icon="check" size={20} />}
        unCheckedChildren={
          <FeatherIcons icon="x" size={20} color="rgba(255, 0, 0, 0.7)" />
        }
      />

      <S.SwitchDescription>{label}</S.SwitchDescription>

      <Button
        backgroundcolor="transparent"
        width="fit-content"
        icon={
          <FeatherIcons
            icon="help-circle"
            size={20}
            color={theme.discordleColors.text}
          />
        }
      />

      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
    </Row>
  );
}
