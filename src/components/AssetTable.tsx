import { usePortfolioStore } from '../store/usePortfolioStore';
import AssetRow from './AssetRow';

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
        <tbody className="divide-y divide-gray-800">
          {assets.map((asset) => (
            <AssetRow 
              key={asset.id} 
              asset={asset} 
              priceData={prices[asset.id]} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;