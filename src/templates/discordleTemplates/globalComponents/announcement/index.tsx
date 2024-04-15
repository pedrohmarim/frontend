import React from 'react';
import { Col } from 'antd_components';
import * as S from './styles';

export default function Announcement() {
  return (
    <S.Row justify="center" gutter={[16, 0]}>
      <Col span={8}>
        <S.Ins
          className="adsbygoogle"
          data-adtest="on"
          data-ad-client="ca-pub-8292029543793408"
          data-ad-slot="8243248027"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </Col>
      <Col span={8}>
        <S.Ins
          className="adsbygoogle"
          data-adtest="on"
          data-ad-client="ca-pub-8292029543793408"
          data-ad-slot="3308617555"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </Col>
      <Col span={8}>
        <S.Ins
          className="adsbygoogle"
          data-adtest="on"
          data-ad-client="ca-pub-8292029543793408"
          data-ad-slot="7062028290"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </Col>
    </S.Row>
  );
}
