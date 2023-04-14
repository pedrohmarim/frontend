import React from 'react';
import { Row, Select, Image, Notification } from 'antd_components';
import * as S from './styles';
import * as I from './IAuthorSelect';
import HugoPic from 'assets/hugo.jpg';
import AfonsoPic from 'assets/afonso.png';
import LuisPic from 'assets/luis.jpg';
import PodrePic from 'assets/podre.png';
import LuisaPic from 'assets/luisa.png';
import BiaPic from 'assets/bia.png';
import CaoPic from 'assets/cao.png';
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
  function handleVerifyAwnser(awnser: string) {
    const success = awnser === authorMessage;

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
          {authorMessage}
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

  function handleUserPicture(author: string) {
    switch (author) {
      case 'Hugo Manera':
        return HugoPic.src;
      case 'Koromelo':
        return AfonsoPic.src;
      case 'Edu':
        return LuisPic.src;
      case 'Gertrudes':
        return LuisaPic.src;
      case 'Beatriz':
        return BiaPic.src;
      case 'CãoFantasma':
        return CaoPic.src;
      default:
        return PodrePic.src;
    }
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
      {authors?.map((author) => (
        <Select.Option key={author}>
          <Row align="middle">
            <Image
              preview={false}
              src={handleUserPicture(author)}
              alt="profile-pic"
              height="30px"
              width="30px"
            />
            <S.AuthorName>{author}</S.AuthorName>
          </Row>
        </Select.Option>
      ))}
    </S.Select>
  );
};

export default AuthorSelect;
