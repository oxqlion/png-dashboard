import { useState } from 'react';
import DashboardSummary from '../components/Dashboard/DashboardSummary';
import OutletComparison from '../components/Dashboard/OutletComparison';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('summary');

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Section Toggle Buttons */}
      <div className="mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveSection('summary')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeSection === 'summary'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveSection('outlet')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeSection === 'outlet'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Outlet Comparison
          </button>
        </div>
      </div>

      {/* Content */}
      {activeSection === 'summary' ? <DashboardSummary /> : <OutletComparison />}
    </div>
  );
};

export default Dashboard;