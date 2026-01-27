// src/utils/finance.ts
import type { Asset } from '../types';

export const calculatePnL = (asset: Asset, currentPrice: number) => {
  const currentValue = asset.quantity * currentPrice;
  const totalCost = asset.quantity * asset.averageCost;
  const absolutePnL = currentValue - totalCost;
  const percentagePnL = totalCost !== 0 ? (absolutePnL / totalCost) * 100 : 0;

  return {
    currentValue,
    absolutePnL,
    percentagePnL,
  };
};

export const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

export const formatPercent = (val: number) => 
  `${val >= 0 ? '+' : ''}${val.toFixed(2)}%`;