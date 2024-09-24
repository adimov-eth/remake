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

export const pathsAnimation = keyframes({
  '0%': { 
    clipPath: `polygon(
      0% 43%,
      83% 43%,
      83% 22%,
      23% 22%,
      23% 24%,
      91% 24%,
      91% 26%,
      18% 26%,
      18% 83%,
      29% 83%,
      29% 17%,
      41% 17%,
      41% 39%,
      18% 39%,
      18% 82%,
      54% 82%,
      54% 88%,
      19% 88%,
      19% 4%,
      39% 4%,
      39% 14%,
      76% 14%,
      76% 52%,
      23% 52%,
      23% 35%,
      19% 35%,
      19% 8%,
      36% 8%,
      36% 31%,
      73% 31%,
      73% 16%,
      1% 16%,
      1% 56%,
      50% 56%,
      50% 8%
    )` 
  },
  '5%': {
    clipPath: `polygon(
      0% 29%,
      44% 29%,
      44% 83%,
      94% 83%,
      94% 56%,
      11% 56%,
      11% 64%,
      94% 64%,
      94% 70%,
      88% 70%,
      88% 32%,
      18% 32%,
      18% 96%,
      10% 96%,
      10% 62%,
      9% 62%,
      9% 84%,
      68% 84%,
      68% 50%,
      52% 50%,
      52% 55%,
      35% 55%,
      35% 87%,
      25% 87%,
      25% 39%,
      15% 39%,
      15% 88%,
      52% 88%
    )`
  },
  '30%': {
    clipPath: `polygon(
      0% 53%,
      93% 53%,
      93% 62%,
      68% 62%,
      68% 37%,
      97% 37%,
      97% 89%,
      13% 89%,
      13% 45%,
      51% 45%,
      51% 88%,
      17% 88%,
      17% 54%,
      81% 54%,
      81% 75%,
      79% 75%,
      79% 76%,
      38% 76%,
      38% 28%,
      61% 28%,
      61% 12%,
      55% 12%,
      55% 62%,
      68% 62%,
      68% 51%,
      0% 51%,
      0% 92%,
      63% 92%,
      63% 4%,
      65% 4%
    )`
  },
  '45%': {
    clipPath: `polygon(
      0% 33%,
      2% 33%,
      2% 69%,
      58% 69%,
      58% 94%,
      55% 94%,
      55% 25%,
      33% 25%,
      33% 85%,
      16% 85%,
      16% 19%,
      5% 19%,
      5% 20%,
      79% 20%,
      79% 96%,
      93% 96%,
      93% 50%,
      5% 50%,
      5% 74%,
      55% 74%,
      55% 57%,
      96% 57%,
      96% 59%,
      87% 59%,
      87% 65%,
      82% 65%,
      82% 39%,
      63% 39%,
      63% 92%,
      4% 92%,
      4% 36%,
      24% 36%,
      24% 70%,
      1% 70%,
      1% 43%,
      15% 43%,
      15% 28%,
      23% 28%,
      23% 71%,
      90% 71%,
      90% 86%,
      97% 86%,
      97% 1%,
      60% 1%,
      60% 67%,
      71% 67%,
      71% 91%,
      17% 91%,
      17% 14%,
      39% 14%,
      39% 30%,
      58% 30%,
      58% 11%,
      52% 11%,
      52% 83%,
      68% 83%
    )`
  },
  '76%': {
    clipPath: `polygon(
      0% 26%,
      15% 26%,
      15% 73%,
      72% 73%,
      72% 70%,
      77% 70%,
      77% 75%,
      8% 75%,
      8% 42%,
      4% 42%,
      4% 61%,
      17% 61%,
      17% 12%,
      26% 12%,
      26% 63%,
      73% 63%,
      73% 43%,
      90% 43%,
      90% 67%,
      50% 67%,
      50% 41%,
      42% 41%,
      42% 46%,
      50% 46%,
      50% 84%,
      96% 84%,
      96% 78%,
      49% 78%,
      49% 25%,
      63% 25%,
      63% 14%
    )`
  },
  '90%': {
    clipPath: `polygon(
      0% 41%,
      13% 41%,
      13% 6%,
      87% 6%,
      87% 93%,
      10% 93%,
      10% 13%,
      89% 13%,
      89% 6%,
      3% 6%,
      3% 8%,
      16% 8%,
      16% 79%,
      0% 79%,
      0% 99%,
      92% 99%,
      92% 90%,
      5% 90%,
      5% 60%,
      0% 60%,
      0% 48%,
      89% 48%,
      89% 13%,
      80% 13%,
      80% 43%,
      95% 43%,
      95% 19%,
      80% 19%,
      80% 85%,
      38% 85%,
      38% 62%
    )`
  },
  '1%, 7%, 33%, 47%, 78%, 93%': {
    clipPath: 'none'
  }
});

export const opacityAnimation = keyframes({
  '0%': {
    opacity: '0.1',
  },

  '5%': {
    opacity: '0.7',
  },

  '30%': {
    opacity: '0.4',
  },

  '45%': {
    opacity: '0.6',
  },

  '76%': {
    opacity: '0.4',
  },

  '90%': {
    opacity: '0.8',
  },

  '1%, 7%, 33%, 47%, 78%, 93%': {
    opacity: '0',
  }
});

export const fontAnimation = keyframes({
  '0%': {
    fontWeight: 100,
    color: '#2A9EF1',
    filter: 'blur(3px)',
  },
  '20%': {
    fontWeight: 500,
    color: '#fff',
    filter: 'blur(0)',
  },
  '50%': {
    fontWeight: 300,
    color: '#F70A81',
    filter: 'blur(2px)',
  },
  '60%': {
    fontWeight: 700,
    color: '#fff',
    filter: 'blur(0)',
  },
  '90%': {
    fontWeight: 500,
    color: '#2A9EF1',
    filter: 'blur(6px)',
  }
});

export const movementAnimation = keyframes({
  '0%': {
    top: '0px',
    left: '-20px',
  },
  '15%': {
    top: '10px',
    left: '10px',
  },
  '60%': {
    top: '5px',
    left: '-10px',
  },
  '75%': {
    top: '-5px',
    left: '20px',
  },
  '100%': {
    top: '10px',
    left: '5px',
  }
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
})

export const fadeOutAnimation = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
})

export const modalOpenAnimation = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.8)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
})

export const modalCloseAnimation = keyframes({
  '0%': { opacity: 1, transform: 'scale(1)' },
  '100%': { opacity: 0, transform: 'scale(0.8)' },
})

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
})

export const slideDown = keyframes({
  '0%': { transform: 'translateY(0)' },
  '100%': { transform: 'translateY(100%)' },
})