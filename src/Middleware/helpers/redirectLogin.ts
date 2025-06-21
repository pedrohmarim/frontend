import Swal from 'sweetalert2';
import { deleteDiscordleToken } from 'utils/localStorage';

let redirectPromise: Promise<void> | null = null;

export function redirectLogin(description: string, language: string) {
  deleteDiscordleToken();

  if (!redirectPromise) {
    redirectPromise = new Promise<void>((resolve) => {
      Swal.fire({
        icon: 'error',
        title: language === 'en' ? 'Not authorized!' : 'Não autorizado!',
        text: description,
        confirmButtonText: 'OK',
        allowOutsideClick: true,
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          const params = new URLSearchParams(window.location.search);
          const guildId = params.get('guildId');
          const channelId = params.get('channelId');
          const code = params.get('code');
          const backRoute = encodeURIComponent(window.location.href);

          window.location.href = `/chooseProfile?channelId=${channelId}&guildId=${guildId}&code=${code}&backRoute=${backRoute}`;
        }

        resolve();
        redirectPromise = null;
      });
    });
  }

  return redirectPromise;
}
