/**
 * Send contact notification to Telegram via Supabase Edge Function
 * This keeps the bot token secure on the backend
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - Full name
 * @param {string} contactData.email - Email address
 * @param {string} contactData.mobile - Phone number (optional)
 * @param {string} contactData.message - Message body
 * @returns {Promise<Object>} - Response from the edge function
 */
export const sendToTelegram = async (contactData) => {
  try {
    // Get the Supabase URL and Anon Key from environment
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration not found');
    }

    // Call the Supabase Edge Function with authorization
    const response = await fetch(
      `${supabaseUrl}/functions/v1/teleaira`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify(contactData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.warn('Telegram notification failed:', data);
      // Don't throw error - Telegram is optional
      return {
        success: false,
        message: 'Telegram notification could not be sent',
        error: data.error,
      };
    }

    console.log('Telegram notification sent successfully:', data);
    return {
      success: true,
      message: 'Telegram notification sent',
      data: data,
    };
  } catch (error) {
    console.warn('Error sending to Telegram:', error.message);
    // Don't throw - Telegram is optional, form submission should still succeed
    return {
      success: false,
      message: error.message || 'Failed to send Telegram notification',
      error: error,
    };
  }
};
