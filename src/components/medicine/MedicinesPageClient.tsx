'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MedicineGrid from './medicinegrid';
import MedicineFilters from './medicinefilters';
import { Medicine, Brand, Category } from '@/lib/types/action.types';
import { Search, SlidersHorizontal } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="sticky top-16 bg-white z-40 py-4 border-b">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              isFilterOpen 
                ? 'bg-blue-50 text-blue-600 border-blue-200' 
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </button>
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
              className="col-span-12 lg:col-span-3"
            >
              <div className="sticky top-36">
                <MedicineFilters 
                  categories={categories}
                  brands={brands}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Medicines Grid */}
        <div className={`col-span-12 ${isFilterOpen ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
          <MedicineGrid medicines={filteredMedicines} />
        </div>
      </div>
    </div>
  );
} 