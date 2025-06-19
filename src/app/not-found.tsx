import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <FileQuestion className="h-24 w-24 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been removed,
          renamed, or doesn't exist.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </Link>
          <div className="mt-4">
            <Link
              href="/medicines"
              className="inline-block text-blue-600 hover:text-blue-800 transition-colors"
            >
              Browse Medicines
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 