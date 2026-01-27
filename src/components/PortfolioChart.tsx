import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { usePortfolioStore } from '../store/usePortfolioStore';

const COLORS = ['#F7931A', '#627EEA', '#14F195']; // BTC Orange, ETH Blue, SOL Green

const PortfolioChart = () => {
  const { assets, prices } = usePortfolioStore();

  const data = assets.map((asset) => ({
    name: asset.symbol,
    value: asset.quantity * (prices[asset.id]?.current_price || 0),
  })).filter(item => item.value > 0);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Value']}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;