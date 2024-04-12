import React, { Fragment, useState } from 'react';
import * as S from './styles';
import Image from 'next/image';
import copy from 'clipboard-copy';
import { useRouter } from 'next/router';
import { useMyContext } from 'Context';
import { Col, Divider, FeatherIcons, Row, Tooltip } from 'antd_components';
import { HomeSpan } from 'globalStyles/global';

export default function GuildInfo() {
  const [stateCopy, setStateCopy] = useState<boolean>(false);
  const router = useRouter();
  const { serverInfos, windowWidth } = useMyContext();
  const isMobile = windowWidth <= 875;

  function handleCopy() {
    if (router.query.code) {
      copy(router.query.code.toString());
      setStateCopy(true);
    }
  }

  return (
    <Fragment>
      <S.ServerInfoContainer
        align="middle"
        justify={isMobile ? 'center' : 'start'}
      >
        <Image
          src={serverInfos.ServerIcon}
          alt="img"
          width={90}
          height={90}
          style={{ borderRadius: '50%' }}
        />

        <Col xs={24} sm={16} md={18} lg={18} xl={18} xxl={18}>
          <Row gutter={[0, 5]} justify={isMobile ? 'center' : 'start'}>
            <S.ServerName isMobile={isMobile}>
              {serverInfos.ServerName}
            </S.ServerName>

            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Row justify={isMobile ? 'center' : 'start'}>
                <S.ServerCode isMobile={isMobile}>
                  Código da sala: <HomeSpan>{router.query.code}</HomeSpan>
                </S.ServerCode>

                <Tooltip title={stateCopy ? 'Copiado!' : 'Copiar código'}>
                  <S.Clipboard
                    onClick={handleCopy}
                    onMouseLeave={() => setStateCopy(false)}
                  >
                    <FeatherIcons icon="clipboard" size={15} />
                  </S.Clipboard>
                </Tooltip>
              </Row>
            </Col>
          </Row>
        </Col>
      </S.ServerInfoContainer>

      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
    </Fragment>
  );
}
