import React from 'react';
import { Row, Select, Image, Notification } from 'antd_components';
import * as S from './styles';
import * as I from './IAuthorSelect';
import theme from 'globalStyles/theme';
import { IAwnser } from 'templates/game/IGame';

const AuthorSelect = ({
  authorMessage,
  authors,
  activeTabKey,
  usedHint,
  saveScore,
  setActiveTabKey,
  setAwnsers,
  setUsedHint,
}: I.IAuthorSelect) => {
  function handleVerifyAwnser(awnserId: string) {
    const success = awnserId === authorMessage.id;

    const username = authors.find(({ id }) => id === awnserId)?.username;

    const score = success ? (usedHint ? 1 : 2) : 0;

    const newAwnserDto: IAwnser = {
      success,
      tabKey: activeTabKey,
      score,
    };

    saveScore(newAwnserDto);

    setAwnsers((prevAwnsers) => [...prevAwnsers, newAwnserDto]);

    const title: JSX.Element = (
      <>
        {success
          ? 'Acertou! Quem mandou essa mensagem foi '
          : 'Errou! A resposta certa era '}
        <S.AuthorHighlight color={theme.colors.primary}>
          {username || authorMessage.username}
        </S.AuthorHighlight>
      </>
    );

    const description: string = success
      ? 'Parabéns você realmente conhece seus colegas.'
      : 'Você não é um bom colega...';

    const duration = 8;

    const config = { title, description, duration };

    setUsedHint(false);

    if (success) return Notification.success(config);

    return Notification.error(config);
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
      {authors?.map(({ avatarUrl, username, id }) => (
        <Select.Option key={id}>
          <Row align="middle">
            <Image
              style={{ borderRadius: '4px' }}
              preview={false}
              src={avatarUrl}
              alt="profile-pic"
              height="30px"
              width="30px"
            />
            <S.AuthorName>{username}</S.AuthorName>
          </Row>
        </Select.Option>
      ))}
    </S.Select>
  );
};

export default AuthorSelect;
