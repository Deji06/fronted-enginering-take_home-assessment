import { usePortfolioStore } from '../store/usePortfolioStore';
import { calculatePnL, formatCurrency, formatPercent } from '../utils/finance';

const AssetTable = () => {
  const { assets, prices } = usePortfolioStore();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-gray-700">
            <th className="pb-4 font-medium">Asset</th>
            <th className="pb-4 font-medium">Price</th>
            <th className="pb-4 font-medium">Holdings</th>
            <th className="pb-4 font-medium text-right">P&L</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {assets.map((asset) => {
            const priceData = prices[asset.id];
            const { currentValue, absolutePnL, percentagePnL } = priceData 
              ? calculatePnL(asset, priceData.current_price)
              : { currentValue: 0, absolutePnL: 0, percentagePnL: 0 };

            return (
              <tr key={asset.id} className="group hover:bg-gray-750 transition-colors">
                <td className="py-4">
                  <div className="font-bold">{asset.name}</div>
                  <div className="text-xs text-gray-500">{asset.symbol}</div>
                </td>
                <td className="py-4">
                  {priceData ? formatCurrency(priceData.current_price) : 'Loading...'}
                </td>
                <td className="py-4">
                  <div>{asset.quantity} {asset.symbol}</div>
                  <div className="text-xs text-gray-500">{formatCurrency(currentValue)}</div>
                </td>
                <td className="py-4 text-right">
                  <div className={absolutePnL >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {formatCurrency(absolutePnL)}
                  </div>
                  <div className={`text-xs ${absolutePnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatPercent(percentagePnL)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;