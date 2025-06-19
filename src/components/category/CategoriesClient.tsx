'use client';

import { useState, useEffect } from 'react';
import { Category, Medicine } from '@/lib/types/action.types';
import CategoryCard from './card';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, ArrowRight } from 'lucide-react';

interface CategoriesClientProps {
  initialCategories: Category[];
}

export default function CategoriesClient({ initialCategories }: CategoriesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);

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
          />
        ))}
      </div>

      {/* Medicines List */}
      <div className="lg:col-span-5">
        <AnimatePresence mode="wait">
          {selectedCategory ? (
            <motion.div
              key={selectedCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Pill className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedCategory.name}
                  </h2>
                </div>
                {selectedCategory.description && (
                  <p className="mt-2 text-sm text-gray-600">
                    {selectedCategory.description}
                  </p>
                )}
              </div>

              <div className="divide-y divide-gray-200">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">
                    Loading medicines...
                  </div>
                ) : medicines.length > 0 ? (
                  medicines.map((medicine) => (
                    <Link
                      key={medicine.id}
                      href={`/medicines/${medicine.slug}`}
                      className="block p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {medicine.name}
                          </h3>
                          {medicine.brand && (
                            <p className="text-sm text-gray-500">
                              {medicine.brand.name}
                            </p>
                          )}
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No medicines found in this category
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-6 text-center"
            >
              <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Select a Category
              </h3>
              <p className="text-sm text-gray-500">
                Choose a category to view its medicines
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 