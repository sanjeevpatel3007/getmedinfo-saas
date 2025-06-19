import { fetchMedicineBySlug } from "@/action/medicines.action";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Clock, Pill, ShieldAlert, Stethoscope, ChevronRight } from "lucide-react";

export default async function MedicinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const medicine = await fetchMedicineBySlug(slug);

  if (!medicine) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button and Navigation */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/medicines"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Medicines</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ChevronRight className="w-4 h-4" />
              <span>{medicine.category?.name}</span>
              <ChevronRight className="w-4 h-4" />
              <span>{medicine.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-gray-100">
                {medicine.images && medicine.images.length > 0 ? (
                  <Image
                    // src={medicine.images[0]}
                    src='/medicine-placeholder.png'
                    alt={medicine.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Pill className="w-20 h-20 text-gray-300" />
                  </div>
                )}
                {medicine.prescription_required && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-800">
                      <Stethoscope className="w-4 h-4" />
                      Prescription Required
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Medicine Details Section */}
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{medicine.name}</h1>
                <p className="text-gray-600 leading-relaxed">{medicine.description}</p>
                
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  {medicine.brand && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm">
                      {medicine.brand.name}
                    </div>
                  )}
                  {medicine.category && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-sm">
                      {medicine.category.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b">
                <span className="text-lg font-medium text-gray-900">Price</span>
                <span className="text-2xl font-bold text-blue-600">${medicine.price}</span>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="border-t bg-gray-50">
            <div className="p-6 lg:p-8 space-y-8">
              {medicine.dosages && medicine.dosages.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <Clock className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Dosage Information</h3>
                  </div>
                  <ul className="space-y-2">
                    {medicine.dosages.map((dosage: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <span className="select-none">•</span>
                        {dosage}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {medicine.ingredients && medicine.ingredients.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-green-600 mb-4">
                    <Pill className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Ingredients</h3>
                  </div>
                  <ul className="space-y-2">
                    {medicine.ingredients.map((ingredient: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <span className="select-none">•</span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {medicine.side_effects && medicine.side_effects.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-orange-600 mb-4">
                    <AlertTriangle className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Side Effects</h3>
                  </div>
                  <ul className="space-y-2">
                    {medicine.side_effects.map((effect: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <span className="select-none">•</span>
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {medicine.usage_instructions && medicine.usage_instructions.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-purple-600 mb-4">
                    <Clock className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Usage Instructions</h3>
                  </div>
                  <ul className="space-y-2">
                    {medicine.usage_instructions.map((instruction: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <span className="select-none">•</span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {medicine.warnings && medicine.warnings.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-red-100">
                  <div className="flex items-center gap-2 text-red-600 mb-4">
                    <ShieldAlert className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Important Warnings</h3>
                  </div>
                  <ul className="space-y-2">
                    {medicine.warnings.map((warning: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-red-600">
                        <span className="select-none">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}