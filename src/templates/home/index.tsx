import { Button } from 'antd_components';
import { useRouter } from 'next/router';
import React from 'react';

export default function Home() {
  const router = useRouter();

  return <Button onClick={() => router.push('/login')}>logar</Button>;
}
