import React, { useState, useEffect, Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import GamePresentation from './components/GamePresentation';
import DiscordGuildsApi from 'services/DiscordleService/DiscordleGuilds';
import FormDiscordleInstance from './components/FormDiscordleInstance';
import { IInstanceChannels } from 'services/DiscordleService/IDiscordleService';

export default function HomeContainer() {
  const router = useRouter();
  const [whichRender, setWhichRender] = useState<string>('gamePresentation');
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [instanceChannels, setInstanceChannels] = useState<IInstanceChannels[]>(
    []
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      setWindowWidth(window.innerWidth);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  function handleReload() {
    if (router.isReady) {
      const { guild_id } = router.query;

      if (guild_id) {
        DiscordGuildsApi.GetGuildById(guild_id.toString()).then((channels) => {
          setInstanceChannels(channels);
          setWhichRender('formDiscordleInstance');
        });
      }
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const { guild_id } = router.query;

      if (guild_id) {
        DiscordGuildsApi.GetGuildById(guild_id.toString()).then((channels) => {
          setInstanceChannels(channels);
          setWhichRender('formDiscordleInstance');
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const WhichRender = () => {
    switch (whichRender) {
      case 'gamePresentation':
        return windowWidth && <GamePresentation width={windowWidth} />;
      default:
        return (
          windowWidth && (
            <FormDiscordleInstance
              width={windowWidth}
              handleReload={handleReload}
              instanceChannels={instanceChannels}
            />
          )
        );
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Discordle | Home</title>
      </Head>

      {WhichRender()}
    </Fragment>
  );
}
