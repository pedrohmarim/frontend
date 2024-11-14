import { useState, useEffect } from 'react';

export const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/socket`;

    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      console.log('Conectado ao servidor WebSocket');
      setSocket(newSocket);
    };

    newSocket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };

    newSocket.onclose = () => {
      console.log('Conexão com o WebSocket foi fechada');
      setSocket(null);
    };

    return () => {
      if (newSocket) newSocket.close();
    };
  }, []);

  return socket;
};
