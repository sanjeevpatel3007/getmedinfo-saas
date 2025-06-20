import { Pill, Search, BookOpen, Stethoscope } from 'lucide-react';

const features = [
  {
    icon: Pill,
    title: 'Comprehensive Database',
    description: 'Access detailed information about various medicines, their uses, and effects.',
    color: 'blue',
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Find specific medicines quickly with our powerful search and filtering system.',
    color: 'purple',
  },
  {
    icon: BookOpen,
    title: 'Educational Resources',
    description: 'Learn about medicine categories, usage guidelines, and best practices.',
    color: 'green',
  },
  {
    icon: Stethoscope,
    title: 'Professional Information',
    description: 'Get accurate medical information sourced from trusted healthcare providers.',
    color: 'pink',
  },
];

export default function Features() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive suite of features designed to help you learn about medicines safely and effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600',
              purple: 'bg-purple-50 text-purple-600',
              green: 'bg-green-50 text-green-600',
              pink: 'bg-pink-50 text-pink-600',
            }[feature.color];

            return (
              <div
                key={index}
                className="relative group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className={`w-12 h-12 ${colorClasses} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 