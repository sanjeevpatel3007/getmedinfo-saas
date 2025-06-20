import { Pill, Search, BookOpen, Stethoscope } from 'lucide-react';

const features = [
  {
    icon: Pill,
    title: 'Comprehensive Database',
    description: 'Explore in-depth medicine details including ingredients, usage, side effects, and more.',
    color: 'from-blue-100 to-blue-200 text-blue-700',
  },
  {
    icon: Search,
    title: 'Smart Search System',
    description: 'Easily find any medicine or brand using our intelligent search and filter tools.',
    color: 'from-purple-100 to-purple-200 text-purple-700',
  },
  {
    icon: BookOpen,
    title: 'Educational Insights',
    description: 'Understand drug categories, proper usage, health tips, and safety guidelines.',
    color: 'from-green-100 to-green-200 text-green-700',
  },
  {
    icon: Stethoscope,
    title: 'AI Symptom Checker',
    description: 'Chat with our AI bot to get symptom-based suggestions and medicine recommendations.',
    color: 'from-pink-100 to-pink-200 text-pink-700',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover AI-powered healthcare tools and expert knowledge to help you make informed medical decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
