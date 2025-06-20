'use client';

import { Medicine } from '@/lib/types/action.types';
import Link from 'next/link';
import Image from 'next/image';
import { Pill, Tag, Box, AlertCircle, Clock, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';

interface MedicineGridProps {
  medicines: Medicine[];
}

export default function MedicineGrid({ medicines }: MedicineGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {medicines.map((medicine, index) => (
        <motion.div
          key={medicine.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link
            href={`/medicines/${medicine.slug}`}
            className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
          >
            <div className="aspect-[4/3] relative bg-gray-50 overflow-hidden">
              {medicine.images && medicine.images[0] ? (
                <Image
                  src={medicine.images[0]}
                  alt={medicine.name}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <Pill className="w-12 h-12 text-gray-300" />
                </div>
              )}
              {medicine.prescription_required && (
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-yellow-100 text-yellow-800">
                    <Stethoscope className="w-3 h-3" />
                    Rx
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-sm font-medium text-white truncate">
                  {medicine.name}
                </p>
                <p className="text-xs text-gray-200 truncate">
                  {medicine.brand?.name}
                </p>
              </div>
            </div>

            <div className="p-2 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-blue-600">
                  ${medicine.price?.toFixed(2)}
                </span>
                {medicine.category && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded-md truncate">
                    {medicine.category.name}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {medicine.dosages && medicine.dosages.length > 0 && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span className="truncate">{medicine.dosages[0]}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-1.5 mt-1.5">
                <div className="flex -space-x-2">
                  {medicine.ingredients?.slice(0, 3).map((ingredient, idx) => (
                    <div
                      key={idx}
                      className="w-4 h-4 rounded-full bg-blue-100 border border-white flex items-center justify-center"
                      title={ingredient}
                    >
                      <span className="text-[8px] text-blue-600 font-medium">
                        {ingredient.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ))}
                  {medicine.ingredients && medicine.ingredients.length > 3 && (
                    <div className="w-4 h-4 rounded-full bg-gray-100 border border-white flex items-center justify-center">
                      <span className="text-[8px] text-gray-600 font-medium">
                        +{medicine.ingredients.length - 3}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-400">View Details →</span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
} 