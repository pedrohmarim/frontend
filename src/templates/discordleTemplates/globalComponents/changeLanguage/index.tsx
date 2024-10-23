import React, { useEffect, useState } from 'react';
import * as S from './styles';
import * as I from './IChangeLanguage';
import { Select, Avatar } from 'antd_components';
import { getItem } from 'utils/localStorage/User';
import { useTranslation } from 'react-i18next';
import theme from 'globalStyles/theme';

export default function ChangeLanguage({ fromHome }: I.IChangeLanguage) {
  const { i18n } = useTranslation('Home');
  const [selectedLanguage, setSelectedLanguage] = useState('pt-BR');

  useEffect(() => {
    const savedLanguage = getItem('i18nextLng') ?? 'pt-BR';
    setSelectedLanguage(savedLanguage);
  }, []);

  return (
    <S.Select
      fromhome={fromHome}
      value={selectedLanguage}
      onChange={(value) => {
        i18n.changeLanguage(String(value));
        setSelectedLanguage(String(value));
      }}
      dropdownStyle={{
        backgroundColor: theme.discordleColors.background,
      }}
    >
      <Select.Option value="en">
        <Avatar src="https://flagcdn.com/w320/us.png" alt="usa_flag" />
      </Select.Option>

      <Select.Option value="pt-BR">
        <Avatar src="https://flagcdn.com/w320/br.png" alt="brazil_flag" />
      </Select.Option>
    </S.Select>
  );
}
