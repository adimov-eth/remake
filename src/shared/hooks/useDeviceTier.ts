import { useEffect, useState, useRef } from 'react';

const DEVICE_TIER_KEY = 'device_tier';

const useDeviceTier = () => {
  const [tier, setTier] = useState<'low' | 'high' | ''>(() => {
    return (localStorage.getItem(DEVICE_TIER_KEY) as 'low' | 'high') || '';
  });
  const hasRun = useRef(false);

  useEffect(() => {
    const categorizeDevice = async (): Promise<'low' | 'high'> => {
      const iterations: number = 1000000; // Increased iterations
      let result = 0;

      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        // More complex operation
        result += Math.sin(i) * Math.cos(i);
      }

      const endTime = performance.now();
      const performanceScore = endTime - startTime;
      console.log(performanceScore, 'performanceScore (ms)');

      // Prevent potential optimization
      if (result === Infinity) console.log('This should never happen');

      // Adjusted threshold based on new test
      return performanceScore < 40 ? 'high' : 'low';
    };

    const runCategorization = async () => {
      if (hasRun.current || tier) return;

      hasRun.current = true;
      const newTier = await categorizeDevice();
      setTier(newTier);
      localStorage.setItem(DEVICE_TIER_KEY, newTier);
    };

    runCategorization();
  }, [tier]);

  return tier;
};

export default useDeviceTier;
