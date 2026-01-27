import type { Asset, CoinPrice } from './types';

export const MOCK_ASSETS: Asset[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', quantity: 0.5, averageCost: 42000 },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', quantity: 5.2, averageCost: 2100 },
  { id: 'solana', symbol: 'SOL', name: 'Solana', quantity: 120, averageCost: 95 },
];

export const MOCK_PRICES: Record<string, CoinPrice> = {
  bitcoin: { id: 'bitcoin', current_price: 48500, price_change_percentage_24h: 2.5 },
  ethereum: { id: 'ethereum', current_price: 2450, price_change_percentage_24h: -1.2 },
  solana: { id: 'solana', current_price: 112, price_change_percentage_24h: 5.8 },
};