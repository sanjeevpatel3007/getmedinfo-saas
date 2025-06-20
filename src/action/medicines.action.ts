// medicines.action.ts
import { supabase } from '@/lib/supabase';
import { Medicine } from '@/lib/types/action.types';

// Basic fetch operations
export async function fetchAllMedicines(): Promise<Medicine[]> {
  const { data, error } = await supabase.from('medicines').select('*');
  if (error) throw error;
  return data;
}

export async function fetchMedicineById(id: string): Promise<Medicine> {
  const { data, error } = await supabase.from('medicines').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function fetchMedicineImagesById(id: string): Promise<string[]> {
  const { data, error } = await supabase.from('medicines').select('images').eq('id', id).single();
  if (error) throw error;
  return data?.images || [];
}

// Search & filters
export async function fetchMedicinesBySearch(query: string): Promise<Medicine[]> {
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .ilike('name', `%${query}%`);
  if (error) throw error;
  return data;
}

export async function fetchMedicinesByFilters(filters: {
  brandId?: string;
  categoryId?: string;
  priceRange?: [number, number];
}): Promise<Medicine[]> {
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

// Conditional / grouped fetches
export async function fetchMedicinesWithPrescriptionsRequired(): Promise<Medicine[]> {
  const { data, error } = await supabase.from('medicines').select('*').eq('prescription_required', true);
  if (error) throw error;
  return data;
}

export async function fetchMedicinesWithoutPrescription(): Promise<Medicine[]> {
  const { data, error } = await supabase.from('medicines').select('*').eq('prescription_required', false);
  if (error) throw error;
  return data;
}

export async function fetchMedicinesWithAlternatives(): Promise<Medicine[]> {
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .not('alternatives', 'is', null);
  if (error) throw error;
  return data;
}

export async function fetchMedicinesByIngredient(ingredient: string): Promise<Medicine[]> {
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .contains('ingredients', [ingredient]);
  if (error) throw error;
  return data;
}

export async function fetchMedicinesBySideEffect(sideEffect: string): Promise<Medicine[]> {
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .contains('side_effects', [sideEffect]);
  if (error) throw error;
  return data;
}

export async function fetchMedicinesByDosage(dosage: string): Promise<Medicine[]> {
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .contains('dosages', [dosage]);
  if (error) throw error;
  return data;
}

export async function fetchMedicinesByWarning(warning: string): Promise<Medicine[]> {
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .contains('warnings', [warning]);
  if (error) throw error;
  return data;
}

// Similar & related data fetch
export async function fetchSimilarMedicines(medicineId: string): Promise<Medicine[]> {
  try {
    const medicine = await fetchMedicineById(medicineId);
    const altIds = medicine?.alternatives || [];
    if (!altIds.length) return [];

    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .in('id', altIds);

    if (error) {
      console.error('Error fetching similar medicines:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchSimilarMedicines:', error);
    return [];
  }
}

// Advanced fetch with joins
export async function fetchMedicineWithBrandAndCategory(id: string): Promise<Medicine | null> {
  try {
    const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (!isValidUUID) {
      console.error('Invalid UUID format:', id);
      return null;
    }

    const { data, error } = await supabase
      .from('medicines')
      .select(`
        *,
        brand:brands (
          id, name, country
        ),
        category:categories (
          id, name, description
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in fetchMedicineWithBrandAndCategory:', error);
    return null;
  }
}

export async function fetchAllMedicinesWithBrandAndCategory(): Promise<any[]> {
  const { data, error } = await supabase
    .from('medicines')
    .select('*, brand:brands(*), category:categories(*)');
  if (error) throw error;
  return data;
}

// Time-based fetch
export async function fetchNewlyAddedMedicines(limit = 10): Promise<Medicine[]> {
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function fetchRecentlyUpdatedMedicines(limit = 10): Promise<Medicine[]> {
  const { data, error } = await supabase
    .from('medicines')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function fetchMedicineBySlug(slug: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from('medicines')
      .select(`
        *,
        brand:brands (
          id, name, country
        ),
        category:categories (
          id, name, description
        )
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in fetchMedicineBySlug:', error);
    return null;
  }
}

// Fetch medicines by category ID
export async function fetchMedicinesByCategoryId(categoryId: string): Promise<Medicine[]> {
  const { data, error } = await supabase
    .from('medicines')
    .select(`
      *,
      brand:brands(*),
      category:categories(*)
    `)
    .eq('category_id', categoryId);

  if (error) throw error;
  return data;
}

export async function fetchMedicinesByBrandId(brandId: string): Promise<Medicine[]> {
  const { data, error } = await supabase
    .from('medicines')
    .select(`
      *,
      brand:brands (
        id, name, country
      ),
      category:categories (
        id, name, description
      )
    `)
    .eq('brand_id', brandId)
    .limit(5);
  
  if (error) {
    console.error('Error fetching medicines by brand:', error);
    return [];
  }
  
  return data || [];
}
