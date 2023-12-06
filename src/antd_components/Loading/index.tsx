import * as S from './styles';

function Loader() {
  return (
    <S.ScreenBlocker id="loader">
      <S.Content>
        <S.Loader />
        <S.Span>Carregando . . .</S.Span>
      </S.Content>
    </S.ScreenBlocker>
  );
}

export default Loader;
