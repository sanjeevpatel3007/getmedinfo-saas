'use client';

import { useState, useEffect } from 'react';
import { Category, Medicine } from '@/lib/types/action.types';
import CategoryCard from './card';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, ArrowRight, Search, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface CategoriesClientProps {
  initialCategories: Category[];
}

export default function CategoriesClient({ initialCategories }: CategoriesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchMedicines() {
      if (selectedCategory) {
        setLoading(true);
        try {
          const response = await fetch(`/api/categories/${selectedCategory.id}/medicines`);
          const data = await response.json();
          setMedicines(data);
        } catch (error) {
          console.error('Error fetching medicines:', error);
        }
        setLoading(false);
      } else {
        setMedicines([]);
      }
    }

    fetchMedicines();
  }, [selectedCategory]);

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Categories List */}
      <div className="lg:col-span-7 space-y-4">
        {initialCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => setSelectedCategory(
              selectedCategory?.id === category.id ? null : category
            )}
            isSelected={selectedCategory?.id === category.id}
            medicineCount={selectedCategory?.id === category.id ? medicines.length : Math.floor(Math.random() * 10)}
          />
        ))}
      </div>

      {/* Medicines List */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
        <AnimatePresence mode="wait">
          {selectedCategory ? (
            <motion.div
              key={selectedCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <Pill className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedCategory.name}
                  </h2>
                </div>

                {selectedCategory.description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedCategory.description}
                  </p>
                )}

                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search medicines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {loading ? (
                  <div className="p-8 text-center">
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Loading medicines...</p>
                  </div>
                ) : filteredMedicines.length > 0 ? (
                  <div className="max-h-[500px] overflow-y-auto">
                    {filteredMedicines.map((medicine) => (
                      <Link
                        key={medicine.id}
                        href={`/medicines/${medicine.slug}`}
                        className="block hover:bg-gray-50 transition-colors"
                      >
                        <div className="p-4 flex items-center gap-4">
                          <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {medicine.images && medicine.images[0] ? (
                              <Image
                                src={medicine.images[0]}
                                alt={medicine.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Pill className="w-6 h-6 text-gray-300" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {medicine.name}
                            </h3>
                            {medicine.brand && (
                              <p className="text-xs text-gray-500 truncate">
                                {medicine.brand.name}
                              </p>
                            )}
                          </div>
                          
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Pill className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">No medicines found</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {searchQuery ? 'Try a different search term' : 'This category is empty'}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Pill className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a Category
              </h3>
              <p className="text-sm text-gray-500">
                Choose a category from the list to view its medicines
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 