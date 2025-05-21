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
  Award,
  Smile,
  LayoutDashboard,
  ClipboardList
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
  'award': Award,
  'smile': Smile,
  'layout-dashboard': LayoutDashboard,
  'clipboard-list': ClipboardList
};

export const getIcon = (name) => {
  if (!name) {
    console.warn('No icon name provided to getIcon, returning Info icon as fallback');
    return Info;
  }
  
  // Try to find the icon in our map (case insensitive)
  const iconName = name.toLowerCase();
  const IconComponent = iconMap[iconName];

  if (IconComponent) {
    return IconComponent;
  } else {
    // If not found, log a warning and return a fallback icon
    console.warn(`Icon "${name}" not found, using Info icon as fallback`);
    return Info;
  }
};