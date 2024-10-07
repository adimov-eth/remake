import React, { useState, useRef, useCallback, useEffect } from 'react';

import CoinPNG from '@shared/assets/main-page-coin.png';
import CoinWebP from '@shared/assets/main-page-coin.webp';

import { LowTierCoinCanvas } from './LowTierCoinCanvas';

interface CoinProps {
  touchAreaRef: React.RefObject<HTMLDivElement>
}

export const LowTierCoin: React.FC<CoinProps> = ({ touchAreaRef }) => {
  const [loaded, setLoaded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const map = (
    val: number,
    minA: number,
    maxA: number,
    minB: number,
    maxB: number
  ) => {
    return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
  };

  const applyCard3DEffect = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = x - rect.left;
    const mouseY = y - rect.top;
    const rotateY = map(mouseX, 0, width, -30, 30);
    const rotateX = map(mouseY, 0, height, 30, -30);
    const brightness = map(mouseY, 0, height, 1.5, 0.5);

    canvas.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    canvas.style.filter = `brightness(${brightness})`;
  }, []);

  const resetCardEffect = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.transform = 'rotateX(0deg) rotateY(0deg)';
    canvas.style.filter = 'brightness(1)';
  }, []);

  const toggleCardEffect = useCallback(
    (event: Touch) => {
      setIsActive((prev) => !prev);
      if (!isActive) {
        applyCard3DEffect(event.clientX, event.clientY);
      } else {
        resetCardEffect();
      }
    },
    [isActive, applyCard3DEffect, resetCardEffect]
  );

  const handleMouseDown = useCallback(
    (event: Touch) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.style.transform = 'scale(1.03)';
      toggleCardEffect(event);
    },
    [toggleCardEffect]
  );

  const handleMouseUp = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.transform = 'scale(1)';
  }, []);

  const handleCanvasInited = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
    const image = new Image();

    // Try loading WebP first
    image.src = CoinWebP;

    image.onload = () => {
      imageRef.current = image;
      setLoaded(true);
    };

    image.onerror = () => {
      // If WebP fails, fallback to PNG
      image.src = CoinPNG;
      image.onload = () => {
        imageRef.current = image;
        setLoaded(true);
      };
    };
  }, []);

  const renderCoin = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const touchArea = touchAreaRef.current;

    if (!touchArea) return;

    const parentRect = touchArea.getBoundingClientRect();
    const size = Math.min(parentRect.width, parentRect.height) * 1.1;
    const x = parentRect.left + (parentRect.width - size) / 2;
    const y = parentRect.top + (parentRect.height - size) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y, size, size);
  }, []);

  useEffect(() => {
    if (loaded) renderCoin();
  
    return () => {
      const image = imageRef.current;
      if (image) {
        image.onload = null;
        image.onerror = null;
      }
    };
  }, [loaded, renderCoin]);

  return (
    <LowTierCoinCanvas
      touchAreaRef={touchAreaRef}
      onCanvasInited={handleCanvasInited}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onResize={renderCoin}
      style={{ transition: 'all 200ms ease-in-out' }}
    />
  );
};
