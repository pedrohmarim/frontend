import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IWebSocketMessage } from './IWebSocketMessage';

export const GetWebSocketMessage = () => {
  const router = useRouter();
  const [filteredMessage, setFilteredMessage] =
    useState<IWebSocketMessage | null>(null);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/socket`;

    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      console.log('Conectado ao servidor WebSocket');
    };

    newSocket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };

    newSocket.onclose = () => {
      console.log('Conexão com o WebSocket foi fechada');
    };

    newSocket.onmessage = (event) => {
      const message: IWebSocketMessage = JSON.parse(event.data);

      if (message.IsBroadCast) handleBroadcastMessage(message);
      else handleGuildSpecificMessage(message);
    };

    const handleBroadcastMessage = (message: IWebSocketMessage) => {
      setFilteredMessage(message);
    };

    const handleGuildSpecificMessage = (message: IWebSocketMessage) => {
      if (!router.isReady) return;

      const { channelId, guildId, code } = router.query;

      if (!channelId || !guildId || !code) return;

      const isValid = [
        message.GuildId.includes(guildId.toString()),
        message.Code.includes(code.toString()),
        message.ChannelId.includes(channelId.toString()),
      ].every(Boolean);

      if (isValid) setFilteredMessage(message);
    };

    return () => {
      if (newSocket) newSocket.close();
    };
  }, [router]);

  return filteredMessage;
};
