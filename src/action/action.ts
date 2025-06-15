// 📁 brands.action.ts
import { supabase } from '@/lib/supabase';

export async function fetchAllBrands() {
  const { data, error } = await supabase.from('brands').select('*');
  if (error) throw error;
  return data;
}

export async function fetchBrandById(id) {
  const { data, error } = await supabase.from('brands').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function fetchMedicinesByBrandId(brandId) {
  const { data, error } = await supabase.from('medicines').select('*').eq('brand_id', brandId);
  if (error) throw error;
  return data;
}


// 📁 category.action.ts
import { supabase } from '@/lib/supabase';

export async function fetchAllCategories() {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data;
}

export async function fetchCategoryById(id) {
  const { data, error } = await supabase.from('categories').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function fetchMedicinesByCategoryId(categoryId) {
  const { data, error } = await supabase.from('medicines').select('*').eq('category_id', categoryId);
  if (error) throw error;
  return data;
}


// 📁 medicines.action.ts
import { supabase } from '@/lib/supabase';

export async function fetchAllMedicines() {
  const { data, error } = await supabase.from('medicines').select('*');
  if (error) throw error;
  return data;
}

export async function fetchMedicineById(id) {
  const { data, error } = await supabase.from('medicines').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function fetchMedicinesBySearch(query) {
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .ilike('name', `%${query}%`);
  if (error) throw error;
  return data;
}

export async function fetchMedicinesByFilters(filters) {
  let query = supabase.from('medicines').select('*');
  if (filters.brandId) query = query.eq('brand_id', filters.brandId);
  if (filters.categoryId) query = query.eq('category_id', filters.categoryId);
  if (filters.priceRange) {
    query = query.gte('price', filters.priceRange[0]).lte('price', filters.priceRange[1]);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function fetchSimilarMedicines(medicineId) {
  const medicine = await fetchMedicineById(medicineId);
  const altIds = medicine.alternatives || [];
  const { data, error } = await supabase.from('medicines').select('*').in('id', altIds);
  if (error) throw error;
  return data;
}

export async function fetchMedicinesWithPrescriptionsRequired() {
  const { data, error } = await supabase.from('medicines').select('*').eq('prescription_required', true);
  if (error) throw error;
  return data;
}

export async function fetchMedicinesWithoutPrescription() {
  const { data, error } = await supabase.from('medicines').select('*').eq('prescription_required', false);
  if (error) throw error;
  return data;
}

export async function fetchMedicineImagesById(id) {
  const { data, error } = await supabase.from('medicines').select('images').eq('id', id).single();
  if (error) throw error;
  return data?.images || [];
}

export async function fetchNewlyAddedMedicines(limit = 10) {
  const { data, error } = await supabase.from('medicines').select('*').order('created_at', { ascending: false }).limit(limit);
  if (error) throw error;
  return data;
}

export async function fetchRecentlyUpdatedMedicines(limit = 10) {
  const { data, error } = await supabase.from('medicines').select('*').order('updated_at', { ascending: false }).limit(limit);
  if (error) throw error;
  return data;
}

export async function fetchMedicinesByIngredient(ingredient) {
  const { data, error } = await supabase.from('medicines').select('*').contains('ingredients', [ingredient]);
  if (error) throw error;
  return data;
}

export async function fetchMedicinesBySideEffect(sideEffect) {
  const { data, error } = await supabase.from('medicines').select('*').contains('side_effects', [sideEffect]);
  if (error) throw error;
  return data;
}

export async function fetchMedicineWithBrandAndCategory(id) {
  const { data, error } = await supabase
    .from('medicines')
    .select('*, brand:brands(*), category:categories(*)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function fetchAllMedicinesWithBrandAndCategory() {
  const { data, error } = await supabase
    .from('medicines')
    .select('*, brand:brands(*), category:categories(*)');
  if (error) throw error;
  return data;
}
