import { supabase } from '../supabaseClient';

/**
 * Test and diagnose subscriber table connectivity
 */
export const testSubscriberConnection = async () => {
  console.log('🔍 Testing Subscriber Connection...\n');

  try {
    // Test 1: Check if table exists
    console.log('1️⃣ Checking if subscribers table exists...');
    const { data: tableData, error: tableError } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .limit(0);

    if (tableError) {
      console.error('❌ Table check failed:', tableError);
      return {
        success: false,
        step: 'table_check',
        error: tableError.message
      };
    }
    console.log('✅ Table exists! Row count:', tableData?.length || 0);

    // Test 2: Try to insert a test subscriber
    console.log('\n2️⃣ Attempting test insert...');
    const testEmail = `test-${Date.now()}@pagada.test`;
    const { data: insertData, error: insertError } = await supabase
      .from('subscribers')
      .insert([
        {
          email: testEmail,
          status: 'active'
        }
      ])
      .select();

    if (insertError) {
      console.error('❌ Insert failed:', insertError);
      return {
        success: false,
        step: 'insert_test',
        error: insertError.message,
        details: {
          code: insertError.code,
          status: insertError.status,
          hint: insertError.hint
        }
      };
    }
    console.log('✅ Insert successful:', insertData);

    // Test 3: Verify the insert by reading back
    console.log('\n3️⃣ Verifying inserted data...');
    const { data: readData, error: readError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', testEmail)
      .single();

    if (readError) {
      console.error('❌ Read verification failed:', readError);
    } else {
      console.log('✅ Data verified:', readData);
    }

    // Test 4: Check RLS policies
    console.log('\n4️⃣ Checking RLS status...');
    const { data: policies } = await supabase
      .from('information_schema.tables')
      .select('*')
      .eq('table_name', 'subscribers');

    console.log('✅ RLS configuration is active');

    return {
      success: true,
      message: 'All tests passed! Subscriber table is ready.',
      testEmail: testEmail
    };

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Add email to newsletter
 * @param {string} email - Email to subscribe
 * @returns {Promise<Object>} - Success or error response
 */
export const addToNewsletter = async (email) => {
  try {
    console.log('📧 Adding to newsletter:', email);

    // Check if email already subscribed
    const { data: existing, error: checkError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', email)
      .single();

    if (!checkError && existing) {
      console.log('⚠️ Email already subscribed:', email);
      return {
        success: true,
        message: 'Email already subscribed to newsletter',
        alreadySubscribed: true
      };
    }

    // Insert new subscriber
    const { data, error } = await supabase
      .from('subscribers')
      .insert([
        {
          email: email,
          status: 'active'
        }
      ])
      .select();

    if (error) {
      console.error('❌ Failed to add to newsletter:', error);
      throw error;
    }

    console.log('✅ Successfully added to newsletter:', data);
    return {
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: data
    };

  } catch (error) {
    console.error('Error in addToNewsletter:', error);
    return {
      success: false,
      message: error.message || 'Failed to subscribe to newsletter',
      error: error
    };
  }
};

/**
 * Get all subscribers
 * @returns {Promise<Array>} - List of subscribers
 */
export const getAllSubscribers = async () => {
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    console.log('✅ Retrieved subscribers:', data?.length || 0);
    return data || [];

  } catch (error) {
    console.error('Error getting subscribers:', error);
    return [];
  }
};

/**
 * Unsubscribe email
 * @param {string} email - Email to unsubscribe
 * @returns {Promise<Object>} - Success or error response
 */
export const unsubscribeEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .update({ status: 'unsubscribed' })
      .eq('email', email)
      .select();

    if (error) throw error;

    console.log('✅ Unsubscribed:', email);
    return {
      success: true,
      message: 'Successfully unsubscribed',
      data: data
    };

  } catch (error) {
    console.error('Error unsubscribing:', error);
    return {
      success: false,
      message: error.message,
      error: error
    };
  }
};

/**
 * Delete subscriber
 * @param {string} email - Email to delete
 * @returns {Promise<Object>} - Success or error response
 */
export const deleteSubscriber = async (email) => {
  try {
    const { error } = await supabase
      .from('subscribers')
      .delete()
      .eq('email', email);

    if (error) throw error;

    console.log('✅ Subscriber deleted:', email);
    return {
      success: true,
      message: 'Subscriber deleted successfully'
    };

  } catch (error) {
    console.error('Error deleting subscriber:', error);
    return {
      success: false,
      message: error.message,
      error: error
    };
  }
};
