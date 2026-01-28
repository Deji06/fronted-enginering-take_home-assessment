import React from 'react';
import type { Asset, CoinPrice } from '../types';
import { calculatePnL, formatCurrency, formatPercent } from '../utils/finance';

interface AssetRowProps {
  asset: Asset;
  priceData: CoinPrice | undefined;
}

const AssetRow = React.memo(({ asset, priceData }: AssetRowProps) => {
  const { currentValue, absolutePnL, percentagePnL } = priceData 
    ? calculatePnL(asset, priceData.current_price)
    : { currentValue: 0, absolutePnL: 0, percentagePnL: 0 };

  return (
    <tr className="group hover:bg-gray-750 transition-colors border-b border-gray-700/50">
      <td className="py-4">
        <div className="font-bold">{asset.name}</div>
        <div className="text-xs text-gray-500">{asset.symbol}</div>
      </td>
      <td className="py-4">
        {priceData ? formatCurrency(priceData.current_price) : (
          <span className="text-gray-600 italic text-sm">Fetching...</span>
        )}
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
});

export default AssetRow;