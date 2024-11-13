import React, { Fragment } from 'react';
import * as S from './styles';
import MembersSelect from 'templates/discordleTemplates/globalComponents/membersSelect';
import { useMyContext } from 'Context';
import { Row } from 'antd';
import { useTranslation } from 'react-i18next';

export default function SelectMembersToCreateDiscordleGameInstance() {
  const { windowWidth } = useMyContext();
  const isMobile = windowWidth <= 875;

  const { t } = useTranslation('GuildInfo');

  return (
    <Fragment>
      <Row justify="center">
        <S.Title>{t('descriptionTitle')}</S.Title>
      </Row>

      <S.Container ismobile={isMobile}>
        <MembersSelect fromChooseprofile />
      </S.Container>
    </Fragment>
  );
}
