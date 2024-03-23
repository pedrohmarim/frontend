import React, { useState, useEffect, Fragment } from 'react';
import ChoosedMessage from 'templates/discordleTemplates/game/components/ChoosedMessage';
import AuthorSelect from 'templates/discordleTemplates/game/components/AuthorSelect';
import DiscordleGameAPI from 'services/DiscordleService/DiscordleGame';
import * as I from './IMessageTabs';
import * as S from './styles';
import { FeatherIcons, Row, PopConfirm } from 'antd_components';
import type { MenuProps } from 'antd';
import theme from 'globalStyles/theme';
import { useRouter } from 'next/router';
import ConfigurationModal from './ConfigurationModal';

export default function MessageTabs({
  activeTabKey,
  choosedMessages,
  awnsers,
  usedHint,
  authors,
  serverName,
  serverIcon,
  saveScore,
  setUsedHint,
  setActiveTabKey,
}: I.IMessageTabs) {
  const router = useRouter();
  const [authorSelected, setAuthorSelected] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [stillOpen, setStillOpen] = useState({
    tooltip: false,
    popconfirm: false,
    dropdown: false,
  });

  const handleTabChange = (key: string) => setActiveTabKey(Number(key));

  function closeAll() {
    setStillOpen({
      tooltip: false,
      popconfirm: false,
      dropdown: false,
    });
  }

  useEffect(() => {
    if (router.isReady) {
      const { guildId } = router.query;

      if (guildId)
        DiscordleGameAPI.VerifyIfIsDiscordleOwner(guildId.toString()).then(
          (isOwner) => setIsOwner(isOwner)
        );
    }
  }, [router]);

  function handleIcon(index: number, current: number, color: string) {
    let icon = '';

    if (!awnsers[index]?.Success || awnsers[index]?.UsedHint)
      icon = 'help-circle';

    if (
      awnsers[index]?.TabKey === current &&
      awnsers[index]?.Success &&
      !awnsers[index]?.UsedHint
    ) {
      icon = 'check-circle';
      color = awnsers[index]?.Score === 2 ? '#009e3f' : '#d48a00';
    }

    if (
      awnsers[index]?.TabKey === current &&
      !awnsers[index]?.Success &&
      !awnsers[index]?.UsedHint
    ) {
      icon = 'x-circle';
      color = '#a61f1f';
    }

    return <FeatherIcons icon={icon} color={color} size={18} />;
  }

  const score = awnsers.reduce((accumulator, curValue) => {
    return accumulator + curValue.Score;
  }, 0);

  const confirm = () =>
    new Promise(() => {
      setLoading(true);

      setTimeout(() => {
        setUsedHint(true);

        setLoading(false);
      }, 2000);
    });

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <PopConfirm
          title="Aviso! Ao mostrar uma dica, a resposta correta valerá 1 ponto ao invés de 2."
          okText="Mostrar"
          cancelText="Cancelar"
          onConfirm={confirm}
          getPopupContainer={(trigger) => trigger}
          onCancel={closeAll}
          placement="bottom"
          open={stillOpen.popconfirm || loading}
          okButtonProps={{
            style: {
              backgroundColor: theme.discordleColors.primary,
              border: 'none',
            },
          }}
          cancelButtonProps={{
            style: {
              backgroundColor: theme.discordleColors.text,
              color: theme.discordleColors.primary,
            },
          }}
        >
          <S.OptionItem
            align="middle"
            onClick={() =>
              setStillOpen({
                popconfirm: true,
                tooltip: false,
                dropdown: true,
              })
            }
          >
            <FeatherIcons
              icon="star"
              color={theme.discordleColors.primary}
              size={20}
            />
            <S.Hint>Dica</S.Hint>
          </S.OptionItem>

          {isOwner && (
            <S.OptionItem
              align="middle"
              onClick={() => {
                setStillOpen({
                  popconfirm: false,
                  tooltip: false,
                  dropdown: false,
                });

                setOpenModal(!openModal);
              }}
            >
              <FeatherIcons
                icon="settings"
                color={theme.discordleColors.primary}
                size={20}
              />
              <S.Hint>Configurações</S.Hint>
            </S.OptionItem>
          )}
        </PopConfirm>
      ),
    },
  ];

  return (
    <Fragment>
      <ConfigurationModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setStillOpen={setStillOpen}
      />

      <S.Tabs
        activeKey={String(activeTabKey)}
        onChange={handleTabChange}
        moreIcon={false}
      >
        {choosedMessages.map((choosedMessage, index) => {
          const current = index + 1;

          return (
            <S.TabsPane
              disabled
              key={String(current)}
              tab={
                awnsers && (
                  <Row justify="center">
                    {handleIcon(
                      index,
                      current,
                      current === activeTabKey
                        ? theme.discordleColors.primary
                        : '#fff'
                    )}

                    <S.MessageTabTitle>{`Mensagem ${current}`}</S.MessageTabTitle>
                  </Row>
                )
              }
            >
              <ChoosedMessage
                usedHint={usedHint}
                tabkey={activeTabKey}
                serverName={serverName}
                serverIcon={serverIcon}
                message={choosedMessage}
                score={score}
                items={items}
                loading={loading}
                stillOpen={stillOpen}
                setStillOpen={setStillOpen}
                authorSelected={authorSelected}
              />

              <AuthorSelect
                messageId={choosedMessage.id}
                activeTabKey={activeTabKey}
                usedHint={usedHint}
                authors={authors}
                saveScore={saveScore}
                setUsedHint={setUsedHint}
                setActiveTabKey={setActiveTabKey}
                setAuthorSelected={setAuthorSelected}
              />
            </S.TabsPane>
          );
        })}
      </S.Tabs>
    </Fragment>
  );
}
