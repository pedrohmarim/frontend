import { useState, useEffect } from 'react';
import { IWebSocketResponse } from './IWebSocketResponse';
import { useRouter } from 'next/router';

export const GetWebSocketMessage = () => {
  const router = useRouter();
  const [filteredMessage, setFilteredMessage] =
    useState<IWebSocketResponse | null>(null);

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
      const message: IWebSocketResponse = JSON.parse(event.data);

      if (router.isReady) {
        const { channelId, guildId, code } = router.query;

        if (channelId && guildId && code) {
          const isValidGuild = message.GuildId.includes(guildId.toString());
          const isValidCode = message.Code.includes(code.toString());
          const isValidChannel = message.ChannelId.includes(
            channelId.toString()
          );

          if (isValidChannel && isValidGuild && isValidCode)
            setFilteredMessage(message);
        }
      }
    };

    return () => {
      if (newSocket) newSocket.close();
    };
  }, [router]);

  return filteredMessage;
};
