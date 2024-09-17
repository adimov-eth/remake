import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
  theme: {
    colors: {
      background: '#1C1F30',
      cardBackground: '#14151E',
      progressStart: 'rgb(97, 87, 226)',
      progressEnd: 'rgb(247, 10, 129)',
      navBorder: '#1a1c28',
      navBackground: 'rgba(43, 46, 69, 0.3)',
      navShadow: 'rgba(0, 0, 0, 0.25)',
      navBorderGradientStart: 'rgba(255, 255, 255, 0.02)',
      navBorderGradientEnd: 'rgba(21, 24, 32, 0.1)',
      textInactive: '#5C6073',
      textActive: '#EBEBEB',
      swapGradientStart: '#1CE7FD',
      swapGradientEnd: '#365AE5',
      grey200: '#FFFFFF1C',
      white: 'white',
      red: 'red',
    },
    fonts: {
      pro: 'ui-sans-serif, "SF Pro", "Inter", "Noto Sans SC", "PingFang SC", "SF Pro Icons", "Arial", sans-serif',
      mono: 'ui-monospace, "SF Mono", "JetBrains Mono", "IBM Plex Mono", "Fira Code", "Roboto Mono", "Consolas", "Monaco", "Andale Mono", "Ubuntu Mono", monospace',
      proDisplay: '"SF Pro Display", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    fontSizes: {
      small: '12px',
      medium: '14px',
      large: '16px',
    },
    fontWeights: {
      medium: 500,
      semiBold: 600,
    },
    radii: {
      small: '16px',
      medium: '27px',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '32px',
    },
  },
  media: {
    // Add any responsive breakpoints if needed
  },
  utils: {
    // Add any custom utils if needed
  },
});

export const shineAnimation = keyframes({
  '0%': { left: '-100%', transitionProperty: 'left' },
  '12%, 100%': { left: '100%', transitionProperty: 'left' },
});