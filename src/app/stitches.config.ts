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
      small: '1rem',
      medium: '1.6875rem',
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

export const floatingAnimation = keyframes({
  '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
  '10%': { transform: 'translate(15px, -10px) rotate(5deg)' },
  '20%': { transform: 'translate(-10px, 15px) rotate(-3deg)' },
  '30%': { transform: 'translate(20px, 5px) rotate(4deg)' },
  '40%': { transform: 'translate(-15px, -20px) rotate(-2deg)' },
  '50%': { transform: 'translate(10px, 20px) rotate(3deg)' },
  '60%': { transform: 'translate(-20px, 10px) rotate(-4deg)' },
  '70%': { transform: 'translate(15px, -15px) rotate(2deg)' },
  '80%': { transform: 'translate(-5px, 15px) rotate(-3deg)' },
  '90%': { transform: 'translate(20px, -5px) rotate(4deg)' },
});

export const progressBarAnimation = keyframes({
  '0%': { background: 'conic-gradient($colors$progressStart 0%, $colors$progressStart 100%)' },
  '100%': { background: 'conic-gradient(transparent ${progress}%, ${color} ${progress}%)' },
});

export const fadeInAnimation = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const fadeOutAnimation = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

export const modalOpenAnimation = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.8)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});

export const modalCloseAnimation = keyframes({
  '0%': { opacity: 1, transform: 'scale(1)' },
  '100%': { opacity: 0, transform: 'scale(0.8)' },
});

export const floatCloseAnimation = keyframes({
  '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
  '10%': { transform: 'translate(15px, -10px) rotate(5deg)' },
  '20%': { transform: 'translate(-10px, 15px) rotate(-3deg)' },
  '30%': { transform: 'translate(20px, 5px) rotate(4deg)' },
  '40%': { transform: 'translate(-15px, -20px) rotate(-2deg)' },
  '50%': { transform: 'translate(10px, 20px) rotate(3deg)' },
  '60%': { transform: 'translate(-20px, 10px) rotate(-4deg)' },
  '70%': { transform: 'translate(15px, -15px) rotate(2deg)' },
  '80%': { transform: 'translate(-5px, 15px) rotate(-3deg)' },
  '90%': { transform: 'translate(20px, -5px) rotate(4deg)' },
});

export const floatFarAnimation = keyframes({
  '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
  '10%': { transform: 'translate(5px, -2px) rotate(2deg)' },
  '20%': { transform: 'translate(0px, 3px) rotate(-1deg)' },
  '30%': { transform: 'translate(5px, 0px) rotate(2deg)' },
  '40%': { transform: 'translate(-3px, -7px) rotate(-1deg)' },
  '50%': { transform: 'translate(2px, 8px) rotate(1deg)' },
  '60%': { transform: 'translate(-6px, 2px) rotate(-2deg)' },
  '70%': { transform: 'translate(5px, -5px) rotate(1deg)' },
  '80%': { transform: 'translate(0px, 4px) rotate(-1deg)' },
  '90%': { transform: 'translate(6px, 0px) rotate(2deg)' },
});

export const slideUp = keyframes({
  '0%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0)' },
});

export const slideDown = keyframes({
  '0%': { transform: 'translateY(0)' },
  '100%': { transform: 'translateY(100%)' },
});