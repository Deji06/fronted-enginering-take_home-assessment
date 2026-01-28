import { useEffect, useRef } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { fetchLivePrices } from '../services/coinGecko';

export const usePriceSync = (intervalMs = 30000) => {
  const { assets, setPrices, setLoading, setError } = usePortfolioStore();
  const timerRef = useRef<number | null>(null);

  const updatePrices = async () => {
    if (assets.length === 0) return;
    
    try {
      const coinIds = assets.map(a => a.id);
      const newPrices = await fetchLivePrices(coinIds);
      
      setPrices(newPrices);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    updatePrices();

    // Set up polling interval
    timerRef.current = window.setInterval(updatePrices, intervalMs);

    // Cleanup to prevent memory leaks
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [assets]);
};