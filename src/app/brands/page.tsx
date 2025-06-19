import { fetchAllBrands } from '@/action/brands.action';
import BrandsClient from '@/components/brands/BrandsClient';
import { Suspense } from 'react';

export default async function BrandsPage() {
  const brands = await fetchAllBrands();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse by Brands
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover a wide range of brands and find the perfect medicine for your needs.
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <BrandsClient brands={brands} />
        </Suspense>
      </div>
    </div>
  );
}


