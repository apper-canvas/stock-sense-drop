import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AlertTriangle, AlertCircle, Check, Package, Edit3, ExternalLink, RefreshCw, Plus } from 'lucide-react';
import { getIcon } from '../utils/iconUtils';

const LowStockAlerts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'currentStock', direction: 'ascending' });
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'low', 'out'
  
  // Icons
  const PackageIcon = getIcon('package');
  const AlertTriangleIcon = getIcon('alert-triangle');
  const AlertCircleIcon = getIcon('alert-circle');
  const EditIcon = getIcon('edit-3');
  const ExternalLinkIcon = getIcon('external-link');
  const RefreshCwIcon = getIcon('refresh-cw');
  const CheckIcon = getIcon('check');
  const PlusIcon = getIcon('plus');

  // Load products from localStorage
  useEffect(() => {
    const loadProducts = () => {
      try {
        const savedProducts = localStorage.getItem('products');
        const parsedProducts = savedProducts ? JSON.parse(savedProducts) : [];
        
        // Filter for products that are low stock or out of stock
        const lowStockProducts = parsedProducts.filter(
          product => product.restockStatus === 'Low Stock' || product.restockStatus === 'Out of Stock'
        );
        
        setProducts(lowStockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        toast.error('Failed to load product data');
        setProducts([]);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Function to get badge class based on restock status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'In Stock':
        return 'badge-success';
      case 'Low Stock':
        return 'badge-warning';
      case 'Out of Stock':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };

  // Function to get status icon based on restock status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Stock':
        return <CheckIcon className="h-3.5 w-3.5 mr-1" />;
      case 'Low Stock':
        return <AlertTriangleIcon className="h-3.5 w-3.5 mr-1" />;
      case 'Out of Stock':
        return <AlertCircleIcon className="h-3.5 w-3.5 mr-1" />;
      default:
        return null;
    }
  };

  // Function to handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply filters and sorting
  const filteredAndSortedProducts = [...products]
    .filter(product => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'low') return product.restockStatus === 'Low Stock';
      if (filterStatus === 'out') return product.restockStatus === 'Out of Stock';
      return true;
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

  // Function to generate sort indicator
  const getSortIndicator = (columnName) => {
    if (sortConfig.key !== columnName) {
      return null;
    }
    
    return sortConfig.direction === 'ascending' 
      ? '↑' 
      : '↓';
  };

  // Function to handle quick restock action
  const handleQuickRestock = (product) => {
    // Get all products to update the specific one
    const savedProducts = localStorage.getItem('products');
    const allProducts = savedProducts ? JSON.parse(savedProducts) : [];
    
    // Find the product to update
    const updatedAllProducts = allProducts.map(p => {
      if (p.id === product.id) {
        // Update the stock to minimum level + 5
        const newStock = p.minimumStockLevel + 5;
        const newStatus = newStock > 0 
          ? (newStock < p.minimumStockLevel ? 'Low Stock' : 'In Stock') 
          : 'Out of Stock';

        toast.success(`Restocked "${p.name}" to ${newStock} units`);
        
        return {
          ...p,
          currentStock: newStock,
          restockStatus: newStatus,
          lastUpdated: new Date().toISOString()
        };
      }
      return p;
    });
    
    // Save back to localStorage
    localStorage.setItem('products', JSON.stringify(updatedAllProducts));
    
    // Update the filtered list
    const updatedProduct = updatedAllProducts.find(p => p.id === product.id);
    if (updatedProduct.restockStatus === 'In Stock') {
      // Remove from this list if now in stock
      setProducts(products.filter(p => p.id !== product.id));
    } else {
      // Otherwise update the item in the list
      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="flex items-center text-3xl font-bold text-surface-900 dark:text-white mb-2">
          <AlertTriangle className="h-8 w-8 mr-3 text-amber-500" />
          Low Stock Alerts
        </h1>
        <p className="text-surface-600 dark:text-surface-400">
          Monitor products that need attention and require restocking.
        </p>
      </div>

      {/* Filter controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilterStatus('all')}
          className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline'}`}
        >
          All Alerts ({products.length})
        </button>
        <button
          onClick={() => setFilterStatus('low')}
          className={`btn ${filterStatus === 'low' ? 'btn-primary' : 'btn-outline'}`}
        >
          Low Stock ({products.filter(p => p.restockStatus === 'Low Stock').length})
        </button>
        <button
          onClick={() => setFilterStatus('out')}
          className={`btn ${filterStatus === 'out' ? 'btn-primary' : 'btn-outline'}`}
        >
          Out of Stock ({products.filter(p => p.restockStatus === 'Out of Stock').length})
        </button>
      </div>

      {/* Low stock items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <RefreshCwIcon className="h-8 w-8 mx-auto mb-4 text-primary animate-spin" />
            <p className="text-surface-600 dark:text-surface-400">Loading inventory data...</p>
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="col-span-full text-center py-8 bg-white dark:bg-surface-800 rounded-xl shadow-card">
            <CheckIcon className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-medium mb-2 text-surface-900 dark:text-white">All stocked up!</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-6">There are no low stock or out of stock items that need attention.</p>
            <button 
              onClick={() => navigate('/products')}
              className="btn btn-primary"
            >
              <PackageIcon className="h-4 w-4 mr-2" />
              View All Products
            </button>
          </div>
        ) : (
          filteredAndSortedProducts.map(product => (
            <div key={product.id} className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-surface-900 dark:text-white truncate flex-1">{product.name}</h3>
                  <span className={`badge flex items-center ml-2 ${getStatusBadgeClass(product.restockStatus)}`}>
                    {getStatusIcon(product.restockStatus)}
                    {product.restockStatus}
                  </span>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-surface-700 dark:text-surface-300">Current: <span className="font-semibold">{product.currentStock}</span></span>
                  <span className="text-sm text-surface-700 dark:text-surface-300">Minimum: <span className="font-semibold">{product.minimumStockLevel}</span></span>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button onClick={() => handleQuickRestock(product)} className="btn btn-primary flex-1 py-1.5 flex items-center justify-center text-sm"><PlusIcon className="h-3.5 w-3.5 mr-1.5" />Restock</button>
                  <button onClick={() => navigate('/products')} className="btn btn-outline py-1.5 px-2"><ExternalLinkIcon className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LowStockAlerts;