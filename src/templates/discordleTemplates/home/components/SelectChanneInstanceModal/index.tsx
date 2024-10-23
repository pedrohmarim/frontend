import React, { useState, useCallback, Fragment } from 'react';
import * as I from './ISelectChannelInstanceModal';
import * as S from './styles';
import * as G from 'globalStyles/global';
import { useRouter } from 'next/router';
import DiscordleInstanceApi from 'services/DiscordleService/DiscordleInstance';
import DebouncedTextInput from 'templates/discordleTemplates/globalComponents/deboucedTextInput';
import FormCreateDiscordleInstance from 'templates/discordleTemplates/globalComponents/formCreateDiscordleInstance';
import { Modal, List, Row } from 'antd_components';
import { useMyContext } from 'Context';
import { useTranslation } from 'react-i18next';
import {
  deleteDiscordleToken,
  getDiscordleToken,
} from 'utils/localStorage/User';

export default function SelectChanneInstanceModal({
  selectedGuildName,
  guildId,
  open,
  onClose,
}: I.ISelectChannelInstanceModal) {
  const { t } = useTranslation('Home');

  const fromGuildParam = !Boolean(selectedGuildName);
  const title = !selectedGuildName
    ? `Discordle | ${t('selectChannelInstanceModalTitle')}`
    : `${t('secondSelectChannelInstanceModalTitle')} ${selectedGuildName}`;

  const router = useRouter();
  const [showInputs, setShowInputs] = useState<I.IShowInputsState>({});
  const [channelId, setChannelId] = useState<string>();
  const { instanceChannels } = useMyContext();

  const toggleInput = (channelId: string) => {
    setChannelId(channelId);

    setShowInputs((prev) => {
      const updatedInputsState: I.IShowInputsState = {};
      const anyInputVisible = Object.values(prev).some((value) => value);

      if (!anyInputVisible || prev[channelId])
        updatedInputsState[channelId] = !prev[channelId];
      else updatedInputsState[channelId] = true;

      return updatedInputsState;
    });
  };

  const handleDebounce = useCallback(
    async (code: string) => {
      if (code.length && channelId && channelId.length) {
        deleteDiscordleToken();

        DiscordleInstanceApi.ValidateCode(code, guildId, channelId).then(
          (validCode) => {
            if (validCode) {
              const token = getDiscordleToken();

              const query = {
                guildId,
                channelId,
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
            }
          }
        );
      }
    },
    [guildId, router, channelId]
  );

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
          <FormCreateDiscordleInstance getChannelsWithoutDiscordleInstance />

          <Row justify="center">
            <S.Description fontSize="13pt">
              <G.HomeSpan>{t('modalSpan1')}</G.HomeSpan>
            </S.Description>

            <S.Description fontSize="11.5pt">
              {t('modalDescription1')}
            </S.Description>
          </Row>
        </Fragment>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={instanceChannels}
          locale={{
            emptyText: (
              <S.EmptyContent justify="center">{t('noData')}</S.EmptyContent>
            ),
          }}
          renderItem={({ ChannelName, ChannelId }) => (
            <S.ListItem onClick={() => toggleInput(ChannelId)}>
              <S.ListItemMeta
                title={
                  <S.RowContainer justify="space-between" align="middle">
                    <S.ChannelName>#{ChannelName}</S.ChannelName>

                    {!showInputs[ChannelId] ? (
                      <S.SpanList>{t('select')}</S.SpanList>
                    ) : (
                      <DebouncedTextInput
                        autoFocus
                        handleDebounce={handleDebounce}
                        placeholder={t('inputPlaceholder')}
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
