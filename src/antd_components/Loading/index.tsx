import * as S from './styles';
import loadingAnimation from 'assets/loadingAnimation.json';

function Loader() {
  return (
    <S.ScreenBlocker id="loader">
      <S.Content>
        <S.LottieContainer animationData={loadingAnimation} />
        <S.Span>Carregando . . .</S.Span>
      </S.Content>
    </S.ScreenBlocker>
  );
}

export default Loader;
