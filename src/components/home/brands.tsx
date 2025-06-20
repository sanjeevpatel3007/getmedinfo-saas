import Link from 'next/link';
import { ChevronRight, Building2 } from 'lucide-react';
import { Brand } from '@/lib/types/action.types';

interface BrandsProps {
  brands: Brand[];
}

export default function Brands({ brands }: BrandsProps) {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Popular Brands
            </h2>
            <p className="text-gray-600">Trusted pharmaceutical companies</p>
          </div>
          <Link
            href="/brands"
            className="group inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All Brands
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands#${brand.id}`}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8" />
                </div>
                
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                  {brand.name}
                </h3>
                
                {brand.country && (
                  <p className="text-sm text-gray-500">
                    {brand.country}
                  </p>
                )}
                
                <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all">
                  View Products
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 