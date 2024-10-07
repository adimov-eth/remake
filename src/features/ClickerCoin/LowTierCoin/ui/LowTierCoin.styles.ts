import { styled, keyframes } from '@app/stitches.config';

const moveUp = keyframes({
    '0%': {
        opacity: 1,
        transform: 'translateY(0) rotate(0deg)',
    },
    '100%': {
        opacity: 0,
        transform: 'translateY(-100px) rotate(-15deg)',
    }
});

const sparkle = keyframes({
    '0%, 100%': {
        textShadow: [
            '0 0 5px #ffce01',
            '0 0 10px #ffce01',
            '0 0 15px #ffce01',
        ].join(', '),
    },
    '50%': {
        textShadow: [
            '0 0 7px #ffce01',
            '0 0 12px #ffce01',
            '0 0 18px #ffce01',
        ].join(', '),
    },
});

export const Canvas = styled('canvas', {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
});

export const QuarkNotifier = {
    position: 'fixed',
    zIndex: 9999,
    color: '#ffffff',
    fontSize: '44px',
    fontWeight: 'bold',
    animation: `${moveUp} 2s ease-out forwards, ${sparkle} 2s ease-out forwards`,
    userSelect: 'none',
    textShadow: [
        '0 0 10px #ffce01',
        '0 0 20px #ffce01',
        '0 0 30px #ffce01',
        '0 0 40px #ffce01',
        '0 0 50px #ff4500',
        '0 0 60px #ff4500',
        '0 0 70px #ff4500',
        '0 0 80px #00ffcc',
        '0 0 90px #00ffcc',
    ].join(', '),
    transform: 'rotate(15deg)',
    pointerEvents: 'none',
};