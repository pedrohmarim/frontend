import React, { useEffect } from 'react';
import * as I from './IFormCreateDiscordleChannel';
import { Form, Tooltip } from 'antd';
import theme from 'globalStyles/theme';
import * as S from './styles';
import { requiredRules } from 'antd_components/Form/formItem.rules.constants';
import DiscordGuildsApi from 'services/DiscordleService/DiscordleGuilds';
import { useRouter } from 'next/router';
import DiscordInstanceApi from 'services/DiscordleService/DiscordleInstance';
import { useMyContext } from 'Context';
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

export default function FormCreateDiscordleChannel({
  getChannelsWithoutDiscordleInstance = false,
}: I.IFormCreateDiscordleChannel) {
  const router = useRouter();
  const { instanceChannels, setInstanceChannels } = useMyContext();

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
    getChannels();
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
      <S.Row justify="center">
        <h2>Criar novo Discordle</h2>
      </S.Row>

      <Row align="middle" justify="center">
        <Col xs={21} sm={21} md={21} lg={22} xl={22} xxl={22}>
          <Form.Item
            tooltip="Caso não apareça os canais, atualize usando o botão á direita"
            name="channelId"
            label="Canal de texto:"
            required
            rules={[requiredRules]}
          >
            <Select
              allowClear
              disabled={!instanceChannels.length}
              showSearch
              notFoundContent={<Row justify="center">Sem dados</Row>}
              placeholder={
                instanceChannels.length
                  ? 'Selecionar'
                  : 'Não há canais a serem exibidos'
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
          <Tooltip title="Atualizar">
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
            tooltip="Usado para entrar no Discordle do canal através da página inicial"
            name="channelCode"
            label="Código da sala:"
            required
            rules={[requiredRules]}
          >
            <Input
              maxLength={255}
              placeholder="Informe o código da sala"
              onClick={(e) => e.stopPropagation()}
              size="middle"
            />
          </Form.Item>
        </Col>

        {getChannelsWithoutDiscordleInstance && (
          <Col xs={21} sm={21} md={21} lg={22} xl={22} xxl={22}>
            <Form.Item
              tooltip="Na página inicial do Discordle, seu servidor será listado, permitindo a visualização de que seu servidor faz parte do Discordle para o público (Apenas usuários com a senha do servidor poderão acessar)"
              name="showDiscordOnHome"
              label="Exibir servidor na listagem da página inicial:"
              valuePropName="checked"
            >
              <Checkbox>Habilitar exibição</Checkbox>
            </Form.Item>
          </Col>
        )}

        <Col xs={21} sm={21} md={21} lg={22} xl={22} xxl={22}>
          <Button
            color={theme.discordleColors.text}
            backgroundcolor={theme.discordleColors.primary}
            htmlType="submit"
          >
            Confirmar
          </Button>
        </Col>
      </Row>

      <Divider
        style={{
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
      />
    </Form>
  );
}
