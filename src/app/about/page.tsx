import { Shield, Users, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full py-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About GetMedInfo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering individuals with reliable medical information for educational purposes.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At GetMedInfo, we believe that access to accurate medical information is crucial
            for making informed decisions about health and wellness. Our mission is to provide
            comprehensive, reliable, and easy-to-understand information about medicines and
            their uses for educational purposes.
          </p>
          <p className="text-gray-600">
            We strive to bridge the gap between complex medical knowledge and public
            understanding, making it accessible to everyone who seeks to learn more about
            medications and their effects.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Reliability
            </h3>
            <p className="text-gray-600">
              We ensure all information is verified and up-to-date, sourced from
              trusted medical resources.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Accessibility
            </h3>
            <p className="text-gray-600">
              Making medical information understandable and accessible to everyone,
              regardless of their background.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Education
            </h3>
            <p className="text-gray-600">
              Providing comprehensive educational resources to help users better
              understand medications and their effects.
            </p>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Disclaimer</h2>
          <p className="text-gray-600 mb-4">
            The information provided on GetMedInfo is for educational purposes only and
            should not be used as a substitute for professional medical advice, diagnosis,
            or treatment.
          </p>
          <p className="text-gray-600">
            Always seek the advice of your physician or other qualified health provider
            with any questions you may have regarding a medical condition or medication.
          </p>
        </div>
      </section>
    </div>
  );
} 