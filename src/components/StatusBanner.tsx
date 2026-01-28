import { useEffect, useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

const StatusBanner = () => {
  const { error, loading, prices, lastUpdated, assets } = usePortfolioStore();
  const [now, setNow] = useState(Date.now());

  // Update a local 'now' timer to catch staleness in real-time
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(timer);
  }, []);

  if (error) {
    return (
      <div className="bg-red-900/40 border border-red-500 text-red-200 px-4 py-3 rounded-xl mb-6 flex justify-between items-center animate-pulse">
        <span className="flex items-center gap-2"><strong>API Error:</strong> {error}</span>
        <button onClick={() => window.location.reload()} className="bg-red-500/20 hover:bg-red-500/40 px-3 py-1 rounded-lg text-xs font-bold transition-all">Retry Now</button>
      </div>
    );
  }

  // MANDATORY: Partial Data State (Prices fetched, but portfolio/assets missing)
  // Or vice versa: Assets exist, but price object is empty
  if (assets.length > 0 && Object.keys(prices).length === 0 && !loading) {
    return (
      <div className="bg-yellow-900/30 border border-yellow-600 text-yellow-200 px-4 py-3 rounded-xl mb-6">
        🔸 <strong>Partial Data:</strong> Your holdings are visible, but we can't reach the price servers. P&L values are estimates.
      </div>
    );
  }

  // MANDATORY: Stale Data State (Data is older than 75 seconds)
  const isStale = lastUpdated && now - lastUpdated > 75000;
  if (isStale && !loading) {
    return (
      <div className="bg-blue-900/30 border border-blue-500 text-blue-200 px-4 py-3 rounded-xl mb-6 flex justify-between items-center">
        <span className="flex items-center gap-2">⏱️ <strong>Data is Stale:</strong> Last update was over a minute ago. Check your connection.</span>
        <span className="text-xs opacity-60">Live updates paused</span>
      </div>
    );
  }

  return null;
};

export default StatusBanner;