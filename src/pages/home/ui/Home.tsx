import React from 'react';

import { Page } from '@shared/ui/Page';
import { Content } from '@shared/ui/Content';
import { Clicker } from '@widgets/Clicker';

export const Home: React.FC = () => {
  return (
    <Page>
      <Content>
        <Clicker />
      </Content>
    </Page>
  );
};