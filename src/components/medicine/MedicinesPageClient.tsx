'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MedicineGrid from './medicinegrid';
import MedicineFilters from './medicinefilters';
import { Medicine, Brand, Category } from '@/lib/types/action.types';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MedicinesPageClientProps {
  initialMedicines: Medicine[];
  categories: Category[];
  brands: Brand[];
}

export default function MedicinesPageClient({
  initialMedicines,
  categories,
  brands,
}: MedicinesPageClientProps) {
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredMedicines = initialMedicines.filter(medicine => 
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="sticky top-16 bg-white z-40 py-3 border-b">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-colors ${
              isFilterOpen 
                ? 'bg-blue-50 text-blue-600 border-blue-200' 
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 mt-2 px-1 text-sm">
          <span className="text-gray-600">
            Showing <span className="font-medium text-gray-900">{filteredMedicines.length}</span> medicines
          </span>
          {searchQuery && (
            <span className="text-gray-600">
              for "<span className="font-medium text-gray-900">{searchQuery}</span>"
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Filters Section */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="col-span-12 lg:col-span-2"
            >
              <div className="sticky top-32">
                <MedicineFilters 
                  categories={categories}
                  brands={brands}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Medicines Grid */}
        <div className={`col-span-12 ${isFilterOpen ? 'lg:col-span-10' : 'lg:col-span-12'}`}>
          <MedicineGrid medicines={filteredMedicines} />
        </div>
      </div>
    </div>
  );
} 