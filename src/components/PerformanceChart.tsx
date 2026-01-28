import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { usePortfolioStore } from "../store/usePortfolioStore";

const PerformanceChart = () => {
  const { assets, prices } = usePortfolioStore();

  // Mocking historical data points for the last 7 days
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = days.map((day) => {
    const dataPoint: any = { name: day };
    assets.forEach(
      (asset) => {
        const currentPrice = prices[asset.id]?.current_price || 0;
        // Generate a slight variation for mock history
        const variation = 1 + (Math.random() * 0.1 - 0.05);
        dataPoint[asset.symbol] = (
          asset.quantity *
          currentPrice *
          variation
        ).toFixed(2);
      },
      [prices, assets],
    );
    return dataPoint;
  });

  return (
    <div className="h-85 w-full bg-gray-800 p-4 rounded-2xl border border-gray-700 pb-7">
      <h3 className="text-gray-400 text-sm mb-4 font-medium">
        Portfolio Performance (7D Overlay)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
            }}
            itemStyle={{ fontSize: "12px" }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingBottom: "20px", fontSize: "12px" }}
          />
          {assets.map((asset, index) => (
            <Line
              key={asset.id}
              type="monotone"
              dataKey={asset.symbol}
              stroke={
                index === 0 ? "#F7931A" : index === 1 ? "#627EEA" : "#14F195"
              }
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
