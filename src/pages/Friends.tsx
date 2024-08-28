//@ts-ingnore

/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';

import {Page, Banner, Content, Gradient, Title} from '@/components/Page'

import FriendsList from '@/components/FriendsList'

const Friends: React.FC = () => {
  return (
    <Page>
      <Banner>
        <Gradient color="purple"/>
        <Title>Friends</Title>
      </Banner>
      <Content>
        <FriendsList />
      </Content>
    </Page>
  );
};

export default Friends;

