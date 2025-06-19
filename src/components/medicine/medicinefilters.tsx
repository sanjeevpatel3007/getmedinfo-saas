'use client';

import { useState } from 'react';
import { Brand, Category } from '@/lib/types/action.types';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

interface MedicineFiltersProps {
  categories: Category[];
  brands: Brand[];
}

export default function MedicineFilters({ categories, brands }: MedicineFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || ''
  );
  const [selectedBrand, setSelectedBrand] = useState<string>(
    searchParams.get('brand') || ''
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory) params.set('category', selectedCategory);
    else params.delete('category');
    if (selectedBrand) params.set('brand', selectedBrand);
    else params.delete('brand');
    if (priceRange[0] > 0 || priceRange[1] < 1000) {
      params.set('minPrice', priceRange[0].toString());
      params.set('maxPrice', priceRange[1].toString());
    } else {
      params.delete('minPrice');
      params.delete('maxPrice');
    }
    
    router.push(`/medicines?${params.toString()}`);
  };

  const FilterSection = ({ 
    title, 
    isExpanded, 
    onToggle, 
    children 
  }: { 
    title: string; 
    isExpanded: boolean; 
    onToggle: () => void; 
    children: React.ReactNode 
  }) => (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4"
        >
          {children}
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="space-y-1">
        <FilterSection
          title="Categories"
          isExpanded={expandedSections.categories}
          onToggle={() => toggleSection('categories')}
        >
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div
                  className={`w-5 h-5 rounded border transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300 group-hover:border-blue-400'
                  }`}
                >
                  {selectedCategory === category.id && (
                    <Check className="w-4 h-4 text-white m-0.5" />
                  )}
                </div>
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={selectedCategory === category.id}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="sr-only"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Brands"
          isExpanded={expandedSections.brands}
          onToggle={() => toggleSection('brands')}
        >
          <div className="space-y-2">
            {brands.map((brand) => (
              <label
                key={brand.id}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div
                  className={`w-5 h-5 rounded border transition-colors ${
                    selectedBrand === brand.id
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300 group-hover:border-blue-400'
                  }`}
                >
                  {selectedBrand === brand.id && (
                    <Check className="w-4 h-4 text-white m-0.5" />
                  )}
                </div>
                <input
                  type="radio"
                  name="brand"
                  value={brand.id}
                  checked={selectedBrand === brand.id}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="sr-only"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">
                  {brand.name}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Price Range"
          isExpanded={expandedSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                ${priceRange[0]}
              </span>
              <span className="text-sm font-medium text-gray-900">
                ${priceRange[1]}
              </span>
            </div>
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute h-2 bg-blue-600 rounded-full"
                  style={{
                    left: `${(priceRange[0] / 1000) * 100}%`,
                    right: `${100 - (priceRange[1] / 1000) * 100}%`,
                  }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="absolute w-full h-2 opacity-0 cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="absolute w-full h-2 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </FilterSection>
      </div>

      <div className="mt-6">
        <button
          onClick={handleFilter}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Apply Filters
        </button>
        <button
          onClick={() => {
            setSelectedCategory('');
            setSelectedBrand('');
            setPriceRange([0, 1000]);
            router.push('/medicines');
          }}
          className="w-full mt-2 text-sm text-gray-600 hover:text-gray-900"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
} 