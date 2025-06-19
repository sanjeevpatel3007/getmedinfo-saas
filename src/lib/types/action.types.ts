// 📁 action.types.ts

export interface Brand {
    id: string;
    name: string;
    country?: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    description?: string;
  }
  
  export interface Medicine {
    id: string;
    slug: string;
    name: string;
    description?: string;
    price?: number;
    prescription_required?: boolean;
    category_id?: string;
    brand_id?: string;
    dosages?: string[];
    ingredients?: string[];
    side_effects?: string[];
    usage_instructions?: string[];
    warnings?: string[];
    alternatives?: string[];
    images?: string[];
    created_at?: string;
    updated_at?: string;
    brand?: Brand;
    category?: Category;
  }
  