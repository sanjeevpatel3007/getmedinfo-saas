import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,#f0f7ff_50%,#e6f0ff_50%)] opacity-50" />
        <div className="absolute right-0 top-0 h-64 w-64 bg-blue-100 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-30" />
        <div className="absolute left-0 bottom-0 h-64 w-64 bg-purple-100 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Your Trusted Source for{' '}
            <span className="relative">
              <span className="relative z-10 text-blue-600">Medical Information</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-blue-100 transform -rotate-1" />
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Access comprehensive, reliable, and up-to-date information about medicines
            for educational purposes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/medicines"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-200"
            >
              Explore Medicines
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-all border-2 border-blue-100 hover:border-blue-200"
            >
              Browse Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 