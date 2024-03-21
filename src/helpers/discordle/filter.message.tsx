import { IMessage } from 'services/DiscordleService/IDiscordleService';
import { FilterMessageEnum, IFilterMessageResponse } from './filterMessageEnum';
import { Image } from 'antd_components';
import { EmbedTypeEnum } from './embedTypeEnum';

export default function filterMessage(message: IMessage) {
  const emptyContent: JSX.Element[] = [];
  const emptyMessage = {} as IMessage;

  const response: IFilterMessageResponse = {
    messageType: FilterMessageEnum.isText,
    formattedAttachs: emptyContent,
    urlLink: '',
    message: emptyMessage,
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

  if (message.Content.includes('<@')) {
    response.messageType = FilterMessageEnum.isText;

    message.Mentions.map(({ Username, Id }) => {
      message.Content = message.Content.replaceAll(`<@${Id}>`, `@${Username}`);
    });
  }

  if (message.Embeds.length) {
    response.messageType = FilterMessageEnum.isEmbed;

    if (
      message.Content.startsWith('https://tenor.com/view') ||
      message.Content.startsWith('https://www.youtube.com')
    )
      message.Content = '';

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

  if (includeLink) {
    response.messageType = FilterMessageEnum.isLink;

    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

    message.Content = message.Content.replace(urlRegex, (content: string) => {
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

  response.message = message;

  return response;
}
