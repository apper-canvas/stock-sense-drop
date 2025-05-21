import { Link } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';

const NotFound = () => {
  const AlertTriangleIcon = getIcon('alert-triangle');
  const HomeIcon = getIcon('home');

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6">
        <AlertTriangleIcon className="h-12 w-12 text-amber-600 dark:text-amber-500" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-surface-900 dark:text-white mb-2">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-surface-800 dark:text-surface-200 mb-4">Page Not Found</h2>
      
      <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      
      <Link 
        to="/" 
        className="inline-flex items-center px-5 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
      >
        <HomeIcon className="h-5 w-5 mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;