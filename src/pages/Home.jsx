import { useNavigate } from 'react-router-dom';
import { Package, BarChart4, Settings } from 'lucide-react';
import { useState } from 'react';
import MainFeature from '../components/MainFeature';
import { getIcon } from '../utils/iconUtils';

function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');

  const DashboardIcon = getIcon('layout-dashboard');
  const ClipboardIcon = getIcon('clipboard-list');
  const TruckIcon = getIcon('truck');
  const SettingsIcon = getIcon('settings');

  const tabs = [
    { id: 'products', name: 'Products', icon: ClipboardIcon },
    { id: 'dashboard', name: 'Dashboard', icon: DashboardIcon },
    { id: 'orders', name: 'Orders', icon: TruckIcon },
    { id: 'settings', name: 'Settings', icon: SettingsIcon }
  ];

  return (
    <div>
      <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-surface-600 dark:text-surface-400">
            Welcome to StockSense - your inventory management solution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div onClick={() => navigate('/products')} className="bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700 rounded-xl p-6 shadow-card flex flex-col items-center text-center transition-colors cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">Products</h2>
            <p className="text-surface-600 dark:text-surface-400 text-sm">
              Manage your product inventory, stock levels, and product details
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col space-y-6 mt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">
          Inventory Management
        </h1>
      </div>

      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-2 mb-6">
        <nav className="flex flex-wrap md:flex-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg flex-1 justify-center md:justify-start transition-all
                ${activeTab === tab.id 
                  ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="hidden md:inline">{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'products' && (
        <MainFeature />
      )}
      
      {activeTab === 'dashboard' && (
        <div className="card">
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <DashboardIcon className="h-16 w-16 text-surface-400" />
            <h3 className="text-xl font-medium text-surface-700 dark:text-surface-300">
              Dashboard Coming Soon
            </h3>
            <p className="text-surface-500 dark:text-surface-400 text-center max-w-md">
              We're working on building a comprehensive dashboard with analytics and insights about your inventory.
            </p>
          </div>
        </div>
      )}
      
      {activeTab === 'orders' && (
        <div className="card">
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <TruckIcon className="h-16 w-16 text-surface-400" />
            <h3 className="text-xl font-medium text-surface-700 dark:text-surface-300">
              Order Management Coming Soon
            </h3>
            <p className="text-surface-500 dark:text-surface-400 text-center max-w-md">
              Track purchase orders, manage restock requests, and communicate with suppliers. This feature is under development.
            </p>
          </div>
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div className="card">
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <SettingsIcon className="h-16 w-16 text-surface-400" />
            <h3 className="text-xl font-medium text-surface-700 dark:text-surface-300">
              Settings Coming Soon
            </h3>
            <p className="text-surface-500 dark:text-surface-400 text-center max-w-md">
              Configure your inventory settings, user preferences, and system options. This feature is under development.
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Home;