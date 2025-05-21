import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Sun, Moon } from 'lucide-react';
import Products from './pages/Products';
import Home from './pages/Home';
import LowStockAlerts from './pages/LowStockAlerts';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    if (localStorage.getItem('darkMode') === 'true') {
      return true;
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Update document when dark mode changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const location = useLocation();

  return (
    <div className="min-h-screen">
      <header className="bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-surface-900 dark:text-white m-0">
              Stock<span className="text-primary">Sense</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`
              }
            >Products</NavLink>
            <NavLink 
              to="/low-stock-alerts" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`
              }
            >
              <div className="flex items-center">
                Low Stock <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 rounded-full">Alerts</span>
              </div>
            </NavLink>
          </nav>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? 
              <Sun className="h-5 w-5 text-yellow-400" /> : 
              <Moon className="h-5 w-5 text-surface-700" />
            }
          </button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 md:px-6 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/low-stock-alerts" element={<LowStockAlerts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 mt-auto">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <p className="text-center text-surface-600 dark:text-surface-400 text-sm">
            &copy; {new Date().getFullYear()} StockSense. All rights reserved.
          </p>
        </div>
      </footer>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;