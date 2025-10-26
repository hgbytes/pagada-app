import { supabase } from '../supabaseClient';
import { sendToTelegram } from './sendToTelegram';

/**
 * Submit contact form data to Supabase and send notification to Telegram
 * @param {Object} formData - The form data to submit
 * @returns {Promise<Object>} - Response with success status and message
 */
export const submitContactForm = async (formData) => {
  try {
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error('Missing required fields: name, email, and message');
    }

    // Insert data into the 'contacts' table
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile || null,
          message: formData.message,
          // Let the database handle created_at with proper timezone
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message || 'Failed to submit form');
    }

    console.log('Form submitted successfully:', data);

    // Send notification to Telegram (non-blocking, optional)
    // This doesn't affect the form submission success
    sendToTelegram(formData).catch((err) => {
      console.warn('Failed to send Telegram notification:', err);
    });

    return {
      success: true,
      message: 'Thank you for reaching out! We will get back to you soon.',
      data: data,
    };
  } catch (error) {
    console.error('Error submitting contact form:', error.message);
    return {
      success: false,
      message: error.message || 'An error occurred while submitting the form. Please try again.',
      error: error,
    };
  }
};
