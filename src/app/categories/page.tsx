import { fetchAllCategories } from '@/action/category.action';
import CategoriesClient from '@/components/category/CategoriesClient';
import { Suspense } from 'react';

export default async function CategoriesPage() {
  const categories = await fetchAllCategories();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse by Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of medicines organized by categories
          </p>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-lg text-gray-600">Loading categories...</div>
          </div>
        }>
          <CategoriesClient initialCategories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
