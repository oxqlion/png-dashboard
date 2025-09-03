import { useState } from 'react';
import Sidebar from './components/ui/Sidebar';
import Dashboard from './pages/Dashboard';
import GreenReport from './pages/GreenReport';
import Library from './pages/Library';
import PlaceholderPage from './pages/PlaceholderPage';
import Reports from './pages/Reports';
// import CreditScoringPage from './pages/CreditScore';
import './index.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Library':
        return <Library />;
      case 'Green Report':
        return <GreenReport />;
      case 'Reports':
        return <Reports />;
      // case 'Credit Scoring':
      //   return <CreditScoringPage />;
      default:
        return <PlaceholderPage title={activeTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;