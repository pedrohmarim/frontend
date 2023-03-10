import React from 'react';
import Head from 'next/head';
import { Button } from 'antd_components';

export default function Home() {
  return (
    <>
      <Head>
        <title>WhatsApp | Home</title>
      </Head>
      <Button>Mudar tema</Button>
    </>
  );
}
