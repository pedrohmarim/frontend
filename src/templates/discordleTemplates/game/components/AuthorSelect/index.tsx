import React from 'react';
import { Row, Select, Image } from 'antd_components';
import * as S from './styles';
import * as I from './IAuthorSelect';

const AuthorSelect = ({
  activeTabKey,
  messageId,
  usedHint,
  authors,
  saveScore,
  setUsedHint,
  setActiveTabKey,
  setAuthorSelected,
}: I.IAuthorSelect) => {
  return (
    <S.Select
      disabled={!authors?.length}
      allowClear
      placeholder="Selecione um membro"
      showSearch
      dropdownMatchSelectWidth
      getPopupContainer={(trigger) => trigger}
      notFoundContent={<Row justify="center">Sem dados</Row>}
      filterOption={(inputValue, option) => {
        return option?.children?.props?.children[1].props?.children
          .toLowerCase()
          .includes(inputValue.toLowerCase());
      }}
      onChange={(value) => {
        setAuthorSelected(String(value));
        saveScore(messageId, String(value), usedHint, activeTabKey);
        setUsedHint(false);
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
