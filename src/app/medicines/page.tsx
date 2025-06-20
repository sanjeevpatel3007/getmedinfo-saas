import { Suspense } from 'react';
import { fetchAllMedicinesWithBrandAndCategory } from '@/action/medicines.action';
import { fetchAllCategories } from '@/action/category.action';
import { fetchAllBrands } from '@/action/brands.action';
import MedicinesPageClient from '@/components/medicine/MedicinesPageClient';

export default async function MedicinesPage() {
  const [medicines, categories, brands] = await Promise.all([
    fetchAllMedicinesWithBrandAndCategory(),
    fetchAllCategories(),
    fetchAllBrands(),
  ]);

  return (
    <div className="w-full py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Browse Medicines
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive database of medicines and their detailed information.
          </p>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-base text-gray-600">Loading medicines...</div>
          </div>
        }>
          <MedicinesPageClient 
            initialMedicines={medicines}
            categories={categories}
            brands={brands}
          />
        </Suspense>
      </div>
    </div>
  );
} 