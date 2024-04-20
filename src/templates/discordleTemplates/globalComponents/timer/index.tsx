import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useMemo, useState } from 'react';

export default function Timer() {
  const router = useRouter();
  const [timer, setTimer] = useState<string>('Carregando...');

  function formatDate(): string {
    const agora: Date = new Date();
    const meiaNoite: Date = new Date(agora);
    meiaNoite.setHours(24, 0, 0, 0);

    const tempoRestante: number = meiaNoite.getTime() - agora.getTime();

    const horas: number = Math.floor(tempoRestante / (1000 * 60 * 60));
    const minutos: number = Math.floor(
      (tempoRestante % (1000 * 60 * 60)) / (1000 * 60)
    );
    const segundos: number = Math.floor((tempoRestante % (1000 * 60)) / 1000);

    const tempoRestanteFormatado = `${horas
      .toString()
      .padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos
      .toString()
      .padStart(2, '0')}`;

    return tempoRestanteFormatado;
  }

  useEffect(() => {
    function countdown(): string {
      const intervalId: NodeJS.Timeout = setInterval(() => {
        const tempoRestante: string = formatDate();

        if (tempoRestante === '00:00:00') {
          clearInterval(intervalId);
          countdown();
        }
      }, 1000);

      return formatDate();
    }

    let intervalId: NodeJS.Timeout;

    const startCountdown = () => {
      intervalId = setInterval(() => {
        setTimer(countdown());
      }, 1000);
    };

    const { channelId, guildId } = router.query;

    if (router.isReady && channelId && guildId) startCountdown();

    return () => clearInterval(intervalId);
  }, [router]);

  return useMemo(() => <Fragment>{timer}</Fragment>, [timer]);
}
