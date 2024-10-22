import React, { useEffect } from 'react';
import * as I from './IFormCreateDiscordleInstance';
import { Form, Tooltip } from 'antd';
import theme from 'globalStyles/theme';
import * as S from './styles';
import { requiredRules } from 'antd_components/Form/formItem.rules.constants';
import DiscordGuildsApi from 'services/DiscordleService/DiscordleGuilds';
import { useRouter } from 'next/router';
import DiscordInstanceApi from 'services/DiscordleService/DiscordleInstance';
import { useMyContext } from 'Context';
import { useTranslation } from 'react-i18next';
import { getItem } from 'utils/localStorage/User';
import {
  Checkbox,
  Input,
  Select,
  Row,
  Divider,
  Col,
  Button,
  FeatherIcons,
} from 'antd_components';

export default function FormCreateDiscordleInstance({
  getChannelsWithoutDiscordleInstance = false,
}: I.IFormCreateDiscordleInstance) {
  const router = useRouter();
  const { instanceChannels, setInstanceChannels } = useMyContext();

  const { i18n, t } = useTranslation('Home');

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result);
  }, [i18n]);

  function getChannels() {
    if (router.isReady) {
      const { guild_id, guildId } = router.query;

      DiscordGuildsApi.GetGuildChannels(
        guild_id?.toString() || guildId?.toString() || '',
        true
      ).then((channels) => setInstanceChannels(channels));
    }
  }

  useEffect(() => {
    if (!getChannelsWithoutDiscordleInstance) getChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(values: I.IFormValues) {
    if (router.isReady) {
      const { guild_id, guildId } = router.query;
      const { channelCode, channelId, showDiscordOnHome } = values;

      if ((guild_id || guildId) && channelId && channelCode) {
        DiscordInstanceApi.CreateDiscordleInstance(
          channelId,
          guild_id?.toString() ?? guildId?.toString() ?? '',
          channelCode,
          showDiscordOnHome,
          getChannelsWithoutDiscordleInstance
        ).then(() =>
          router.push({
            pathname: '/discordle/chooseProfile',
            query: {
              guildId: guild_id?.toString() ?? guildId?.toString() ?? '',
              channelId,
              code: channelCode,
            },
          })
        );
      }
    }
  }

  return (
    <Form
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        showDiscordOnHome: true,
        ...(getChannelsWithoutDiscordleInstance && {
          channelCode: router.query.code,
        }),
      }}
    >
      {!getChannelsWithoutDiscordleInstance && (
        <S.Row justify="center">
          <h2>Criar novo Discordle</h2>
        </S.Row>
      )}

      <Row align="middle" justify="center">
        <Col xs={21} sm={21} md={21} lg={22} xl={22} xxl={22}>
          <Form.Item
            tooltip={t('formCreateDiscordleInstanceTooltip')}
            name="channelId"
            label={t('formCreateDiscordleInstanceLabel')}
            required
            rules={[requiredRules]}
          >
            <Select
              allowClear
              disabled={!instanceChannels.length}
              showSearch
              notFoundContent={<Row justify="center">{t('noData')}</Row>}
              placeholder={
                instanceChannels.length
                  ? t('select')
                  : t('formCreateDiscordleInstanceNoDataPlaceholder')
              }
              filterOption={(inputValue, option) => {
                const searchValue = `${option?.children[0]}${option?.children[1]}`;

                return searchValue
                  .toLowerCase()
                  .includes(inputValue.toLowerCase());
              }}
            >
              {instanceChannels.map(({ ChannelId, ChannelName }) => (
                <Select.Option key={ChannelId}>#{ChannelName}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <S.ButtonContainer fromGame={getChannelsWithoutDiscordleInstance}>
          <Tooltip title={t('formCreateDiscordleButtonTooltip')}>
            <Button
              onClick={getChannels}
              backgroundcolor="transparent"
              color={theme.discordleColors.text}
              icon={<FeatherIcons icon="rotate-cw" />}
            />
          </Tooltip>
        </S.ButtonContainer>

        <Col xs={21} sm={21} md={21} lg={22} xl={22} xxl={22}>
          <Form.Item
            tooltip={t('formCreateDiscordleTooltipFormItem')}
            name="channelCode"
            label={t('formCreateDiscordleLabelFormItem')}
            required
            rules={[requiredRules]}
          >
            <Input
              maxLength={255}
              placeholder={t('formCreateDiscordlePlaceholderFormItem')}
              onClick={(e) => e.stopPropagation()}
              size="middle"
            />
          </Form.Item>
        </Col>

        {getChannelsWithoutDiscordleInstance && (
          <Col xs={21} sm={21} md={21} lg={22} xl={22} xxl={22}>
            <Form.Item
              tooltip={t('secondFormCreateDiscordleTooltipFormItem')}
              name="showDiscordOnHome"
              label={t('secondFormCreateDiscordleLabelFormItem')}
              valuePropName="checked"
            >
              <Checkbox>{t('labelCheckbox')}</Checkbox>
            </Form.Item>
          </Col>
        )}

        <Col xs={21} sm={21} md={21} lg={22} xl={22} xxl={22}>
          <Button
            color={theme.discordleColors.text}
            backgroundcolor={theme.discordleColors.primary}
            htmlType="submit"
          >
            {t('confirm')}
          </Button>
        </Col>
      </Row>

      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
    </Form>
  );
}
