import React from 'react';
import Lottie from 'lottie-react';
import { Row } from 'antd_components';
import Animation from 'assets/discordLoad.json';

export default function MyLottieAnimation() {
  return (
    <Row justify="center">
      <Lottie
        animationData={Animation}
        loop={true}
        style={{ width: '300px' }}
      />
    </Row>
  );
}
