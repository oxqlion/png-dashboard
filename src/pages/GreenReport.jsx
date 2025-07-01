import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, Recycle, Star, DollarSign, Zap, CloudOff } from 'lucide-react';

const GreenReport = () => {
  const [timeFilter, setTimeFilter] = useState('all-year');

  // Sample data for the line chart
  const chartData = {
    'all-year': [
      { month: 'Jan', eReceipt: 500, paperAvoided: 1200, palmPoints: 3800 },
      { month: 'Feb', eReceipt: 800, paperAvoided: 2000, palmPoints: 5000 },
      { month: 'Mar', eReceipt: 1200, paperAvoided: 2800, palmPoints: 5500 },
      { month: 'Apr', eReceipt: 1100, paperAvoided: 3200, palmPoints: 6800 },
      { month: 'May', eReceipt: 1300, paperAvoided: 3500, palmPoints: 7200 },
      { month: 'Jun', eReceipt: 1800, paperAvoided: 3800, palmPoints: 7800 },
      { month: 'Jul', eReceipt: 2364, paperAvoided: 4728, palmPoints: 9572 }
    ],
    '6-months': [
      { month: 'Feb', eReceipt: 800, paperAvoided: 2000, palmPoints: 5000 },
      { month: 'Mar', eReceipt: 1200, paperAvoided: 2800, palmPoints: 5500 },
      { month: 'Apr', eReceipt: 1100, paperAvoided: 3200, palmPoints: 6800 },
      { month: 'May', eReceipt: 1300, paperAvoided: 3500, palmPoints: 7200 },
      { month: 'Jun', eReceipt: 1800, paperAvoided: 3800, palmPoints: 7800 },
      { month: 'Jul', eReceipt: 2364, paperAvoided: 4728, palmPoints: 9572 }
    ],
    '3-months': [
      { month: 'May', eReceipt: 1300, paperAvoided: 3500, palmPoints: 7200 },
      { month: 'Jun', eReceipt: 1800, paperAvoided: 3800, palmPoints: 7800 },
      { month: 'Jul', eReceipt: 2364, paperAvoided: 4728, palmPoints: 9572 }
    ],
    'this-month': [
      { month: 'Week 1', eReceipt: 600, paperAvoided: 1200, palmPoints: 2400 },
      { month: 'Week 2', eReceipt: 580, paperAvoided: 1150, palmPoints: 2300 },
      { month: 'Week 3', eReceipt: 620, paperAvoided: 1240, palmPoints: 2480 },
      { month: 'Week 4', eReceipt: 564, paperAvoided: 1136, palmPoints: 2392 }
    ],
    '7-days': [
      { month: 'Mon', eReceipt: 320, paperAvoided: 640, palmPoints: 1280 },
      { month: 'Tue', eReceipt: 280, paperAvoided: 560, palmPoints: 1120 },
      { month: 'Wed', eReceipt: 350, paperAvoided: 700, palmPoints: 1400 },
      { month: 'Thu', eReceipt: 310, paperAvoided: 620, palmPoints: 1240 },
      { month: 'Fri', eReceipt: 380, paperAvoided: 760, palmPoints: 1520 },
      { month: 'Sat', eReceipt: 420, paperAvoided: 840, palmPoints: 1680 },
      { month: 'Sun', eReceipt: 304, paperAvoided: 608, palmPoints: 1332 }
    ]
  };

  // CSR Donation Distribution data
  const csrData = [
    { name: 'Pendidikan', value: 35, color: '#3B82F6' },
    { name: 'Kesehatan', value: 28, color: '#10B981' },
    { name: 'Lingkungan', value: 22, color: '#F59E0B' },
    { name: 'Sosial', value: 15, color: '#EF4444' }
  ];

  const filterOptions = [
    { value: 'all-year', label: 'Semua tahun ini' },
    { value: '6-months', label: '6 bulan terakhir' },
    { value: '3-months', label: '3 bulan terakhir' },
    { value: 'this-month', label: 'Bulan ini' },
    { value: '7-days', label: '7 hari terakhir' }
  ];

  const summaryCards = [
    {
      title: 'E-Receipt Terkirim',
      value: '2.364',
      icon: FileText,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Kertas Dihindari',
      value: '4.728',
      icon: Recycle,
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'PalmPoints Terdistribusi',
      value: '9.572',
      icon: Star,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Donasi CSR Terkumpul',
      value: 'Rp 1.345.900',
      icon: DollarSign,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Green Report</h1>
        <p className="text-gray-600">Laporan dampak lingkungan dan kontribusi sosial</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className={`${card.bgColor} p-6 rounded-lg border border-gray-200 shadow-md`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Energy & CO2 Stats + CSR Distribution */}
        <div className="lg:col-span-1 space-y-6">
          {/* Energy & CO2 Stats */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="space-y-6">
              {/* Energy Saved */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-gray-700">Energi dihemat:</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">12 kWh</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              {/* CO2 Avoided */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <CloudOff className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-700">CO2 dihindari:</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">45 kg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* CSR Donation Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Distribusi Donasi CSR</h3>
            <p className="text-sm text-gray-500 mb-4">Q1 - Q2 (2025)</p>
            
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={csrData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {csrData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-2">
              {csrData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Green Report Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Green Report Chart</h3>
              <div className="flex space-x-4">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">E-Receipt Terkirim</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm text-gray-600">Kertas Dihindari</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-600">PalmPoints Terdistribusi</span>
              </div>
            </div>

            {/* Chart */}
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData[timeFilter]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#666"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#666"
                    fontSize={12}
                    domain={[0, 10000]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="eReceipt" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="paperAvoided" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="palmPoints" 
                    stroke="#EA580C" 
                    strokeWidth={3}
                    dot={{ fill: '#EA580C', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#EA580C', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenReport;