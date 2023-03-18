import React from 'react';
import { Row, Select, Image } from 'antd_components';
import { useRouter } from 'next/router';
import * as S from './styles';
import * as I from './IAuthorSelect';
import HugoPic from 'assets/hugo.jpg';
import AfonsoPic from 'assets/afonso.png';
import LuisPic from 'assets/luis.jpg';
import PodrePic from 'assets/podre.png';
import LuisaPic from 'assets/luisa.png';
import BiaPic from 'assets/bia.png';
import CaoPic from 'assets/cao.png';

const AuthorSelect = ({ authorMessage, authorsOptions }: I.IAuthorSelect) => {
  const router = useRouter();

  function handleVerifyAwnser(awnser: string) {
    router.push(
      {
        pathname: '/result',
        query: {
          success: awnser === authorMessage,
          authorMessage,
        },
      },
      '/result'
    );
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
    <Row align="middle" justify="center">
      <S.Select
        disabled={!authorsOptions?.length}
        getPopupContainer={(trigger) => trigger.parentNode}
        placeholder="Selecione um idiota"
        onChange={(value) => handleVerifyAwnser(String(value))}
      >
        {authorsOptions?.map((author) => (
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
    </Row>
  );
};

export default AuthorSelect;
