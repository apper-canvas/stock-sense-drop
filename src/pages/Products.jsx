import MainFeature from '../components/MainFeature';
import { Package } from 'lucide-react';

const Products = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="flex items-center text-3xl font-bold text-surface-900 dark:text-white mb-2">
          <Package className="h-8 w-8 mr-3 text-primary" />
          Products Management
        </h1>
        <p className="text-surface-600 dark:text-surface-400">
          Track inventory levels, manage product details, and monitor stock status.
        </p>
      </div>
      <MainFeature />
    </div>
  );
};

export default Products;