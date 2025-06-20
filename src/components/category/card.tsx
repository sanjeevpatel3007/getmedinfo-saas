import React from 'react';
import { Category } from '@/lib/types/action.types';
import { Grid, ChevronRight, Pill, Stethoscope, Heart, Brain, Syringe } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  medicineCount?: number;
  onClick?: () => void;
  isSelected?: boolean;
}

const categoryIcons = {
  'Pain Relief': Pill,
  'Antibiotics': Stethoscope,
  'Vaccines': Syringe,
  'Heart': Heart,
  'Neurological': Brain,
  'General': Grid,
};

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  medicineCount = 0,
  onClick,
  isSelected = false
}) => {
  const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || Grid;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left transition-all duration-300 relative ${
        isSelected 
          ? 'bg-gradient-to-r from-blue-50 to-blue-50/30 border-blue-200 ring-2 ring-blue-500/30' 
          : 'bg-white hover:bg-gray-50/50 border-gray-200 hover:border-blue-200/50'
      } border rounded-2xl shadow-sm overflow-hidden group`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] -z-1" />
      
      {/* Highlight Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
        isSelected ? 'via-blue-400/5 to-blue-400/5' : 'via-transparent to-transparent'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${
              isSelected 
                ? 'bg-blue-100 shadow-sm' 
                : 'bg-gray-50 group-hover:bg-blue-50'
            } transition-colors duration-300`}>
              <IconComponent className={`w-6 h-6 ${
                isSelected ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'
              } transition-colors duration-300`} />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${
                isSelected ? 'text-blue-900' : 'text-gray-900'
              } group-hover:text-blue-700 transition-colors duration-300`}>
                {category.name}
              </h3>
              {category.description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2 group-hover:text-gray-600 transition-colors duration-300">
                  {category.description}
                </p>
              )}
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 ${
            isSelected ? 'text-blue-500' : 'text-gray-400'
          } group-hover:text-blue-500 transition-all duration-300 transform group-hover:translate-x-1`} />
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isSelected 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-50 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600'
          } transition-colors duration-300`}>
            {medicineCount} Medicines
          </div>
        </div>
      </div>
    </button>
  );
};

export default CategoryCard;

