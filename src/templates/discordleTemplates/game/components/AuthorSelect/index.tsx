import React, { Fragment } from 'react';
import { Row, Select, Image, Notification } from 'antd_components';
import * as S from './styles';
import * as I from './IAuthorSelect';
import theme from 'globalStyles/theme';
import { IAwnser } from 'templates/discordleTemplates/game/IGame';

const AuthorSelect = ({
  authorMessageId,
  authors,
  activeTabKey,
  usedHint,
  saveScore,
  setActiveTabKey,
  setAwnsers,
  setUsedHint,
}: I.IAuthorSelect) => {
  function handleVerifyAwnser(awnserId: string) {
    const success = awnserId === authorMessageId;

    const username = authors.find(
      ({ Id: id }) => id === authorMessageId
    )?.Username;

    const score = success ? (usedHint ? 1 : 2) : 0;

    const newAwnserDto: IAwnser = {
      Success: success,
      TabKey: activeTabKey,
      Score: score,
    };

    saveScore(newAwnserDto);

    setAwnsers((prevAwnsers) => [...prevAwnsers, newAwnserDto]);

    const description: JSX.Element = (
      <Fragment>
        {success ? 'Quem mandou essa mensagem foi ' : 'A resposta certa era '}
        <S.AuthorHighlight color={theme.discordleColors.primary}>
          {username}
        </S.AuthorHighlight>
      </Fragment>
    );

    setUsedHint(false);

    if (success) return Notification.success('Acertou!', description);

    return Notification.error('Errou!', description);
  }

  return (
    <S.Select
      disabled={!authors?.length}
      getPopupContainer={(trigger) => trigger.parentNode}
      placeholder="Selecione um membro"
      onChange={(value) => {
        handleVerifyAwnser(String(value));
        setActiveTabKey((prev: number) => prev + 1);
      }}
    >
      {authors?.map(({ Avatar, Username, Id }) => (
        <Select.Option key={Id}>
          <Row align="middle">
            <Image
              style={{ borderRadius: '4px' }}
              preview={false}
              src={Avatar}
              alt="profile-pic"
              height="30px"
              width="30px"
            />
            <S.AuthorName>{Username}</S.AuthorName>
          </Row>
        </Select.Option>
      ))}
    </S.Select>
  );
};

export default AuthorSelect;
