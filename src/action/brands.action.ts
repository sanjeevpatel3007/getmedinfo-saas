import { supabase } from '@/lib/supabase';
import { Brand, Medicine } from '@/lib/types/action.types';

// 1. Fetch all brands
export async function fetchAllBrands(): Promise<Brand[]> {
  const { data, error } = await supabase.from('brands').select('*');
  if (error) throw error;
  return data;
}

// 2. Fetch brand by ID
export async function fetchBrandById(id: string): Promise<Brand> {
  const { data, error } = await supabase.from('brands').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// 3. Fetch medicines by brand ID
export async function fetchMedicinesByBrandId(brandId: string): Promise<Medicine[]> {
  const { data, error } = await supabase.from('medicines').select('*').eq('brand_id', brandId);
  if (error) throw error;
  return data;
}

// 4. Create a new brand
export async function createBrand(name: string, country?: string): Promise<Brand> {
  const { data, error } = await supabase
    .from('brands')
    .insert([{ name, country }])
    .select()
    .single(); // To return the inserted row directly

  if (error) throw error;
  return data;
}

// 5. Delete a brand by ID
export async function deleteBrandById(id: string): Promise<{ message: string }> {
  const { error } = await supabase.from('brands').delete().eq('id', id);
  if (error) throw error;
  return { message: 'Brand deleted successfully' };
}
