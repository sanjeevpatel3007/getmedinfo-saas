import Link from 'next/link';
import { ArrowRight, Pill, Search, BookOpen, ChevronRight, Building2, Grid } from 'lucide-react';
import { fetchAllCategories } from '@/action/category.action';
import { fetchAllMedicinesWithBrandAndCategory } from '@/action/medicines.action';
import { fetchAllBrands } from '@/action/brands.action';
import Image from 'next/image';

export default async function Home() {
  // Fetch initial data
  const [categories, medicines, brands] = await Promise.all([
    fetchAllCategories(),
    fetchAllMedicinesWithBrandAndCategory(),
    fetchAllBrands(),
  ]);

  // Take only the first 6 items for each section
  const featuredCategories = categories.slice(0, 6);
  const featuredMedicines = medicines.slice(0, 6);
  const featuredBrands = brands.slice(0, 6);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Trusted Source for{' '}
              <span className="text-blue-600">Medical Information</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Access comprehensive, reliable, and up-to-date information about medicines
              for educational purposes.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/medicines"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Explore Medicines
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Pill className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Comprehensive Database
              </h3>
              <p className="text-gray-600">
                Access detailed information about various medicines, their uses, and effects.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Search
              </h3>
              <p className="text-gray-600">
                Find specific medicines quickly with our powerful search functionality.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Educational Resources
              </h3>
              <p className="text-gray-600">
                Learn about medicine categories, usage guidelines, and best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
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
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All Categories
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories#${category.id}`}
                className="group block bg-gray-50 p-6 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white group-hover:bg-blue-100 transition-colors">
                    <Grid className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Medicines Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Medicines
              </h2>
              <p className="text-gray-600">Explore our collection of medicines</p>
            </div>
            <Link
              href="/medicines"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All Medicines
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMedicines.map((medicine) => (
              <Link
                key={medicine.id}
                href={`/medicines/${medicine.slug}`}
                className="group block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
              >
                <div className="aspect-[4/3] relative bg-gray-100">
                  <Image
                    src="/medicine-placeholder.png"
                    alt={medicine.name}
                    fill
                    className="object-cover"
                  />
                  {medicine.prescription_required && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                        Prescription Required
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {medicine.name}
                  </h3>
                  {medicine.brand && (
                    <p className="text-sm text-gray-500">{medicine.brand.name}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-white">
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
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All Brands
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.id}`}
                className="group flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <div className="p-3 rounded-lg bg-white group-hover:bg-blue-100 transition-colors mb-3">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 text-center group-hover:text-blue-600 transition-colors">
                  {brand.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Learn More?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore our extensive database of medical information and start learning today.
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-blue-600 hover:bg-gray-100 transition-colors"
          >
            Browse Categories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
