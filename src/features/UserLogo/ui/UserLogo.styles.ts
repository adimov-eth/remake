import { styled } from '@stitches/react';
import { AutoSizeText } from '@shared/ui/AutoSizeText'
import { UserIcon } from '@shared/assets/icons'

export const UserLogoRoot = styled('div', {
    maxWidth: '132px',
    background: '#1C1F30',
    borderRadius: '32px',
    padding: '18px 28px 27px',
    marginBottom: '8px',
})

export const UserLogoWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
});

export const UserLogoUsername = styled(AutoSizeText, {
    fontFamily: 'var(--font-pro-display)',
    fontWeight: 500,
    textAlign: 'center',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'inline-block',
    width: 'fit-content',
    fontSize: '14px',
    color: 'white',
});

export const UserLogoIcon = styled(UserIcon, {
    minWidth: '64px',
    minHeight: '64px',
    svg: {
        minWidth: '64px',
        minHeight: '64px',
    }
});
