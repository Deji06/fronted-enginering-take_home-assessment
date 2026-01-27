import Header from './components/Header';
import AssetTable from './components/AssetTable';
import StatusBanner from './components/StatusBanner';
import LoadingState from './components/LoadingState';
import { usePortfolioStore } from './store/usePortfolioStore';
import { usePriceSync } from './hooks/usePriceSync';
import PortfolioChart from './components/PortfolioChart';

function App() {
 const { loading, assets } = usePortfolioStore();
 usePriceSync(30000)

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-400">Portfolio Overview</h1>
        
        <StatusBanner />

        {loading && assets.length === 0 ? (
          <LoadingState />
        ) : assets.length === 0 ? (
          <div className="text-center py-20 bg-gray-800 rounded-2xl border border-dashed border-gray-600">
            <p className="text-gray-400 text-lg">No assets found. Start by adding some crypto!</p>
          </div>
        ) : (
          <div className="space-y-8">
            <Header />
            <section className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Your Assets</h2>
              <AssetTable />
            </section>
          </div>
        )}
      </div>
      {/* <PortfolioChart /> */}

    </div>
  );
}

export default App;