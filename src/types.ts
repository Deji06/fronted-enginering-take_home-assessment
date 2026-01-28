export interface Asset {
  id: string;        // Unique ID (e.g., 'bitcoin')
  symbol: string;    // 'BTC'
  name: string;      // 'Bitcoin'
  quantity: number;  // Amount owned
  averageCost: number; // Purchase price in USD
}

export interface CoinPrice {
  id: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline?: number[];
}

// Map of coin ID to its current price data
export type PriceMap = Record<string, CoinPrice>;

export interface PortfolioStats {
  totalValue: number;
  totalPnL: number;
  percentagePnL: number;
}