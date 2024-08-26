import React from 'react';
import { styled } from '@stitches/react';

const ProfileContainer = styled('div', {
  padding: '20px',
});

const Title = styled('h1', {
  fontFamily: 'var(--font-pro)',
  fontSize: '24px',
  fontWeight: 590,
  color: '#FFFFFF',
  marginBottom: '20px',
});

const ProfileInfo = styled('div', {
  color: '#FFFFFF',
  fontSize: '16px',
  lineHeight: '1.5',
});

const ProfileField = styled('p', {
  marginBottom: '10px',
});

const Profile: React.FC = () => {
  return (
    <ProfileContainer>
      <Title>User Profile</Title>
      <ProfileInfo>
        <ProfileField>Name: John Doe</ProfileField>
        <ProfileField>Email: john.doe@example.com</ProfileField>
        <ProfileField>Joined: January 1, 2023</ProfileField>
      </ProfileInfo>
    </ProfileContainer>
  );
};

export default Profile;
