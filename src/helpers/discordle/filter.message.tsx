import { IMessage } from 'services/DiscordleService/IDiscordleService';
import { FilterMessageEnum, MessageLevelEnum } from './filterMessageEnum';
import { Image } from 'antd_components';
import { EmbedTypeEnum } from './embedTypeEnum';
import { IChoosedMessage } from 'templates/discordleTemplates/game/components/ChoosedMessage/IChoosedMessage';

export default function filterMessage(
  message: IMessage,
  messageLevelParam: MessageLevelEnum
) {
  const response: IChoosedMessage = {
    messageType: FilterMessageEnum.isText,
    formattedAttachs: [] as JSX.Element[],
    urlLink: '',
    content: message.Content,
    id: message.Id,
    referencedMessage: message.ReferencedMessage,
    timestamp: message.Timestamp,
    messageLevel: messageLevelParam,
    author: message.Author,
  };

  if (message.Attachments.length) {
    response.messageType = FilterMessageEnum.isImage;

    message.Attachments.forEach(({ Url }, index) => {
      response.formattedAttachs.push(
        <Image
          preview={false}
          src={Url}
          alt={`image_${index}_muito_antiga_ou_corrompida`}
          height={500}
          width="100%"
        />
      );
    });
  }

  if (message.Content.includes('<@'))
    response.messageType = FilterMessageEnum.isText;

  if (message.Embeds.length) {
    response.messageType = FilterMessageEnum.isEmbed;

    message.Embeds.forEach(({ Video, Type }) => {
      switch (Type.toLowerCase()) {
        case EmbedTypeEnum.Gifv:
          response.formattedAttachs.push(
            <video
              height={Video.Height}
              src={Video.Url}
              loop
              autoPlay
              width="100%"
              muted
            />
          );
          break;
        case EmbedTypeEnum.Video:
          response.formattedAttachs.push(
            <iframe src={Video.Url} allowFullScreen height="100vh" />
          );
        default:
      }
    });
  }

  const includeLink =
    message.Content.includes('https://') || message.Content.includes('http://');

  if (
    message.Content.startsWith('https://tenor.com/view') ||
    message.Content.startsWith('https://www.youtube.com')
  )
    response.content = '';
  else if (includeLink) {
    response.messageType = FilterMessageEnum.isLink;

    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

    response.content = message.Content.replace(urlRegex, (content: string) => {
      let hyperlink = content;

      if (!hyperlink.match('^https?://')) hyperlink = 'http://' + hyperlink;

      response.urlLink = hyperlink;

      return hyperlink;
    });
  }

  if (message.Attachments.length && message.Content.length)
    response.messageType = FilterMessageEnum.isImageWithText;

  if (message.Attachments.length && includeLink)
    response.messageType = FilterMessageEnum.isImageWithTextAndLink;

  if (!message.Attachments.length && includeLink)
    response.messageType = FilterMessageEnum.isImageWithTextAndLink;

  return response;
}
