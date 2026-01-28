# Crypto Portfolio Tracker - GreyZone Technical Assessment

A high-performance, real-time cryptocurrency dashboard designed for financial accuracy, UI resilience, and clear architectural separation.

## Architecture Decisions

### 1. Atomic State Management (Zustand)
I chose **Zustand** for state management to ensure high-frequency updates don't compromise performance. 
- **Reasoning:** Unlike Context API, which can cause "provider-wide" re-renders, Zustand allows components to selectively subscribe to state slices. In a crypto app where prices change every few seconds, this granularity is essential for maintaining 60fps UI performance.

### 2. Derived State Pattern
Following the principle of "Single Source of Truth," I intentionally avoided storing calculated values (Total Value, P&L) in the store.
- **Reasoning:** Storing derived data leads to "Split-Brain" synchronization bugs. Instead, I calculate these values on-the-fly using **useMemo**. This ensures that if a price updates, every dependent calculation updates simultaneously, preventing transient financial inconsistencies.

### 3. Component Atomicity & Memoization
The project uses a memoized row-rendering pattern in the asset list.
- **Reasoning:** By isolating the `AssetRow` and wrapping it in `React.memo`, I ensure that a price update for "Bitcoin" does not trigger a re-render for the rest of the table.

---

## State Strategy & Resilience

The application explicitly handles the five mandatory system states to ensure a production-ready user experience:

* **Loading:** Shimmer/Skeleton states are used during the initial data fetch to improve perceived latency.
* **Error State:** Handles API failures (e.g., CoinGecko 429 Rate Limits) with a dedicated banner and manual retry logic.
* **Partial Data:** If price fetching fails but asset data is present, the UI displays holdings with a "Partial Data" warning, informing the user that prices are not live.
* **Stale Data:** A `lastUpdated` timestamp tracks data freshness. If the sync is delayed beyond 75s, a "Stale Data" status banner warns the user of market risk.
* **Empty State:** A clean "Call to Action" view is rendered if no assets are found in the portfolio.

---

##  Trade-offs
* **Mocked History:** For the performance charts, I implemented a mock historical generator. In a production environment, this would be replaced by the `/market_chart` endpoint, but for this assessment, I prioritized UI stability and rate-limit preservation.

---

##  Testing Strategy (Written Explanation)

To ensure financial integrity, the application is designed to be testable across three layers:

### 1. Unit Testing (The Math)
I focus testing on the **Utility Functions** (`src/utils/finance.ts`). Since these are pure functions, they are tested for:
* **P&L Calculation:** Validating that `(Current - Cost) / Cost` handles edge cases like a $0$ cost basis and handles floating-point precision correctly

### 2. Integration Testing (The Store)
Using **Vitest**, I would test the store's "Sync" logic:
* **API Resilience:** Ensuring that when `fetchLivePrices` returns an error, the store's `error` state is populated and the `loading` state is cleared.
* **Race Conditions:** Verifying that if multiple refresh actions are fired, only the result of the latest request is applied.

### 3. E2E / Resilience Testing (The UX)
Using **Playwright**, I would simulate "Unreliable Networks":
* **Offline Mode:** Verify that the "Stale Data" banner appears exactly 75 seconds after a lost connection.
* **Recovery:** Verify that when the network returns, the error banners clear automatically on the next successful poll.

---

## 🔮 Future Improvements
1.  **Persistence:** Adding `zustand/middleware` to persist the wallet to `localStorage`.
2.  **Web Worker Calculation:** Moving heavy P&L calculations for large portfolios off the main thread.
3.  **Multi-Currency Denomination:** Adding a toggle to view the entire portfolio in BTC or ETH value instead of just USD.

---

##  Tech Stack
- **Framework:** React 18 (Vite)
- **State:** Zustand
- **Styles:** Tailwind CSS
- **Charts:** Recharts
- **API:** CoinGecko V3 (Free Tier)

##  How to Run
1. Clone the repo
2. `npm install`
3. `npm run dev`