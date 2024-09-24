import { styled } from '@app/stitches.config';
import { AppRoot, FixedLayout } from '@telegram-apps/telegram-ui';

export const Root = styled(AppRoot, {});

export const Main = styled('main', {
    padding: '110px 16px 114px',
    overflowY: 'auto',
});

export const Top = styled(FixedLayout, { zIndex: 100 });
export const Bottom = styled(FixedLayout, { zIndex: 100 });