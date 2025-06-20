import { fetchAllCategories } from '@/action/category.action';
import CategoriesClient from '@/components/category/CategoriesClient';
import { Suspense } from 'react';
import { Grid } from 'lucide-react';

export default async function CategoriesPage() {
  const categories = await fetchAllCategories();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#f8fafc_25%,#eff6ff_25%,#eff6ff_50%,#f8fafc_50%,#f8fafc_75%,#eff6ff_75%)] opacity-20" />
        <div className="absolute right-0 top-0 h-64 w-64 bg-blue-100 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="absolute left-0 bottom-0 h-64 w-64 bg-purple-100 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-2xl mb-8"> */}
              {/* <div className="px-3 py-1 bg-white rounded-xl shadow-sm">
                <Grid className="w-5 h-5 text-blue-600" />
              </div> */}
            {/* </div> */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Browse by Categories
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of medicines organized by categories
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-pulse w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Grid className="w-6 h-6 text-blue-300" />
              </div>
              <div className="text-base text-gray-500">Loading categories...</div>
            </div>
          </div>
        }>
          <CategoriesClient initialCategories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
