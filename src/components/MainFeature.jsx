import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const MainFeature = () => {
  // Icons
  const PlusIcon = getIcon('plus');
  const SearchIcon = getIcon('search');
  const EditIcon = getIcon('edit-3');
  const TrashIcon = getIcon('trash-2');
  const EyeIcon = getIcon('eye');
  const XIcon = getIcon('x');
  const PackageIcon = getIcon('package');
  const TagIcon = getIcon('tag');
  const DollarSignIcon = getIcon('dollar-sign');
  const InfoIcon = getIcon('info');
  const CheckIcon = getIcon('check');
  const AlertCircleIcon = getIcon('alert-circle');
  const AlertTriangleIcon = getIcon('alert-triangle');
  const BoxIcon = getIcon('box');
  const ArchiveIcon = getIcon('archive');
  const BarChart4Icon = getIcon('bar-chart-4');
  const FilterIcon = getIcon('filter');
  const RefreshCwIcon = getIcon('refresh-cw');

  // Initialize state with demo data
  const initialProducts = [
    {
      id: "1",
      name: "Wireless Headphones",
      description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
      sku: "WH-1000XM4",
      category: "Electronics",
      currentStock: 24,
      minimumStockLevel: 10,
      restockStatus: "In Stock",
      restockThreshold: 12,
      unitPrice: 349.99,
      supplierInfo: "Sony Electronics",
      location: "Warehouse A - Shelf 5B",
      lastUpdated: new Date().toISOString(),
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "2",
      name: "Smart Watch Series 7",
      description: "Advanced smartwatch with health monitoring and GPS",
      sku: "SWS7-42MM",
      category: "Wearables",
      currentStock: 8,
      minimumStockLevel: 15,
      restockStatus: "Low Stock",
      restockThreshold: 10,
      unitPrice: 399.99,
      supplierInfo: "Apple Inc.",
      location: "Warehouse B - Shelf 2C",
      lastUpdated: new Date().toISOString(),
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "3",
      name: "4K Ultra HD TV 55\"",
      description: "Smart TV with voice control and 4K resolution",
      sku: "TV-55OLED",
      category: "Electronics",
      currentStock: 0,
      minimumStockLevel: 5,
      restockStatus: "Out of Stock",
      restockThreshold: 3,
      unitPrice: 1299.99,
      supplierInfo: "LG Electronics",
      location: "Warehouse A - Section 12",
      lastUpdated: new Date().toISOString(),
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "4",
      name: "Gaming Laptop Pro",
      description: "High-performance gaming laptop with RGB keyboard",
      sku: "GL-RTX3070",
      category: "Computers",
      currentStock: 12,
      minimumStockLevel: 8,
      restockStatus: "In Stock",
      restockThreshold: 5,
      unitPrice: 1799.99,
      supplierInfo: "MSI Technology",
      location: "Warehouse C - Shelf 1A",
      lastUpdated: new Date().toISOString(),
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "5",
      name: "Ergonomic Office Chair",
      description: "Adjustable office chair with lumbar support",
      sku: "EOC-PRO2",
      category: "Furniture",
      currentStock: 3,
      minimumStockLevel: 10,
      restockStatus: "Low Stock",
      restockThreshold: 5,
      unitPrice: 299.99,
      supplierInfo: "Herman Miller",
      location: "Warehouse B - Section 4",
      lastUpdated: new Date().toISOString(),
      image: "https://images.unsplash.com/photo-1505797149-85db3bc58b21?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  // State management
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [currentProduct, setCurrentProduct] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [formErrors, setFormErrors] = useState({});

  // Empty form template
  const emptyProductForm = {
    id: '',
    name: '',
    description: '',
    sku: '',
    category: '',
    currentStock: 0,
    minimumStockLevel: 0,
    restockThreshold: 0,
    unitPrice: 0,
    supplierInfo: '',
    location: '',
    image: ''
  };

  // Save products to localStorage when they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Get all unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Function to determine restock status
  const getRestockStatus = (currentStock, minimumStockLevel) => {
    if (currentStock <= 0) return "Out of Stock";
    if (currentStock < minimumStockLevel) return "Low Stock";
    return "In Stock";
  };

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
        return <InfoIcon className="h-3.5 w-3.5 mr-1" />;
    }
  };

  // Filtered and sorted products
  const filteredProducts = products
    .filter(product => {
      // Apply search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply category filter
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Apply sorting
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

  // Function to handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Functions to handle modal operations
  const openAddModal = () => {
    setModalMode('add');
    setCurrentProduct({...emptyProductForm, id: Date.now().toString()});
    setFormErrors({});
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setModalMode('edit');
    setCurrentProduct({...product});
    setFormErrors({});
    setShowModal(true);
  };

  const openViewModal = (product) => {
    setModalMode('view');
    setCurrentProduct({...product});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let processedValue = value;
    
    // Convert numeric inputs to numbers
    if (type === 'number') {
      processedValue = value === '' ? '' : Number(value);
    }
    
    setCurrentProduct({
      ...currentProduct,
      [name]: processedValue
    });
    
    // Clear error for this field when user makes changes
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const errors = {};
    
    if (!currentProduct.name.trim()) {
      errors.name = "Product name is required";
    }
    
    if (!currentProduct.sku.trim()) {
      errors.sku = "SKU is required";
    } else if (
      modalMode === 'add' && 
      products.some(p => p.sku.toLowerCase() === currentProduct.sku.toLowerCase())
    ) {
      errors.sku = "SKU must be unique";
    } else if (
      modalMode === 'edit' && 
      products.some(p => p.id !== currentProduct.id && p.sku.toLowerCase() === currentProduct.sku.toLowerCase())
    ) {
      errors.sku = "SKU must be unique";
    }
    
    if (currentProduct.currentStock < 0) {
      errors.currentStock = "Stock cannot be negative";
    }
    
    if (currentProduct.minimumStockLevel < 0) {
      errors.minimumStockLevel = "Minimum stock level cannot be negative";
    }
    
    if (currentProduct.unitPrice < 0) {
      errors.unitPrice = "Price cannot be negative";
    }
    
    if (!currentProduct.category.trim()) {
      errors.category = "Category is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to save product (add or edit)
  const saveProduct = () => {
    if (!validateForm()) return;
    
    // Update restock status based on current stock level
    const restockStatus = getRestockStatus(
      currentProduct.currentStock, 
      currentProduct.minimumStockLevel
    );
    
    const updatedProduct = {
      ...currentProduct,
      restockStatus,
      lastUpdated: new Date().toISOString()
    };
    
    if (modalMode === 'add') {
      setProducts([...products, updatedProduct]);
      toast.success("Product added successfully!");
    } else {
      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      toast.success("Product updated successfully!");
    }
    
    closeModal();
  };

  // Function to delete product
  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
      toast.success("Product deleted successfully!");
    }
  };

  // Function to reset demo data
  const resetDemoData = () => {
    if (window.confirm("Reset to demo data? This will replace all current products.")) {
      setProducts(initialProducts);
      toast.info("Demo data has been restored");
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      return "Invalid date";
    }
  };

  // Function to generate sort indicator
  const getSortIndicator = (columnName) => {
    if (sortConfig.key !== columnName) {
      return null;
    }
    
    return sortConfig.direction === 'ascending' 
      ? '↑' 
      : '↓';
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-surface-900 dark:text-white flex items-center">
            <PackageIcon className="h-6 w-6 mr-2 text-primary" />
            Product Inventory
          </h2>
          <p className="text-surface-600 dark:text-surface-400 text-sm">
            Manage your products and monitor stock levels
          </p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="btn btn-primary flex items-center" 
        >
          <PlusIcon className="h-4 w-4 mr-1.5" />
          Add Product
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-surface-500" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2 items-center">
          <FilterIcon className="h-4 w-4 text-surface-500" />
          <select
            className="input"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-between items-center space-x-2 text-surface-600 dark:text-surface-400">
          <div className="text-sm">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </div>
          
          <button 
            onClick={resetDemoData}
            className="flex items-center text-sm p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded"
            title="Reset to demo data"
          >
            <RefreshCwIcon className="h-4 w-4 mr-1.5" />
            Reset Demo
          </button>
        </div>
      </div>
      
      {/* Products Table */}
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full bg-white dark:bg-surface-800 shadow-card rounded-xl">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wider">
                <button 
                  className="flex items-center font-medium hover:text-primary"
                  onClick={() => requestSort('name')}
                >
                  Product {getSortIndicator('name')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wider">
                <button 
                  className="flex items-center font-medium hover:text-primary"
                  onClick={() => requestSort('category')}
                >
                  Category {getSortIndicator('category')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wider">
                <button 
                  className="flex items-center font-medium hover:text-primary"
                  onClick={() => requestSort('sku')}
                >
                  SKU {getSortIndicator('sku')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wider">
                <button 
                  className="flex items-center font-medium hover:text-primary"
                  onClick={() => requestSort('currentStock')}
                >
                  Stock {getSortIndicator('currentStock')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wider">
                <button 
                  className="flex items-center font-medium hover:text-primary"
                  onClick={() => requestSort('restockStatus')}
                >
                  Status {getSortIndicator('restockStatus')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wider">
                <button 
                  className="flex items-center font-medium hover:text-primary"
                  onClick={() => requestSort('unitPrice')}
                >
                  Price {getSortIndicator('unitPrice')}
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr 
                  key={product.id}
                  className="hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors cursor-pointer"
                  onClick={() => openViewModal(product)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded bg-surface-100 dark:bg-surface-700 overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <PackageIcon className="h-5 w-5 text-surface-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-surface-900 dark:text-white">{product.name}</div>
                        <div className="text-xs text-surface-500 truncate max-w-xs">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-surface-700 dark:text-surface-300">
                      <TagIcon className="h-3.5 w-3.5 mr-1.5 text-surface-500" />
                      {product.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 h-2 rounded-full bg-surface-200 dark:bg-surface-700">
                        <div 
                          className={`h-full rounded-full ${
                            product.currentStock <= 0 ? 'bg-red-500' : 
                            product.currentStock < product.minimumStockLevel ? 'bg-amber-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(100, (product.currentStock / (product.minimumStockLevel * 2)) * 100)}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                        {product.currentStock}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`badge flex items-center ${getStatusBadgeClass(product.restockStatus)}`}>
                      {getStatusIcon(product.restockStatus)}
                      {product.restockStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                    <div className="flex items-center">
                      <DollarSignIcon className="h-3.5 w-3.5 mr-1 text-surface-500" />
                      {product.unitPrice.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(product);
                        }}
                        className="text-primary hover:text-primary-dark p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                        title="Edit product"
                      >
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProduct(product.id);
                        }}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                        title="Delete product"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openViewModal(product);
                        }}
                        className="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                        title="View details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-surface-600 dark:text-surface-400">
                  <div className="flex flex-col items-center justify-center">
                    <BoxIcon className="h-8 w-8 mb-2 text-surface-400" />
                    <p className="text-lg font-medium mb-1">No products found</p>
                    <p className="text-sm">
                      {searchTerm || categoryFilter !== 'All' ? 
                        "Try adjusting your search or filters" : 
                        "Start by adding a new product"}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div 
                className="fixed inset-0 transition-opacity bg-surface-900 bg-opacity-75" 
                onClick={closeModal}
              ></div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
              
              <motion.div
                className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle bg-white dark:bg-surface-800 rounded-2xl shadow-xl transform sm:align-middle sm:max-w-lg lg:max-w-4xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-surface-900 dark:text-white flex items-center">
                    {modalMode === 'add' && (
                      <>
                        <PlusIcon className="h-5 w-5 mr-2 text-primary" />
                        Add New Product
                      </>
                    )}
                    {modalMode === 'edit' && (
                      <>
                        <EditIcon className="h-5 w-5 mr-2 text-primary" />
                        Edit Product
                      </>
                    )}
                    {modalMode === 'view' && (
                      <>
                        <EyeIcon className="h-5 w-5 mr-2 text-primary" />
                        Product Details
                      </>
                    )}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  >
                    <XIcon className="h-5 w-5 text-surface-600 dark:text-surface-400" />
                  </button>
                </div>
                
                {currentProduct && (
                  <>
                    {modalMode === 'view' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="aspect-square w-full overflow-hidden rounded-xl bg-surface-100 dark:bg-surface-700 flex items-center justify-center">
                            {currentProduct.image ? (
                              <img 
                                src={currentProduct.image} 
                                alt={currentProduct.name} 
                                className="h-full w-full object-contain" 
                              />
                            ) : (
                              <PackageIcon className="h-16 w-16 text-surface-400" />
                            )}
                          </div>
                          
                          <div className="bg-surface-50 dark:bg-surface-700/50 rounded-xl p-4">
                            <h4 className="font-medium text-sm text-surface-600 dark:text-surface-400 mb-1 uppercase">
                              Stock Information
                            </h4>
                            <div className="flex items-center justify-between my-3">
                              <span className="text-surface-700 dark:text-surface-300">Current Stock:</span>
                              <span className="font-medium text-surface-900 dark:text-white">
                                {currentProduct.currentStock}
                              </span>
                            </div>
                            <div className="flex items-center justify-between my-3">
                              <span className="text-surface-700 dark:text-surface-300">Minimum Level:</span>
                              <span className="font-medium text-surface-900 dark:text-white">
                                {currentProduct.minimumStockLevel}
                              </span>
                            </div>
                            <div className="flex items-center justify-between my-3">
                              <span className="text-surface-700 dark:text-surface-300">Restock Threshold:</span>
                              <span className="font-medium text-surface-900 dark:text-white">
                                {currentProduct.restockThreshold}
                              </span>
                            </div>
                            <div className="flex items-center justify-between my-3">
                              <span className="text-surface-700 dark:text-surface-300">Status:</span>
                              <span className={`badge ${getStatusBadgeClass(currentProduct.restockStatus)}`}>
                                {currentProduct.restockStatus}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-1">
                              {currentProduct.name}
                            </h2>
                            <p className="text-surface-600 dark:text-surface-400 pb-2">
                              {currentProduct.description}
                            </p>
                            <div className="flex items-center mt-2">
                              <TagIcon className="h-4 w-4 text-surface-500 mr-2" />
                              <span className="text-surface-700 dark:text-surface-300">
                                {currentProduct.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-surface-200 dark:border-surface-700">
                              <span className="text-surface-700 dark:text-surface-300">SKU:</span>
                              <span className="font-medium text-surface-900 dark:text-white">
                                {currentProduct.sku}
                              </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-surface-200 dark:border-surface-700">
                              <span className="text-surface-700 dark:text-surface-300">Unit Price:</span>
                              <span className="font-medium text-surface-900 dark:text-white">
                                ${currentProduct.unitPrice.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-surface-200 dark:border-surface-700">
                              <span className="text-surface-700 dark:text-surface-300">Location:</span>
                              <span className="font-medium text-surface-900 dark:text-white">
                                {currentProduct.location || "Not specified"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-surface-200 dark:border-surface-700">
                              <span className="text-surface-700 dark:text-surface-300">Supplier:</span>
                              <span className="font-medium text-surface-900 dark:text-white">
                                {currentProduct.supplierInfo || "Not specified"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <span className="text-surface-700 dark:text-surface-300">Last Updated:</span>
                              <span className="text-sm text-surface-600 dark:text-surface-400">
                                {formatDate(currentProduct.lastUpdated)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-3 mt-6">
                            <button
                              onClick={closeModal}
                              className="btn btn-outline"
                            >
                              Close
                            </button>
                            <button
                              onClick={() => {
                                closeModal();
                                openEditModal(currentProduct);
                              }}
                              className="btn btn-primary"
                            >
                              <EditIcon className="h-4 w-4 mr-1.5" />
                              Edit Product
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="name" className="label">Product Name*</label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                className={`input ${formErrors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                                value={currentProduct.name}
                                onChange={handleInputChange}
                                required
                              />
                              {formErrors.name && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                              )}
                            </div>
                            
                            <div>
                              <label htmlFor="sku" className="label">SKU (Stock Keeping Unit)*</label>
                              <input
                                type="text"
                                id="sku"
                                name="sku"
                                className={`input ${formErrors.sku ? 'border-red-500 focus:ring-red-500' : ''}`}
                                value={currentProduct.sku}
                                onChange={handleInputChange}
                                required
                              />
                              {formErrors.sku && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.sku}</p>
                              )}
                            </div>
                            
                            <div>
                              <label htmlFor="category" className="label">Category*</label>
                              <input
                                type="text"
                                id="category"
                                name="category"
                                className={`input ${formErrors.category ? 'border-red-500 focus:ring-red-500' : ''}`}
                                value={currentProduct.category}
                                onChange={handleInputChange}
                                required
                                list="categories"
                              />
                              <datalist id="categories">
                                {categories.filter(c => c !== 'All').map(cat => (
                                  <option key={cat} value={cat} />
                                ))}
                              </datalist>
                              {formErrors.category && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>
                              )}
                            </div>
                            
                            <div>
                              <label htmlFor="description" className="label">Description</label>
                              <textarea
                                id="description"
                                name="description"
                                rows="3"
                                className="input"
                                value={currentProduct.description}
                                onChange={handleInputChange}
                              ></textarea>
                            </div>
                            
                            <div>
                              <label htmlFor="image" className="label">Image URL</label>
                              <input
                                type="url"
                                id="image"
                                name="image"
                                className="input"
                                value={currentProduct.image}
                                onChange={handleInputChange}
                                placeholder="https://example.com/image.jpg"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="currentStock" className="label">Current Stock*</label>
                              <input
                                type="number"
                                id="currentStock"
                                name="currentStock"
                                className={`input ${formErrors.currentStock ? 'border-red-500 focus:ring-red-500' : ''}`}
                                value={currentProduct.currentStock}
                                onChange={handleInputChange}
                                min="0"
                                required
                              />
                              {formErrors.currentStock && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.currentStock}</p>
                              )}
                            </div>
                            
                            <div>
                              <label htmlFor="minimumStockLevel" className="label">Minimum Stock Level*</label>
                              <input
                                type="number"
                                id="minimumStockLevel"
                                name="minimumStockLevel"
                                className={`input ${formErrors.minimumStockLevel ? 'border-red-500 focus:ring-red-500' : ''}`}
                                value={currentProduct.minimumStockLevel}
                                onChange={handleInputChange}
                                min="0"
                                required
                              />
                              {formErrors.minimumStockLevel && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.minimumStockLevel}</p>
                              )}
                            </div>
                            
                            <div>
                              <label htmlFor="restockThreshold" className="label">Restock Threshold</label>
                              <input
                                type="number"
                                id="restockThreshold"
                                name="restockThreshold"
                                className="input"
                                value={currentProduct.restockThreshold}
                                onChange={handleInputChange}
                                min="0"
                              />
                              <p className="mt-1 text-xs text-surface-500">
                                When stock falls below this number, it will be flagged for reordering
                              </p>
                            </div>
                            
                            <div>
                              <label htmlFor="unitPrice" className="label">Unit Price ($)*</label>
                              <input
                                type="number"
                                id="unitPrice"
                                name="unitPrice"
                                className={`input ${formErrors.unitPrice ? 'border-red-500 focus:ring-red-500' : ''}`}
                                value={currentProduct.unitPrice}
                                onChange={handleInputChange}
                                step="0.01"
                                min="0"
                                required
                              />
                              {formErrors.unitPrice && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.unitPrice}</p>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="supplierInfo" className="label">Supplier</label>
                                <input
                                  type="text"
                                  id="supplierInfo"
                                  name="supplierInfo"
                                  className="input"
                                  value={currentProduct.supplierInfo}
                                  onChange={handleInputChange}
                                />
                              </div>
                              
                              <div>
                                <label htmlFor="location" className="label">Storage Location</label>
                                <input
                                  type="text"
                                  id="location"
                                  name="location"
                                  className="input"
                                  value={currentProduct.location}
                                  onChange={handleInputChange}
                                  placeholder="Warehouse A - Shelf 5"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3 mt-8">
                          <button
                            type="button"
                            onClick={closeModal}
                            className="btn btn-outline"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={(e) => { e.preventDefault(); saveProduct(); }}
                          >
                            {modalMode === 'add' ? 'Add Product' : 'Save Changes'}
                          </button>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Stock Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card flex items-center">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
            <CheckIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-surface-600 dark:text-surface-400 text-sm">In Stock</h3>
            <p className="text-2xl font-semibold text-surface-900 dark:text-white">
              {products.filter(p => p.restockStatus === 'In Stock').length}
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card flex items-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-4">
            <AlertTriangleIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="text-surface-600 dark:text-surface-400 text-sm">Low Stock</h3>
            <p className="text-2xl font-semibold text-surface-900 dark:text-white">
              {products.filter(p => p.restockStatus === 'Low Stock').length}
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card flex items-center">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-4">
            <AlertCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-surface-600 dark:text-surface-400 text-sm">Out of Stock</h3>
            <p className="text-2xl font-semibold text-surface-900 dark:text-white">
              {products.filter(p => p.restockStatus === 'Out of Stock').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFeature;