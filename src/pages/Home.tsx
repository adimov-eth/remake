import React from 'react';

import {Page, Content, Header } from '@/components/Page'
import Clicker from '@/components/Clicker/Clicker/Clicker'

const Home: React.FC = () => {
  return (
    <Page>
      <Content>
          <Header></Header>
        <Clicker />
      </Content>
    </Page>
  );
};

export default Home;