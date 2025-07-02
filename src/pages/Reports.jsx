import { useState } from 'react';
import { Calendar, Search, Filter, FileText, Clock, CreditCard, User, Package, ChevronRight, X } from 'lucide-react';

const Reports = () => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Sample transaction data - In real app, this would come from Firebase
    const transactions = [
        {
            id: 'TXN-001',
            date: '2025-07-02',
            time: '14:30:25',
            customerName: 'Ahmad Rizki',
            customerId: 'CUST-12345',
            items: [
                { name: 'Kopi Americano', quantity: 2, price: 25000 },
                { name: 'Croissant', quantity: 1, price: 15000 },
                { name: 'Sandwich Club', quantity: 1, price: 35000 }
            ],
            subtotal: 100000,
            tax: 10000,
            discount: 5000,
            total: 105000,
            paymentMethod: 'Credit Card',
            paymentStatus: 'completed',
            cashier: 'Siti Nurhaliza',
            outlet: 'Cabang Surabaya Pusat',
            receiptType: 'e-receipt',
            palmPointsEarned: 105,
            palmPointsUsed: 0
        },
        {
            id: 'TXN-002',
            date: '2025-07-02',
            time: '13:15:42',
            customerName: 'Maria Santos',
            customerId: 'CUST-67890',
            items: [
                { name: 'Latte', quantity: 1, price: 30000 },
                { name: 'Muffin Blueberry', quantity: 2, price: 20000 }
            ],
            subtotal: 70000,
            tax: 7000,
            discount: 0,
            total: 77000,
            paymentMethod: 'Cash',
            paymentStatus: 'completed',
            cashier: 'Budi Santoso',
            outlet: 'Cabang Surabaya Timur',
            receiptType: 'printed',
            palmPointsEarned: 77,
            palmPointsUsed: 15
        },
        {
            id: 'TXN-003',
            date: '2025-07-01',
            time: '16:45:12',
            customerName: 'Dewi Kartika',
            customerId: 'CUST-11111',
            items: [
                { name: 'Cappuccino', quantity: 1, price: 28000 },
                { name: 'Cake Slice Chocolate', quantity: 1, price: 45000 }
            ],
            subtotal: 73000,
            tax: 7300,
            discount: 3000,
            total: 77300,
            paymentMethod: 'Digital Wallet',
            paymentStatus: 'completed',
            cashier: 'Andi Wijaya',
            outlet: 'Cabang Surabaya Barat',
            receiptType: 'e-receipt',
            palmPointsEarned: 77,
            palmPointsUsed: 30
        },
        {
            id: 'TXN-004',
            date: '2025-07-01',
            time: '11:20:33',
            customerName: 'Raden Mas',
            customerId: 'CUST-22222',
            items: [
                { name: 'Espresso', quantity: 3, price: 22000 },
                { name: 'Bagel Sesame', quantity: 2, price: 18000 }
            ],
            subtotal: 102000,
            tax: 10200,
            discount: 10000,
            total: 102200,
            paymentMethod: 'Credit Card',
            paymentStatus: 'pending',
            cashier: 'Lisa Amelia',
            outlet: 'Cabang Surabaya Selatan',
            receiptType: 'e-receipt',
            palmPointsEarned: 102,
            palmPointsUsed: 50
        },
        {
            id: 'TXN-005',
            date: '2025-06-30',
            time: '09:30:15',
            customerName: 'Fajar Nugroho',
            customerId: 'CUST-33333',
            items: [
                { name: 'Matcha Latte', quantity: 1, price: 32000 },
                { name: 'Donut Glazed', quantity: 3, price: 12000 }
            ],
            subtotal: 68000,
            tax: 6800,
            discount: 0,
            total: 74800,
            paymentMethod: 'Cash',
            paymentStatus: 'completed',
            cashier: 'Rina Sari',
            outlet: 'Cabang Surabaya Utara',
            receiptType: 'printed',
            palmPointsEarned: 75,
            palmPointsUsed: 0
        }
    ];

    // Filter transactions based on search and filters
    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.cashier.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDate = !filterDate || transaction.date === filterDate;
        const matchesStatus = filterStatus === 'all' || transaction.paymentStatus === filterStatus;

        return matchesSearch && matchesDate && matchesStatus;
    });

    // Group transactions by date
    const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
        const date = transaction.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {});

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentMethodIcon = (method) => {
        switch (method.toLowerCase()) {
            case 'credit card':
                return <CreditCard className="w-4 h-4" />;
            case 'cash':
                return <span className="w-4 h-4 text-center text-xs font-bold">$</span>;
            case 'digital wallet':
                return <span className="w-4 h-4 text-center text-xs font-bold">W</span>;
            default:
                return <CreditCard className="w-4 h-4" />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${selectedTransaction ? 'mr-96' : ''}`}>
                <div className="p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
                        <p className="text-gray-600">Lihat semua transaksi dan detail pembayaran</p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Cari berdasarkan nama customer, ID transaksi, atau kasir..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Date Filter */}
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="date"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Transactions List */}
                    <div className="space-y-6">
                        {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
                            <div key={date} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                {/* Date Header */}
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">{formatDate(date)}</h3>
                                    <p className="text-sm text-gray-600">{dayTransactions.length} transaksi</p>
                                </div>

                                {/* Transactions */}
                                <div className="divide-y divide-gray-100">
                                    {dayTransactions.map((transaction) => (
                                        <div
                                            key={transaction.id}
                                            onClick={() => setSelectedTransaction(transaction)}
                                            className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                            <FileText className="w-6 h-6 text-blue-600" />
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center space-x-3 mb-1">
                                                            <h4 className="text-lg font-semibold text-gray-900">{transaction.id}</h4>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.paymentStatus)}`}>
                                                                {transaction.paymentStatus}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                            <div className="flex items-center space-x-1">
                                                                <User className="w-4 h-4" />
                                                                <span>{transaction.customerName}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <Clock className="w-4 h-4" />
                                                                <span>{transaction.time}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                {getPaymentMethodIcon(transaction.paymentMethod)}
                                                                <span>{transaction.paymentMethod}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <Package className="w-4 h-4" />
                                                                <span>{transaction.items.length} item(s)</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-4">
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-gray-900">{formatCurrency(transaction.total)}</p>
                                                        <p className="text-sm text-gray-600">{transaction.outlet}</p>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTransactions.length === 0 && (
                        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada transaksi ditemukan</h3>
                            <p className="text-gray-600">Coba ubah filter pencarian Anda</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Transaction Detail Sidebar */}
            {selectedTransaction && (
                <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-2xl border-l border-gray-200 z-50 overflow-y-auto">
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Detail Transaksi</h2>
                            <button
                                onClick={() => setSelectedTransaction(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Transaction Info */}
                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Informasi Transaksi</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">ID Transaksi:</span>
                                        <span className="font-medium">{selectedTransaction.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tanggal:</span>
                                        <span className="font-medium">{formatDate(selectedTransaction.date)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Waktu:</span>
                                        <span className="font-medium">{selectedTransaction.time}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTransaction.paymentStatus)}`}>
                                            {selectedTransaction.paymentStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Informasi Customer</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Nama:</span>
                                        <span className="font-medium">{selectedTransaction.customerName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">ID Customer:</span>
                                        <span className="font-medium">{selectedTransaction.customerId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Points Earned:</span>
                                        <span className="font-medium text-green-600">+{selectedTransaction.palmPointsEarned}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Points Used:</span>
                                        <span className="font-medium text-orange-600">-{selectedTransaction.palmPointsUsed}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Items */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Items Dibeli</h3>
                                <div className="space-y-3">
                                    {selectedTransaction.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                            <div>
                                                <p className="font-medium text-gray-900">{item.name}</p>
                                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Summary */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Ringkasan Pembayaran</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span>{formatCurrency(selectedTransaction.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Pajak:</span>
                                        <span>{formatCurrency(selectedTransaction.tax)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Diskon:</span>
                                        <span className="text-red-600">-{formatCurrency(selectedTransaction.discount)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                                        <span>Total:</span>
                                        <span>{formatCurrency(selectedTransaction.total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Store Info */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Informasi Toko</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Outlet:</span>
                                        <span className="font-medium">{selectedTransaction.outlet}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Kasir:</span>
                                        <span className="font-medium">{selectedTransaction.cashier}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Metode Bayar:</span>
                                        <span className="font-medium">{selectedTransaction.paymentMethod}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Jenis Receipt:</span>
                                        <span className="font-medium capitalize">{selectedTransaction.receiptType}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reports;