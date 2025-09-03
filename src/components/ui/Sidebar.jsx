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
    Percent,
    BanknoteArrowUp
} from 'lucide-react';
import logo from '../../assets/logo.png';

const Sidebar = ({ activeTab, setActiveTab }) => {

    const navigationItems = [
        { name: 'Dashboard', icon: LayoutDashboard, active: true },
        // { name: 'Credit Scoring', icon: BanknoteArrowUp },
        { name: 'Library', icon: Library },
        { name: 'Reports', icon: FileText },
        { name: 'Inventory', icon: Package },
        { name: 'Employee', icon: Users },
        { name: 'Customers', icon: UserCheck },
        { name: 'Customer Display', icon: Monitor },
        { name: 'Payments', icon: CreditCard },
        // { name: 'Green Report', icon: Leaf },        
    ];

    return (
        <div className="w-64 bg-blue-600 text-white h-screen flex flex-col">
            {/* Logo */}
            <div className="px-6 border-b border-blue-500">
                <img src={logo} alt="logo" className="w-full h-auto" />
                {/* <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <LayoutDashboard className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xl font-bold">AdminDash</span>
                </div> */}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6">
                <ul className="space-y-1 px-3">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.name}>
                                <button
                                    onClick={() => setActiveTab(item.name)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === item.name
                                        ? 'bg-blue-700 text-white'
                                        : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer Buttons */}
            <div className="p-3 border-t border-blue-500 space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-blue-100 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-blue-100 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
                    <HelpCircle className="w-5 h-5" />
                    <span>Help Center</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;