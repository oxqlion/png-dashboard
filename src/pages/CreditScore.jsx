// import React, { useState } from 'react';
// import { Plus } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const CreditScoringPage = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         title: '',
//         nominal: '',
//         startDate: '',
//         endDate: '',
//         description: ''
//     });

//     // Sample data for transactions
//     const transactions = [
//         { id: 1, date: '15 Agustus 2025', title: 'Pinjaman A', amount: 'Rp 15,000,000', status: 'Lunas', statusColor: 'bg-green-500' },
//         { id: 2, date: '15 Agustus 2025', title: 'Pinjaman A', amount: 'Rp 15,000,000', status: 'Lunas', statusColor: 'bg-green-500' },
//         { id: 3, date: '15 Agustus 2025', title: 'Pinjaman A', amount: 'Rp 15,000,000', status: 'Telat Bayar', statusColor: 'bg-yellow-500' },
//         { id: 4, date: '15 Agustus 2025', title: 'Pinjaman A', amount: 'Rp 15,000,000', status: 'Gagal Bayar', statusColor: 'bg-red-500' }
//     ];

//     // Sample data for bar chart
//     const chartData = [
//         { month: 'Jan', value: 10, color: 'bg-green-500' },
//         { month: 'Feb', value: 3, color: 'bg-green-500' },
//         { month: 'Mar', value: 3, color: 'bg-green-500' },
//         { month: 'Apr', value: 6, color: 'bg-red-500' },
//         { month: 'Mei', value: 10, color: 'bg-yellow-500' },
//         { month: 'Jun', value: 10, color: 'bg-green-500' },
//         { month: 'Jul', value: 14, color: 'bg-green-500' }
//     ];

//     const maxValue = Math.max(...chartData.map(item => item.value));

