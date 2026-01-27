import { usePortfolioStore } from '../store/usePortfolioStore';

const StatusBanner = () => {
  const { error, loading, prices } = usePortfolioStore();

  // If there's an error from the API
  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded-lg mb-6 text-sm flex justify-between items-center">
        <span>⚠️ Error fetching live prices: {error}</span>
        <button onClick={() => window.location.reload()} className="underline font-bold">Retry</button>
      </div>
    );
  }

  // If we have assets but prices failed to load (Partial State)
  const priceCount = Object.keys(prices).length;
  if (priceCount === 0 && !loading) {
    return (
      <div className="bg-yellow-900/50 border border-yellow-500 text-yellow-200 px-4 py-2 rounded-lg mb-6 text-sm">
        🔸 Partial Data: Displaying holdings, but live prices are currently unavailable.
      </div>
    );
  }

  return null;
};

export default StatusBanner;