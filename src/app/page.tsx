import { fetchAllCategories } from '@/action/category.action';
import { fetchAllMedicinesWithBrandAndCategory } from '@/action/medicines.action';
import { fetchAllBrands } from '@/action/brands.action';

import Hero from '@/components/home/hero';
import Features from '@/components/home/features';
import Categories from '@/components/home/categories';
import FeaturedMedicines from '@/components/home/featured-medicines';
import Brands from '@/components/home/brands';

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
      <Hero />
      <Features />
      <Categories categories={featuredCategories} />
      <FeaturedMedicines medicines={featuredMedicines} />
      <Brands brands={featuredBrands} />
    </div>
  );
}
