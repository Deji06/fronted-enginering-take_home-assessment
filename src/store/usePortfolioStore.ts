// src/store/usePortfolioStore.ts
import { create } from 'zustand';
import type { Asset, PriceMap } from '../types';
import { MOCK_ASSETS, MOCK_PRICES } from '../mockData';

interface PortfolioState {
  assets: Asset[];
  prices: PriceMap;
  loading: boolean;
  error: string | null;
  
  // Actions
  setPrices: (prices: PriceMap) => void;
  setLoading: (status: boolean) => void;
  setError: (msg: string | null) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  assets: MOCK_ASSETS, // Start with mock data
  prices: MOCK_PRICES,
  loading: false,
  error: null,

  setPrices: (prices) => set({ prices }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));