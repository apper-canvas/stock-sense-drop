import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Tag,
  DollarSign,
  Info,
  Check,
  AlertCircle,
  AlertTriangle,
  Box,
  Archive,
  Filter,
  RefreshCw,
  Truck,
  Settings,
  BarChart4,
  ChevronRight,
  Users,
  ShoppingCart,
  Home,
  HelpCircle,
  Calendar,
  Clock,
  CreditCard,
  Layers,
  Award
} from 'lucide-react';

// Map of icon names to their respective components
const iconMap = {
  'package': Package,
  'search': Search,
  'plus': Plus,
  'edit-3': Edit,
  'edit': Edit,
  'trash-2': Trash2,
  'eye': Eye,
  'x': X,
  'tag': Tag,
  'dollar-sign': DollarSign,
  'info': Info,
  'check': Check,
  'alert-circle': AlertCircle,
  'alert-triangle': AlertTriangle,
  'box': Box,
  'archive': Archive,
  'filter': Filter,
  'refresh-cw': RefreshCw,
  'truck': Truck,
  'settings': Settings,
  'bar-chart-4': BarChart4,
  'chevron-right': ChevronRight,
  'users': Users,
  'shopping-cart': ShoppingCart,
  'home': Home,
  'help-circle': HelpCircle,
  'calendar': Calendar,
  'clock': Clock,
  'credit-card': CreditCard,
  'layers': Layers,
  'award': Award
    return LucideIcons.Smile;

export const getIcon = (name) => {
  const IconComponent = iconMap[name.toLowerCase()];
  
  // Return the icon component or a fallback if not found
  return IconComponent || Info;
};
  }
  
  // Step 1: Try direct match first (if already PascalCase)
  if (LucideIcons[iconName] && typeof LucideIcons[iconName] === 'function') {
    return LucideIcons[iconName];
  }
  
  // Step 2: Handle various transformations from kebab-case to PascalCase
  let componentName = '';
  if (iconName.includes('-')) {
    // Handle kebab-case with numbers (bar-chart-2 → BarChart2)
    componentName = iconName
      .split('-')
      .map(part => {
        // Check if the part is just a number and attach it without capitalization
        if (/^\d+$/.test(part)) {
          return part;
        }
        // Otherwise capitalize the first letter
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join('');
  } else {
    // For single word icons, just capitalize first letter
    componentName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  }
  
  // Step 3: Check if we have a valid component after transformation
  if (LucideIcons[componentName] && typeof LucideIcons[componentName] === 'function') {
    return LucideIcons[componentName];
  }
  
  // Step 4: Advanced retry - try various transformations if needed
  // Try removing spaces and underscores (user_circle → UserCircle)
  const noSpaces = componentName.replace(/[\s_]/g, '');
  if (LucideIcons[noSpaces] && typeof LucideIcons[noSpaces] === 'function') {
    return LucideIcons[noSpaces];
  }
  
  // Try inserting number without space (barChart2 → BarChart2)
  const numberPattern = /([A-Za-z])(\d+)$/;
  const withNumber = componentName.replace(numberPattern, '$1$2');
  if (LucideIcons[withNumber] && typeof LucideIcons[withNumber] === 'function') {
    return LucideIcons[withNumber];
  }
  
  // Fallback with console warning for debugging
  console.warn(`Icon "${iconName}" not found in Lucide (tried "${componentName}"), using Smile instead`);
  return LucideIcons.Smile;
};