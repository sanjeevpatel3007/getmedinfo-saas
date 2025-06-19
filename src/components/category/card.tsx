import React from 'react';
import { Category } from '@/lib/types/action.types';
import { Pill, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CategoryCardProps {
  category: Category;
  medicineCount?: number;
  onClick?: () => void;
  isSelected?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  medicineCount = 0,
  onClick,
  isSelected = false
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left transition-all duration-200 ${
        isSelected 
          ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500 ring-opacity-50' 
          : 'bg-white hover:bg-gray-50 border-gray-200'
      } border rounded-xl shadow-sm overflow-hidden group`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${
              isSelected ? 'bg-blue-100' : 'bg-gray-100'
            } group-hover:bg-opacity-70`}>
              <Pill className={`w-6 h-6 ${
                isSelected ? 'text-blue-600' : 'text-gray-600'
              }`} />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${
                isSelected ? 'text-blue-900' : 'text-gray-900'
              } group-hover:text-blue-600 transition-colors`}>
                {category.name}
              </h3>
              {category.description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {category.description}
                </p>
              )}
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 ${
            isSelected ? 'text-blue-500' : 'text-gray-400'
          } group-hover:text-blue-500 transition-colors`} />
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            isSelected 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {medicineCount} Medicines
          </div>
        </div>
      </div>
    </button>
  );
};

export default CategoryCard;

