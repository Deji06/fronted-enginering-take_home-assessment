import { usePortfolioStore } from '../store/usePortfolioStore';
import { calculatePnL, formatCurrency, formatPercent } from '../utils/finance';
import { useMemo } from 'react';

const Header = () => {
  const { assets, prices } = usePortfolioStore();

  // Derived state using useMemo for performance
  const stats = useMemo(() => {
    return assets.reduce(
      (acc, asset) => {
        const priceData = prices[asset.id];
        if (!priceData) return acc;

        const { currentValue, absolutePnL } = calculatePnL(asset, priceData.current_price);
        
        acc.totalValue += currentValue;
        acc.totalPnL += absolutePnL;
        return acc;
      },
      { totalValue: 0, totalPnL: 0 }
    );
  }, [assets, prices]);

  const totalCost = stats.totalValue - stats.totalPnL;
  const totalPercentage = totalCost !== 0 ? (stats.totalPnL / totalCost) * 100 : 0;
  const isPositive = stats.totalPnL >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <p className="text-sm text-gray-400">Total Balance</p>
        <p className="text-4xl font-bold">{formatCurrency(stats.totalValue)}</p>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <p className="text-sm text-gray-400">Total Profit / Loss</p>
        <div className="flex items-baseline space-x-2">
          <p className={`text-2xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {formatCurrency(stats.totalPnL)}
          </p>
          <p className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            ({formatPercent(totalPercentage)})
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;