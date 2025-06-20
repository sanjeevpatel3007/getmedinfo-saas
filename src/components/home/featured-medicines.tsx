import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Pill, Stethoscope, Clock } from 'lucide-react';
import { Medicine } from '@/lib/types/action.types';

interface FeaturedMedicinesProps {
  medicines: Medicine[];
}

export default function FeaturedMedicines({ medicines }: FeaturedMedicinesProps) {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Medicines
            </h2>
            <p className="text-gray-600">Explore our curated selection of medicines</p>
          </div>
          <Link
            href="/medicines"
            className="group inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All Medicines
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {medicines.map((medicine) => (
            <Link
              key={medicine.id}
              href={`/medicines/${medicine.slug}`}
              className="group block bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3]  relative bg-gray-50">
                {medicine.images && medicine.images[0] ? (
                  <Image
                    src={medicine.images[0]}
                    alt={medicine.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Pill className="w-16 h-16 text-gray-300" />
                  </div>
                )}
                {medicine.prescription_required && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Stethoscope className="w-3 h-3" />
                      Rx Only
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
                    {medicine.name}
                  </h3>
                  {medicine.brand && (
                    <p className="text-sm text-gray-200">{medicine.brand.name}</p>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-blue-600">
                    ${medicine.price?.toFixed(2)}
                  </span>
                  {medicine.category && (
                    <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-lg">
                      {medicine.category.name}
                    </span>
                  )}
                </div>

                {medicine.dosages && medicine.dosages.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="truncate">{medicine.dosages[0]}</span>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {medicine.ingredients?.slice(0, 3).map((ingredient, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center"
                        title={ingredient}
                      >
                        <span className="text-[10px] font-medium text-blue-600">
                          {ingredient.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    ))}
                    {medicine.ingredients && medicine.ingredients.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                        <span className="text-[10px] font-medium text-gray-600">
                          +{medicine.ingredients.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-blue-600 group-hover:translate-x-1 transition-transform">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 