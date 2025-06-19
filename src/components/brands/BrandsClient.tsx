'use client';

import { Brand } from '@/lib/types/action.types';
import { Search } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { fetchMedicinesByBrandId } from '@/action/brands.action';

interface BrandsClientProps {
  brands: Brand[];
}

export default function BrandsClient({ brands }: BrandsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBrandClick = async (brand: Brand) => {
    setLoading(true);
    try {
      const medicinesList = await fetchMedicinesByBrandId(brand.id);
      setMedicines(medicinesList);
      setSelectedBrand(brand);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Selected Brand Medicines */}
      {selectedBrand && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Medicines by {selectedBrand.name}
            </h2>
            <button
              onClick={() => setSelectedBrand(null)}
              className="text-blue-600 hover:text-blue-800"
            >
              Back to Brands
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">Loading medicines...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {medicines.map((medicine) => (
                <Link
                  key={medicine.id}
                  href={`/medicines/${medicine.id}`}
                  className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-gray-900 hover:text-blue-600">
                    {medicine.name}
                  </h3>
                  {medicine.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {medicine.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Brands Grid */}
      {!selectedBrand && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBrands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => handleBrandClick(brand)}
              className="block w-full text-left"
            >
              <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-md hover:scale-105">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                  {brand.name}
                </h3>
                {brand.country && (
                  <p className="text-sm text-gray-600 mt-1">
                    Country: {brand.country}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {filteredBrands.length === 0 && !selectedBrand && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No brands found matching your search.
          </p>
        </div>
      )}
    </div>
  );
} 