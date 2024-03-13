import * as S from './styles';
import Animation from 'assets/discordLoad.json';

function Loader() {
  return (
    <S.ScreenBlocker id="loader">
      <S.Content>
        <S.LottieContainer animationData={Animation} />
      </S.Content>
    </S.ScreenBlocker>
  );
}

export default Loader;
