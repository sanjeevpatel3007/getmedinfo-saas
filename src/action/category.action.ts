import { supabase } from '@/lib/supabase';
import { Category, Medicine } from '@/lib/types/action.types';

// 1. Fetch all categories
export async function fetchAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data;
}

// 2. Fetch category by ID
export async function fetchCategoryById(id: string): Promise<Category> {
  const { data, error } = await supabase.from('categories').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// 3. Fetch medicines by category ID
export async function fetchMedicinesByCategoryId(categoryId: string): Promise<Medicine[]> {
  const { data, error } = await supabase.from('medicines').select('*').eq('category_id', categoryId);
  if (error) throw error;
  return data;
}

// 4. Create new category
export async function createCategory(name: string): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .insert([{ name }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 5. Update existing category
export async function updateCategory(id: string, name: string): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .update({ name })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 6. Delete category
export async function deleteCategoryById(id: string): Promise<{ message: string }> {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
  return { message: 'Category deleted successfully' };
}
