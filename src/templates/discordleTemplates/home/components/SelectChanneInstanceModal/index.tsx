import React, { useState, useEffect, useCallback } from 'react';
import { Modal, List, Input } from 'antd_components';
import * as I from './ISelectChannelInstanceModal';
import * as S from './styles';
import { useRouter } from 'next/router';
import DiscordGuildsApi from 'services/DiscordleService/DiscordleGuilds';
import { IInstanceChannels } from 'services/DiscordleService/IDiscordleService';
import DiscordleInstanceApi from 'services/DiscordleService/DiscordleInstance';
import notification from 'antd_components/Notification/Notification.component';

export default function SelectChanneInstanceModal({
  open,
  title,
  guildId,
  setOpen,
}: I.ISelectChannelInstanceModal) {
  const router = useRouter();
  const [showInputs, setShowInputs] = useState<I.ShowInputsState>({});
  const [instanceChannels, setInstanceChannels] = useState<IInstanceChannels[]>(
    []
  );

  const toggleInput = (channelId: string) => {
    setShowInputs((prev) => {
      const updatedInputsState: I.ShowInputsState = {};
      const anyInputVisible = Object.values(prev).some((value) => value);

      if (!anyInputVisible || prev[channelId])
        updatedInputsState[channelId] = !prev[channelId];
      else updatedInputsState[channelId] = true;

      return updatedInputsState;
    });
  };

  useEffect(() => {
    if (router.isReady) {
      const { guild_id } = router.query;

      if (guild_id) {
        DiscordGuildsApi.GetGuildById(guild_id.toString(), true).then(
          (channels) => setInstanceChannels(channels)
        );
      }
    }
  }, [router]);

  const handleDebouncedOnChange = useCallback(
    async (code: string, channelId: string) => {
      if (code.length)
        DiscordleInstanceApi.ValidateCode(code, guildId, channelId).then(
          (validCode) => {
            if (validCode)
              router.push({
                pathname: '/discordle/chooseProfile',
                query: {
                  channelId,
                  guildId,
                  code,
                },
              });
            else notification.error('Erro', 'Código Inválido');
          }
        );
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

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#17171a' }}
      open
      footer={false}
      closable={false}
      destroyOnClose
      onCancel={() => setOpen(!open)}
      title={
        <S.ModalTitle justify="center">
          {title.length > 38 ? `${title.substring(0, 38)}...` : title}
        </S.ModalTitle>
      }
    >
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
    </Modal>
  );
}
