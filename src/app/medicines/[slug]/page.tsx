import { fetchMedicineBySlug, fetchMedicinesByBrandId } from "@/action/medicines.action";
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

  // Fetch related medicines from the same brand
  const relatedMedicines = medicine.brand?.id 
    ? await fetchMedicinesByBrandId(medicine.brand.id)
    : [];

  // Filter out the current medicine and limit to 4 related medicines
  const filteredRelatedMedicines = relatedMedicines
    .filter(m => m.id !== medicine.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button and Navigation */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-4">
            <Link
              href="/medicines"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Medicines</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ChevronRight className="w-3 h-3" />
              <span>{medicine.category?.name}</span>
              <ChevronRight className="w-3 h-3" />
              <span>{medicine.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Images Section */}
            <div>
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-100">
                {medicine.images && medicine.images.length > 0 ? (
                  <Image
                    src={medicine.images[0]}
                    alt={medicine.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Pill className="w-16 h-16 text-gray-300" />
                  </div>
                )}
                {medicine.prescription_required && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Stethoscope className="w-3 h-3" />
                      Prescription Required
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Medicine Details Section */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{medicine.name}</h1>
                <p className="text-sm text-gray-600 leading-relaxed">{medicine.description}</p>
                
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {medicine.brand && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs">
                      {medicine.brand.name}
                    </div>
                  )}
                  {medicine.category && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-purple-50 text-purple-700 text-xs">
                      {medicine.category.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-b">
                <span className="text-base font-medium text-gray-900">Price</span>
                <span className="text-xl font-bold text-blue-600">${medicine.price}</span>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                {medicine.dosages && medicine.dosages.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Clock className="w-4 h-4" />
                      <h3 className="text-sm font-semibold">Dosage</h3>
                    </div>
                    <ul className="space-y-1">
                      {medicine.dosages.slice(0, 2).map((dosage: string, index: number) => (
                        <li key={index} className="text-xs text-gray-600">• {dosage}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {medicine.ingredients && medicine.ingredients.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                      <Pill className="w-4 h-4" />
                      <h3 className="text-sm font-semibold">Key Ingredients</h3>
                    </div>
                    <ul className="space-y-1">
                      {medicine.ingredients.slice(0, 2).map((ingredient: string, index: number) => (
                        <li key={index} className="text-xs text-gray-600">• {ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div className="border-t bg-gray-50">
            <div className="p-6 space-y-4">
              {medicine.side_effects && medicine.side_effects.length > 0 && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-orange-600 mb-3">
                    <AlertTriangle className="w-4 h-4" />
                    <h3 className="text-sm font-semibold">Side Effects</h3>
                  </div>
                  <ul className="grid grid-cols-2 gap-2">
                    {medicine.side_effects.map((effect: string, index: number) => (
                      <li key={index} className="text-xs text-gray-600">• {effect}</li>
                    ))}
                  </ul>
                </div>
              )}

              {medicine.warnings && medicine.warnings.length > 0 && (
                <div className="bg-white rounded-lg p-4 shadow-sm border border-red-100">
                  <div className="flex items-center gap-2 text-red-600 mb-3">
                    <ShieldAlert className="w-4 h-4" />
                    <h3 className="text-sm font-semibold">Important Warnings</h3>
                  </div>
                  <ul className="grid grid-cols-2 gap-2">
                    {medicine.warnings.map((warning: string, index: number) => (
                      <li key={index} className="text-xs text-red-600">• {warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Related Medicines */}
          {filteredRelatedMedicines.length > 0 && (
            <div className="border-t">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">More from {medicine.brand?.name}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {filteredRelatedMedicines.map((relatedMedicine) => (
                    <Link
                      key={relatedMedicine.id}
                      href={`/medicines/${relatedMedicine.slug}`}
                      className="group"
                    >
                      <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 mb-2">
                        {relatedMedicine.images && relatedMedicine.images.length > 0 ? (
                          <Image
                            src={relatedMedicine.images[0]}
                            alt={relatedMedicine.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Pill className="w-8 h-8 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                        {relatedMedicine.name}
                      </h4>
                      <p className="text-xs text-gray-500">${relatedMedicine.price}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}