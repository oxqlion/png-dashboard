import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
    LayoutDashboard,
    Library,
    FileText,
    Package,
    Users,
    UserCheck,
    Monitor,
    CreditCard,
    Leaf,
    LogOut,
    HelpCircle,
    TrendingUp,
    DollarSign,
    ShoppingCart,
    Percent
} from 'lucide-react';
import SummaryCard from '../ui/SummaryCard';

const DashboardSummary = () => {
    const summaryData = [
        {
            title: 'Gross Sales',
            value: 'Rp 12,450,000',
            icon: DollarSign,
            color: 'text-green-600'
        },
        {
            title: 'Net Sales',
            value: 'Rp 11,205,000',
            icon: TrendingUp,
            color: 'text-blue-600'
        },
        {
            title: 'Gross Profit',
            value: 'Rp 8,715,000',
            icon: TrendingUp,
            color: 'text-purple-600'
        },
        {
            title: 'Transactions',
            value: '1,247',
            icon: ShoppingCart,
            color: 'text-orange-600'
        },
        {
            title: 'Avg Sale/Transaction',
            value: 'Rp 9,985',
            icon: DollarSign,
            color: 'text-teal-600'
        },
        {
            title: 'Gross Margin',
            value: '69.98%',
            icon: Percent,
            color: 'text-pink-600'
        }
    ];

    const weeklyData = [
        { day: 'Mon', sales: 100 },
        { day: 'Tue', sales: 150 },
        { day: 'Wed', sales: 200 },
        { day: 'Thu', sales: 180 },
        { day: 'Fri', sales: 220 },
        { day: 'Sat', sales: 190 },
        { day: 'Sun', sales: 160 },
    ];

    const hourlyData = [
        { hour: 0, sales: 100 },
        { hour: 1, sales: 150 },
        { hour: 2, sales: 200 },
        { hour: 3, sales: 180 },
        { hour: 4, sales: 220 },
        { hour: 5, sales: 190 },
        { hour: 6, sales: 160 },
        { hour: 7, sales: 130 },
        { hour: 8, sales: 110 },
        { hour: 9, sales: 140 },
        { hour: 10, sales: 170 },
        { hour: 11, sales: 120 },
        { hour: 12, sales: 160 },
        { hour: 13, sales: 180 },
        { hour: 14, sales: 200 },
        { hour: 15, sales: 190 },
        { hour: 16, sales: 170 },
        { hour: 17, sales: 150 },
        { hour: 18, sales: 130 },
        { hour: 19, sales: 110 },
    ];

    return (
        <div className="space-y-8">
            {/* Summary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {summaryData.map((item, index) => (
                    <SummaryCard
                        key={index}
                        title={item.title}
                        value={item.value}
                        icon={item.icon}
                        color={item.color}
                    />
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Sales Chart */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Day of Week Gross Sales
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis domain={[-1, 1]} />
                            <Tooltip
                                formatter={(value) => [value.toFixed(2), 'Sales Amount']}
                                labelFormatter={(label) => `Day: ${label}`}
                            />
                            <Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Hourly Sales Chart */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Hourly Sales Amount
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={hourlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hour" />
                            <YAxis domain={[-1, 1]} />
                            <Tooltip
                                formatter={(value) => [value.toFixed(2), 'Sales Amount']}
                                labelFormatter={(label) => `Hour: ${label}:00`}
                            />
                            <Bar dataKey="sales" fill="#10B981" radius={[2, 2, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardSummary;