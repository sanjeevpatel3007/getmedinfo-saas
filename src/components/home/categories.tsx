import Link from 'next/link';
import { ChevronRight, Grid, Syringe, Pill, Stethoscope, Heart, Brain } from 'lucide-react';
import { Category } from '@/lib/types/action.types';

const categoryIcons = {
  'Pain Relief': Pill,
  'Antibiotics': Stethoscope,
  'Vaccines': Syringe,
  'Heart': Heart,
  'Neurological': Brain,
  'General': Stethoscope,
};

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Popular Categories
            </h2>
            <p className="text-gray-600">Browse medicines by category</p>
          </div>
          <Link
            href="/categories"
            className="group inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All Categories
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || Grid;
            
            return (
              <Link
                key={category.id}
                href={`/categories#${category.id}`}
                className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                    <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                      Browse Category
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
} 