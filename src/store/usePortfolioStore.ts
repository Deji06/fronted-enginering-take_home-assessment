// src/store/usePortfolioStore.ts
import { create } from 'zustand';
import type { Asset, PriceMap } from '../types';
import { MOCK_ASSETS} from '../mockData';

interface PortfolioState {
  assets: Asset[];
  prices: PriceMap;
  loading: boolean;
  error: string | null;
  lastUpdated:number | null

  
  // Actions
  setPrices: (prices: PriceMap) => void;
  setLoading: (status: boolean) => void;
  setError: (msg: string | null) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  assets: MOCK_ASSETS,
  prices: {},
  loading: false,
  error: null,
  lastUpdated: null,

setPrices: (prices) => set({ 
    prices, 
    lastUpdated: Date.now(),
    loading: false,
    error: null 
  }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),
}));