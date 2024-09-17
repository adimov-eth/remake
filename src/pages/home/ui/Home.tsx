import React from 'react';

import {Page, Content, Header } from '@/shared/ui/Page'
import Clicker from '@/shared/ui/Clicker/Clicker/Clicker'

export const Home: React.FC = () => {
  return (
    <Page>
      <Content>
          <Header></Header>
        <Clicker />
      </Content>
    </Page>
  );
};