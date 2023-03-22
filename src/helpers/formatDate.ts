import DiscordMessagesApi from 'services/DiscordMessages';

export default function formatDate(
  timer: string,
  setTimer: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  const hour = Number(timer.split(':')[0]);
  const minute = Number(timer.split(':')[1]);
  const seconds = Number(timer.split(':')[2]);

  const dataFinal = new Date();
  dataFinal.setHours(dataFinal.getHours() + hour);
  dataFinal.setMinutes(dataFinal.getMinutes() + minute);
  dataFinal.setSeconds(dataFinal.getSeconds() + seconds);

  const x = setInterval(async () => {
    const agora = new Date().getTime();
    const tempoRestante = dataFinal.getTime() - agora;
    const hh = Math.floor(
      (tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mm = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const ss = Math.floor((tempoRestante % (1000 * 60)) / 1000);

    setTimer(`${hh}h ${mm}m ${ss}s`);

    if (tempoRestante < 0) {
      clearInterval(x);

      const timer = await DiscordMessagesApi.GetTimer();

      return formatDate(timer, setTimer);
    }
  }, 1000);
}
