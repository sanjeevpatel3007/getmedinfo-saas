import { Shield, Users, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full py-20 bg-gradient-to-b from-white to-blue-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-blue-600">GetMedInfo</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering you with trusted, AI-enhanced medical information for confident and informed healthcare choices.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-3xl shadow-md p-8 mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At GetMedInfo, we aim to make health literacy simple and accessible for everyone. We offer detailed and up-to-date information on a wide range of medicines, enhanced by smart AI tools for learning, searching, and asking questions — all in real time.
          </p>
          <p className="text-gray-600">
            Our mission is to bridge the gap between complex medical data and public understanding by delivering educational, safe, and transparent healthcare guidance through technology.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Shield,
              title: 'Reliability',
              desc: 'All content is carefully verified and sourced from trusted medical databases and professionals.',
              color: 'from-blue-100 to-blue-200 text-blue-700',
            },
            {
              icon: Users,
              title: 'Accessibility',
              desc: 'Designed for all users, no matter your background or knowledge level—clean, simple, and clear.',
              color: 'from-purple-100 to-purple-200 text-purple-700',
            },
            {
              icon: BookOpen,
              title: 'Education',
              desc: 'We simplify complex medical knowledge with AI-powered tools, easy-to-read data, and helpful chat features.',
              color: 'from-green-100 to-green-200 text-green-700',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-all">
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-5`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-100 border border-gray-200 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
          <p className="text-gray-600 mb-4">
            GetMedInfo is intended for educational and informational use only. It is not a replacement for professional medical advice, diagnosis, or treatment.
          </p>
          <p className="text-gray-600">
            Always consult with a licensed healthcare provider regarding any medical concerns or before starting new medication.
          </p>
        </div>
      </section>
    </div>
  );
}
