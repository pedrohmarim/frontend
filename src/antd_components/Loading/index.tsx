import * as S from './styles';
import Animation from 'assets/discordLoad.json';

function Loader() {
  return (
    <S.ScreenBlocker id="loader">
      <S.Content>
        <S.LottieContainer animationData={Animation} />
        <S.LoadingDescription>
          Carregando, isso pode levar um tempo ...
        </S.LoadingDescription>
      </S.Content>
    </S.ScreenBlocker>
  );
}

export default Loader;
