import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
  theme: {
    colors: {
      background: '#1C1F30',
      progressStart: 'rgb(97, 87, 226)',
      progressEnd: 'rgb(247, 10, 129)',
    },
    fonts: {
      proDisplay: 'var(--font-pro-display)',
    },
  },
});