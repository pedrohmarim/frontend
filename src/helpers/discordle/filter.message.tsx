import { IMessage } from 'services/DiscordleService/IDiscordleService';
import { MessageTypeEnum, MessageLevelEnum } from './filterMessageEnum';
import { Image } from 'antd_components';
import { EmbedTypeEnum } from './embedTypeEnum';
import { IChoosedMessage } from 'templates/discordleTemplates/game/components/ChoosedMessage/IChoosedMessage';

export default function filterMessage(
  message: IMessage,
  messageLevelParam: MessageLevelEnum
) {
  const response: IChoosedMessage = {
    messageType: MessageTypeEnum.isText,
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
    response.messageType = MessageTypeEnum.isImage;

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
    response.messageType = MessageTypeEnum.isText;

  if (message.Embeds.length) {
    response.messageType = MessageTypeEnum.isEmbed;

    message.Embeds.forEach(({ Video, Type }) => {
      switch (Type.toLowerCase()) {
        case EmbedTypeEnum.Gifv:
          response.formattedAttachs.push(
            <video
              height="100%"
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
            <iframe
              src={Video.Url}
              allowFullScreen
              height="600px"
              width="100%"
            />
          );
        default:
      }
    });
  }

  const includeLink =
    message.Content.includes('https://') || message.Content.includes('http://');

  if (
    message.Content.startsWith('https://tenor.com/view') ||
    message.Content.startsWith('https://www.youtube.com') ||
    message.Content.startsWith('https://youtu.be')
  )
    response.content = '';
  else if (includeLink) {
    response.messageType = MessageTypeEnum.isLink;

    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

    response.content = message.Content.replace(urlRegex, (content: string) => {
      let hyperlink = content;

      if (!hyperlink.match('^https?://')) hyperlink = 'http://' + hyperlink;

      response.urlLink = hyperlink;

      return hyperlink;
    });
  }

  if (message.Attachments.length && message.Content.length)
    response.messageType = MessageTypeEnum.isImageWithText;

  if (message.Attachments.length && includeLink)
    response.messageType = MessageTypeEnum.isImageWithTextAndLink;

  if (!message.Attachments.length && includeLink)
    response.messageType = MessageTypeEnum.isImageWithTextAndLink;

  return response;
}
