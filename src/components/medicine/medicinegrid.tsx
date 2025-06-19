'use client';

import { Medicine } from '@/lib/types/action.types';
import Link from 'next/link';
import Image from 'next/image';
import { Pill, Tag, Box, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface MedicineGridProps {
  medicines: Medicine[];
}

export default function MedicineGrid({ medicines }: MedicineGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {medicines.map((medicine, index) => (
        <motion.div
          key={medicine.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link
            href={`/medicines/${medicine.slug}`}
            className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="aspect-[4/3] relative bg-gray-100 overflow-hidden">
              {medicine.images && medicine.images[0] ? (
                <Image
                  // src={medicine.images[0]}
                  src='/medicine-placeholder.png'
                  // alt={medicine.name}
                  alt='medicine-placeholder'
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-50">
                  <Pill className="w-16 h-16 text-blue-300" />
                </div>
              )}
              {medicine.prescription_required && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <AlertCircle className="w-3 h-3" />
                    Prescription
                  </span>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {medicine.name}
              </h3>

              <div className="space-y-2">
                {medicine.brand && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Tag className="w-4 h-4" />
                    <span>{medicine.brand.name}</span>
                  </div>
                )}
                {medicine.category && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Box className="w-4 h-4" />
                    <span>{medicine.category.name}</span>
                  </div>
                )}
              </div>

              {medicine.price && (
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    ${medicine.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">View Details →</span>
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
} 