//     const handleTransactionClick = (transactionId) => {
//         // Placeholder for PDF opening functionality
//         window.open(`/api/transaction-report/${transactionId}.pdf`, '_blank');
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = () => {
//         // Handle form submission logic here
//         console.log('Form submitted:', formData);
//         setIsModalOpen(false);
//         setFormData({
//             title: '',
//             nominal: '',
//             startDate: '',
//             endDate: '',
//             description: ''
//         });
//     };

//     const CircularProgress = ({ score }) => {
//         const circumference = 2 * Math.PI * 70;
//         const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;

//         return (
//             <div className="relative w-48 h-48">
//                 <svg className="transform -rotate-90 w-48 h-48">
//                     <circle
//                         cx="96"
//                         cy="96"
//                         r="70"
//                         stroke="#e5e7eb"
//                         strokeWidth="12"
//                         fill="transparent"
//                     />
//                     <circle
//                         cx="96"
//                         cy="96"
//                         r="70"
//                         stroke="#22c55e"
//                         strokeWidth="12"
//                         fill="transparent"
//                         strokeDasharray={strokeDasharray}
//                         strokeLinecap="round"
//                     />
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="text-5xl font-bold text-gray-700">{score}</span>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <h1 className="text-3xl font-semibold text-gray-700 mb-8">Credit Scoring</h1>

//             <div className="flex gap-6 h-full">
//                 {/* Left Section */}
//                 <div className="flex-1 space-y-6">
//                     {/* Top Section */}
//                     <div className="flex gap-6">
//                         {/* Credit Score Circle */}
//                         <div className="bg-white rounded-lg p-6 flex-1">
//                             <div className="flex flex-col items-center justify-center h-full">
//                                 <CircularProgress score={86} />
//                                 <h3 className="text-lg font-semibold text-gray-700 mt-4">Performa Bagus!</h3>
//                             </div>
//                         </div>

//                         {/* Recommendation Section */}
//                         <div className="bg-white rounded-lg p-6 flex-1">
//                             <div className="flex items-start gap-3">
//                                 <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
//                                     <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
//                                         <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor" />
//                                     </svg>
//                                 </div>
//                                 <div className="flex-1">
//                                     <h4 className="font-semibold text-gray-800 mb-2">Rekomendasi Peminjaman</h4>
//                                     <div className="text-2xl font-bold text-gray-800 mb-2">Rp 15,000,000</div>
//                                     <p className="text-sm text-gray-600 mb-4">
//                                         Skor kredit Anda dinilai baik, sehingga Anda berkesempatan mendapatkan pinjaman hingga Rp15 juta dengan tenor 30 hari.
//                                     </p>

//                                     <div className="bg-blue-50 rounded-lg p-4">
//                                         <h5 className="font-medium text-blue-900 mb-2">Rekomendasi Instansi Peminjam</h5>
//                                         <div className="flex items-center gap-2 mb-2">
//                                             <div className="text-blue-700 font-bold">BANK BRI</div>
//                                         </div>
//                                         <p className="text-xs text-blue-600 mb-2">Melayani Dengan Setulus Hati</p>
//                                         <p className="text-xs text-gray-600">Klik untuk lihat lebih lanjut (WhatsApp 081212401T)</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Transaction Performance Chart */}
//                     <div className="bg-white rounded-lg p-6">
//                         <div className="flex justify-between items-center mb-6">
//                             <h3 className="text-lg font-semibold text-gray-800">Transactions Performance</h3>
//                             <div className="flex items-center gap-4 text-sm">
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                                     <span>Lunas</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//                                     <span>Telat Bayar</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                                     <span>Gagal Bayar</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex justify-between w-min gap-4 mt-4 text-sm text-gray-500">
//                             <select className="border-none bg-transparent">
//                                 <option>Semua tahun ini</option>
//                             </select>
//                             <select className="border-none bg-transparent">
//                                 <option>Semua kategori</option>
//                             </select>
//                         </div>

//                         {/* <div className="flex w-full">
//                             <div className="flex flex-col justify-between text-xs text-gray-400 mt-2">
//                                 <span>0</span>
//                                 <span>5</span>
//                                 <span>10</span>
//                                 <span>15</span>
//                                 <span>20</span>
//                             </div>

//                             <div className="flex items-end justify-between h-full w-full gap-4">
//                                 {chartData.map((item, index) => (
//                                     <div key={index} className="flex-1 flex flex-col items-center">
//                                         <div
//                                             className={`w-full ${item.color} rounded-t-md transition-all duration-300`}
//                                             style={{ height: `${(item.value / maxValue) * 100}%`, minHeight: '20px' }}
//                                         ></div>
//                                         <span className="text-sm text-gray-600 mt-2">{item.month}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div> */}

//                         <ResponsiveContainer width="100%" height={300}>
//                             <BarChart data={chartData}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="month" />
//                                 <YAxis domain={[-1, 1]} />
//                                 <Tooltip
//                                     formatter={(value) => [value.toFixed(2), 'Sales Amount']}
//                                     labelFormatter={(label) => `Day: ${label}`}
//                                 />
//                                 <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
//                             </BarChart>
//                         </ResponsiveContainer>

//                     </div>
//                 </div>

//                 {/* Right Section */}
//                 <div className="w-80">
//                     <div className="bg-white rounded-lg">
//                         {/* Transaction List Header */}
//                         <div className="p-4 border-b border-gray-200">
//                             <h3 className="font-semibold text-gray-800">Daftar Pinjaman</h3>
//                         </div>

//                         {/* Scrollable Transaction List */}
//                         <div className="max-h-96 overflow-y-auto">
//                             {transactions.map((transaction) => (
//                                 <div
//                                     key={transaction.id}
//                                     className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
//                                     onClick={() => handleTransactionClick(transaction.id)}
//                                 >
//                                     <div className="flex justify-between items-start mb-2">
//                                         <div className="flex-1">
//                                             <div className="text-xs text-gray-500 mb-1">{transaction.date}</div>
//                                             <div className="font-medium text-gray-800 mb-1">{transaction.title}</div>
//                                             <div className="font-bold text-gray-900">{transaction.amount}</div>
//                                         </div>
//                                         <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                         </svg>
//                                     </div>
//                                     <div className="flex justify-end">
//                                         <span className={`px-3 py-1 rounded-full text-xs text-white ${transaction.statusColor}`}>
//                                             {transaction.status}
//                                         </span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Add New Transaction Button */}
//                         <div className="p-4">
//                             <button
//                                 className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
//                                 onClick={() => setIsModalOpen(true)}
//                             >
//                                 <Plus className="w-5 h-5" />
//                                 Tambah Pinjaman
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
//                         <h2 className="text-xl font-semibold text-gray-800 mb-6">Tambahkan Pinjaman Baru</h2>

//                         <div className="space-y-4">
//                             {/* Transaction Title */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Judul Transaksi</label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     value={formData.title}
//                                     onChange={handleInputChange}
//                                     placeholder="Masukkan judul transaksi"
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>

//                             {/* Transaction Nominal */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Nominal Transaksi</label>
//                                 <input
//                                     type="text"
//                                     name="nominal"
//                                     value={formData.nominal}
//                                     onChange={handleInputChange}
//                                     placeholder="Masukkan nominal transaksi"
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>

//                             {/* Date Range */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
//                                 <div className="flex gap-2 items-center">
//                                     <input
//                                         type="date"
//                                         name="startDate"
//                                         value={formData.startDate}
//                                         onChange={handleInputChange}
//                                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                     <span className="text-gray-500">-</span>
//                                     <input
//                                         type="date"
//                                         name="endDate"
//                                         value={formData.endDate}
//                                         onChange={handleInputChange}
//                                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Description */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Transaksi</label>
//                                 <textarea
//                                     name="description"
//                                     value={formData.description}
//                                     onChange={handleInputChange}
//                                     placeholder="Masukkan deskripsi transaksi"
//                                     rows="4"
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                                 />
//                             </div>
//                         </div>

//                         {/* Modal Buttons */}
//                         <div className="flex gap-3 mt-6">
//                             <button
//                                 onClick={() => setIsModalOpen(false)}
//                                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
//                             >
//                                 Batalkan
//                             </button>
//                             <button
//                                 onClick={handleSubmit}
//                                 className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
//                             >
//                                 Konfirmasi
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CreditScoringPage;