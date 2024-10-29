import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { getItem } from 'utils/localStorage/User';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { i18n, t } = useTranslation('Home');
  const [languageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result).then(() => setLanguageLoaded(true));
    else setLanguageLoaded(true);
  }, [i18n]);

  if (!languageLoaded) return null;

  return (
    <S.Container justify="center" align="middle">
      © 2023-{new Date().getFullYear()} Discordle. {t('footer')}
    </S.Container>
  );
}
