import React, { Fragment } from 'react';
import MembersSelect from 'templates/discordleTemplates/globalComponents/membersSelect';
import { Divider } from 'antd_components';

export default function MembersConfig() {
  return (
    <Fragment>
      <MembersSelect fromChooseprofile={false} />

      <Divider
        style={{
          borderColor: 'rgba(255, 255, 255, 0.1)',
          marginTop: '22.5px',
        }}
      />
    </Fragment>
  );
}
