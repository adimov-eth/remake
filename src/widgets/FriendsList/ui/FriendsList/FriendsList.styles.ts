import { styled } from '@stitches/react';
import CopyIconSVG from '@shared/assets/copy.svg?react'

export const FriendsContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});
  
export const FriendsTitle = styled('div', {
    fontFamily: 'var(--font-pro-display)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'white',
    marginBottom: '5px',
});
  
export const FriendsDesc = styled('div', {
    fontFamily: 'var(--font-pro-display)',
    fontSize: '10px',
    fontWeight: 400,
    color: 'white',
    marginBottom: '10px',
});
  
export const ReferralLink = styled('div', {
    background: '#14151E',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    gap: '10px',
    marginBottom: '12px',
});
  
export const ReferralLinkTitle = styled('div', {
    fontFamily: 'var(--font-pro-display)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
    color: '#67718C',
    marginBottom: '12px',
});
  
export const ReferralLinkInput = styled('input', {
    background: 'transparent',
    border: 'none',
    fontFamily: 'var(--font-pro-display)',
    fontSize: '16px',
    fontWeight: 500,
    color: 'white',
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    pointerEvents: 'none',
});
  
export const CopyButton = styled('div', {
    padding: '10px',
    background: '#1C1F30',
    borderRadius: '16px',
});
  
export const MembersContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});
  
export const CopyIcon = styled(CopyIconSVG, {
    width: '28px',
    height: '28px',
    '& path': {
      fill: '#333D5B',
    },
});