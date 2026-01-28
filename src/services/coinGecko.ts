import type { PriceMap} from '../types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchLivePrices = async (coinIds: string[]): Promise<PriceMap> => {
  const ids = coinIds.join(',');
   const url = `${BASE_URL}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false&price_change_percentage=24h&t=${Date.now()}`;
  
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 429) throw new Error('Rate limit exceeded. Try again later.');
    throw new Error('Failed to fetch market data');
  }

  const data: any[] = await response.json();
  
  // Convert array to a Map for O(1) lookup speed in our components
  return data.reduce((acc, coin) => {
    acc[coin.id] = {
      id: coin.id,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
    };
    return acc;
  }, {} as PriceMap);
};