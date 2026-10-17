import React from 'react';
import {
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  PlusCircle,
  Utensils,
  Home,
  Car,
  Zap,
  ShoppingBag,
  Film,
  HeartPulse,
  GraduationCap,
  Plane,
  Receipt,
  HelpCircle,
} from 'lucide-react';

const iconMap = {
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  PlusCircle,
  Utensils,
  Home,
  Car,
  Zap,
  ShoppingBag,
  Film,
  HeartPulse,
  GraduationCap,
  Plane,
  Receipt,
};

export default function CategoryIcon({ name, className = 'w-5 h-5' }) {
  const Component = iconMap[name] || HelpCircle;
  return <Component className={className} />;
}
