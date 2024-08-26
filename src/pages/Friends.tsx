import React from 'react';
import { styled } from '@stitches/react';

const FriendsContainer = styled('div', {
  padding: '20px',
});

const Title = styled('h1', {
  fontFamily: 'var(--font-pro)',
  fontSize: '24px',
  fontWeight: 590,
  color: '#FFFFFF',
  marginBottom: '20px',
});

const FriendsList = styled('ul', {
  listStyle: 'none',
  padding: 0,
});

const FriendItem = styled('li', {
  color: '#FFFFFF',
  padding: '10px',
  borderBottom: '1px solid #333',
  '&:last-child': {
    borderBottom: 'none',
  },
});

const Friends: React.FC = () => {
  const friends = ['Alice', 'Bob', 'Charlie', 'David'];

  return (
    <FriendsContainer>
      <Title>Friends</Title>
      <FriendsList>
        {friends.map((friend, index) => (
          <FriendItem key={index}>{friend}</FriendItem>
        ))}
      </FriendsList>
    </FriendsContainer>
  );
};

export default Friends;
