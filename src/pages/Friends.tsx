//@ts-ingnore

 

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

