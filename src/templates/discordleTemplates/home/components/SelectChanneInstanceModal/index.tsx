import React, { useState, useEffect, useCallback, Fragment } from 'react';
import * as I from './ISelectChannelInstanceModal';
import * as S from './styles';
import * as G from 'globalStyles/global';
import { useRouter } from 'next/router';
import DiscordInstanceApi from 'services/DiscordleService/DiscordleInstance';
import DiscordGuildsApi from 'services/DiscordleService/DiscordleGuilds';
import DiscordleInstanceApi from 'services/DiscordleService/DiscordleInstance';
import notification from 'antd_components/Notification/Notification.component';
import { Form, Tooltip } from 'antd';
import theme from 'globalStyles/theme';
import { requiredRules } from 'antd_components/Form/formItem.rules.constants';
import {
  deleteDiscordleToken,
  getDiscordleToken,
} from 'utils/localStorage/User';
import {
  Modal,
  List,
  Input,
  Select,
  Row,
  Col,
  Divider,
  Button,
  FeatherIcons,
} from 'antd_components';

export default function SelectChanneInstanceModal({
  selectedGuildName,
  instanceChannels,
  guildId,
  open,
  onClose,
  setInstanceChannels,
}: I.ISelectChannelInstanceModal) {
  const fromGuildParam = !Boolean(selectedGuildName);
  const title = !selectedGuildName
    ? 'Discordle | Criar Instância'
    : `Instâncias de ${selectedGuildName}`;

  const router = useRouter();
  const [showInputs, setShowInputs] = useState<I.IShowInputsState>({});

  const toggleInput = (channelId: string) => {
    setShowInputs((prev) => {
      const updatedInputsState: I.IShowInputsState = {};
      const anyInputVisible = Object.values(prev).some((value) => value);

      if (!anyInputVisible || prev[channelId])
        updatedInputsState[channelId] = !prev[channelId];
      else updatedInputsState[channelId] = true;

      return updatedInputsState;
    });
  };

  function getChannels() {
    DiscordGuildsApi.GetGuildById(guildId, !fromGuildParam).then((channels) =>
      setInstanceChannels(channels)
    );
  }

  useEffect(() => {
    if (router.isReady && guildId) getChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildId, router.isReady, setInstanceChannels]);

  const handleDebouncedOnChange = useCallback(
    async (code: string, channelId: string) => {
      if (code.length) {
        deleteDiscordleToken();

        DiscordleInstanceApi.ValidateCode(code, guildId, channelId).then(
          (validCode) => {
            if (validCode) {
              const token = getDiscordleToken();

              const query = {
                channelId,
                guildId,
                code,
              };

              if (!token)
                router.push({
                  pathname: '/discordle/chooseProfile',
                  query,
                });
              else
                router.push({
                  pathname: '/discordle/game',
                  query,
                });
            } else notification.error('Erro', 'Código Inválido');
          }
        );
      }
    },
    [guildId, router]
  );

  const debounce = useCallback(
    (func: (code: string, channelId: string) => void, delay: number) => {
      let timerId: NodeJS.Timeout;

      return function (code: string, channelId: string) {
        if (timerId) clearTimeout(timerId);

        timerId = setTimeout(() => {
          func(code, channelId);
        }, delay);
      };
    },
    []
  );

  const debouncedOnChange = debounce(handleDebouncedOnChange, 1000);

  function onChange(code: string, channelId: string) {
    debouncedOnChange(code, channelId);
  }

  function onSubmit(values: I.IFormValues) {
    if (router.isReady) {
      const { guild_id } = router.query;
      const { channelCode, channelId } = values;

      if (guild_id && channelId && channelCode) {
        const guildId = guild_id.toString();

        DiscordInstanceApi.CreateDiscordleInstance(
          channelId,
          guildId,
          channelCode
        ).then(() =>
          router.push({
            pathname: '/discordle/chooseProfile',
            query: {
              channelId,
              guildId,
              code: channelCode,
            },
          })
        );
      }
    }
  }

  return (
    <Modal
      open={open}
      footer={false}
      destroyOnClose
      maskClosable={!fromGuildParam}
      onCancel={onClose}
      title={
        <S.ModalTitle justify="center">
          {title.length > 38 ? `${title.substring(0, 38)}...` : title}
        </S.ModalTitle>
      }
    >
      {fromGuildParam ? (
        <Fragment>
          <Form layout="vertical" onFinish={onSubmit}>
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
                    disabled={!instanceChannels?.length}
                    showSearch
                    notFoundContent={<Row justify="center">Sem dados</Row>}
                    placeholder={
                      instanceChannels.length
                        ? 'Selecionar'
                        : 'Não há canais a serem exibidos'
                    }
                    filterOption={(inputValue, option) => {
                      return option?.children?.props?.children?.props?.children
                        .join('')
                        .toLowerCase()
                        .includes(`${inputValue.toLowerCase()}`);
                    }}
                  >
                    {instanceChannels?.length &&
                      instanceChannels.map(({ ChannelId, ChannelName }) => (
                        <Select.Option key={ChannelId}>
                          <Row align="middle">
                            <Row justify="center" align="middle">
                              #{ChannelName}
                            </Row>
                          </Row>
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>

              <S.ButtonContainer>
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
                  label="Senha:"
                  required
                  rules={[requiredRules]}
                  initialValue={router.query.code}
                >
                  <Input
                    maxLength={255}
                    placeholder="Informe o código da sala"
                    onClick={(e) => e.stopPropagation()}
                    size="middle"
                  />
                </Form.Item>
              </Col>

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
          </Form>

          <Divider
            style={{
              border: 'solid 1px rgba(255, 255, 255, 0.1)',
              marginTop: '20px',
            }}
          />

          <Row justify="center">
            <S.Description fontSize="13pt">
              <G.HomeSpan>Informações adicionais:</G.HomeSpan>
            </S.Description>

            <S.Description fontSize="11.5pt">
              Certifique-se de selecionar um canal com um volume significativo e
              uma ampla variedade de mensagens, pois não serão criados canais de
              texto com poucas mensagens ou variedade limitada.
            </S.Description>
          </Row>
        </Fragment>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={instanceChannels}
          locale={{
            emptyText: (
              <S.EmptyContent justify="center">Sem dados</S.EmptyContent>
            ),
          }}
          renderItem={({ ChannelName, ChannelId }) => (
            <S.ListItem onClick={() => toggleInput(ChannelId)}>
              <S.ListItemMeta
                title={
                  <S.RowContainer justify="space-between" align="middle">
                    <S.ChannelName>#{ChannelName}</S.ChannelName>

                    {!showInputs[ChannelId] ? (
                      <S.SpanList>Selecionar</S.SpanList>
                    ) : (
                      <Input
                        autoFocus
                        onChange={(e) => onChange(e.target.value, ChannelId)}
                        placeholder="Informe o código da sala"
                        style={{ maxWidth: '60%' }}
                        onClick={(e) => e.stopPropagation()}
                        size="middle"
                      />
                    )}
                  </S.RowContainer>
                }
              />
            </S.ListItem>
          )}
        />
      )}
    </Modal>
  );
}
