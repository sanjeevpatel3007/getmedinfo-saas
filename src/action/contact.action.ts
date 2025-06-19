import { supabase } from '@/lib/supabase';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const { error } = await supabase
      .from('contact_us')
      .insert([data]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
} 