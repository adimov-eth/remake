import { styled } from '@app/stitches.config';
// import { AppRoot, FixedLayout } from '@telegram-apps/telegram-ui';

// export const Root = styled(AppRoot, {});

// export const Main = styled('main', {
//     padding: '110px 16px 114px',
//     overflowY: 'auto',
// });

// export const Top = styled(FixedLayout, { zIndex: 100 });
// export const Bottom = styled(FixedLayout, { zIndex: 100 });

export const Root = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
});

export const Top = styled('div', {
  position: 'relative',
  zIndex: 2,
});

export const Main = styled('main', {
  position: 'relative',
  padding: '1.875rem 1rem 0',
  flexGrow: 1,
  overflowY: 'auto',
});

export const Bottom = styled('div', {
  position: 'relative',
  zIndex: 2,
});
