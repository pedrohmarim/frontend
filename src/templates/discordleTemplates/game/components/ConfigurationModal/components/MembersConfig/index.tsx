import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Avatar,
  Button,
  Divider,
  Notification,
  Row,
  Select,
} from 'antd_components';
import { useTranslation } from 'react-i18next';
import { IMember } from 'services/DiscordleService/IDiscordleService';
import * as S from './styles';
import DiscordMembersApi from 'services/DiscordleService/DiscordleMembers';
import { Form } from 'antd';
import theme from 'globalStyles/theme';
import Swal from 'sweetalert2';

export default function MembersConfig() {
  const router = useRouter();
  const { t } = useTranslation('GuildInfo');

  const [members, setMembers] = useState<IMember[]>([]);

  const [membersSelected, setMembersSelected] = useState<string[]>([]);

  useEffect(() => {
    if (router.isReady) {
      const { channelId, code, guildId } = router.query;

      if (channelId && code && guildId) {
        DiscordMembersApi.GetAllChannelMembersForSelectComponent(
          guildId.toString(),
          channelId.toString(),
          code.toString()
        ).then(({ Members, MembersIdsSelected }) => {
          setMembers(Members);
          setMembersSelected(MembersIdsSelected);
        });
      }
    }
  }, [router]);

  const handleDeselect = (memberId: string) => {
    const isOwner = members.find((x) => x.Id.includes(memberId))?.IsOwner;

    if (isOwner) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'O dono do servidor sempre precisa estar presente na instância.',
        confirmButtonText: 'OK',
        allowOutsideClick: true,
      });

      setMembersSelected([...membersSelected]);
    }
  };

  const handleChange = (value: unknown) => {
    const selectedIds = Array.isArray(value) ? value : [];
    setMembersSelected(selectedIds);
  };

  function onSubmit() {
    if (membersSelected.length === 0)
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Selecione pelo menos um usuário',
        confirmButtonText: 'OK',
        allowOutsideClick: true,
      });

    if (router.isReady) {
      const { channelId, code, guildId } = router.query;

      if (channelId && code && guildId) {
        Swal.fire({
          icon: 'warning',
          title: 'Atenção',
          text: 'Usuários serão adicionados e removidos da instância, os removidos perderão os seus pontos no ranking! E caso um membro removido tiver uma mensagem escolhida na instância atual, a instância será resetada!',
          confirmButtonText: 'Quero continuar',
          cancelButtonText: 'Cancelar',
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            DiscordMembersApi.UpdateChannelMembers(
              guildId.toString(),
              channelId.toString(),
              code.toString(),
              membersSelected
            ).then(() =>
              Notification.success('Succeso', 'Lista de membros atualizada.')
            );
          }
        });
      }
    }
  }

  const CrownIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      id="Crown--Streamline-Core.svg"
      height="14"
      width="14"
    >
      <desc>Crown Streamline Icon: https://streamlinehq.com</desc>
      <g id="crown--reward-social-rating-media-queen-vip-king-crown">
        <path
          id="Union"
          fill="#8a00c2"
          fillRule="evenodd"
          d="M7.40962 1.71327C7.31605 1.57961 7.16316 1.5 7 1.5c-0.16316 0 -0.31605 0.07961 -0.40962 0.21327L3.43215 6.22504 0.853553 3.64645c-0.142999 -0.143 -0.358058 -0.18578 -0.544895 -0.10839C0.121821 3.61545 0 3.79777 0 4v6.5c0 0.5304 0.210714 1.0391 0.585786 1.4142C0.960859 12.2893 1.46957 12.5 2 12.5h10c0.5304 0 1.0391 -0.2107 1.4142 -0.5858S14 11.0304 14 10.5V4c0 -0.20223 -0.1218 -0.38455 -0.3087 -0.46194 -0.1868 -0.07739 -0.4019 -0.03461 -0.5449 0.10839l-2.5785 2.57859 -3.15828 -4.51177Z"
          clipRule="evenodd"
          strokeWidth="1"
        />
      </g>
    </svg>
  );

  return (
    <Fragment>
      <Form layout="vertical">
        <Form.Item label="Lista de membros da instância do Discordle">
          <Select
            showSearch={false}
            mode="multiple"
            value={membersSelected}
            placeholder="Escolha os usuários que irão participar do Discordle"
            style={{ width: '100%' }}
            onDeselect={(memberId) => handleDeselect(memberId as string)}
            onChange={handleChange}
            notFoundContent={<Row justify="center">Sem dados</Row>}
            labelRender={({ value }) =>
              members.find((x) => x.Id.includes(value as string))?.Username
            }
            maxTagCount="responsive"
            options={members.map(
              ({ AvatarUrl, Username, IsOwner, Id }: IMember) => ({
                value: Id,
                label: (
                  <Row justify="start" align="middle">
                    <Avatar src={AvatarUrl} size={28} />
                    <S.Username>{Username}</S.Username>
                    {IsOwner && <CrownIcon />}
                  </Row>
                ),
              })
            )}
          />
        </Form.Item>
      </Form>

      <Row justify="center">
        <Button
          width="100%"
          backgroundcolor={theme.discordleColors.primary}
          color={theme.discordleColors.text}
          onClick={onSubmit}
        >
          Confirmar
        </Button>
      </Row>

      <Divider
        style={{
          borderColor: 'rgba(255, 255, 255, 0.1)',
          marginTop: '22.5px',
        }}
      />
    </Fragment>
  );
}
