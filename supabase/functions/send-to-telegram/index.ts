import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface ContactData {
  name: string;
  email: string;
  mobile?: string;
  message: string;
}

serve(async (req: Request) => {
  console.log('🔍 Received request:', req.method);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    console.log('✓ Handling CORS preflight');
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      console.log('❌ Invalid method:', req.method);
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse request body
    console.log('📝 Parsing request body...');
    const contactData: ContactData = await req.json();
    console.log('✓ Parsed data:', { 
      name: contactData.name, 
      email: contactData.email, 
      hasMobile: !!contactData.mobile,
      hasMessage: !!contactData.message
    });

    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      console.log('❌ Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get environment variables
    console.log('🔐 Getting Telegram secrets...');
    const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');

    console.log('Secret check:', {
      botTokenExists: !!TELEGRAM_BOT_TOKEN,
      chatIdExists: !!TELEGRAM_CHAT_ID,
      botTokenLength: TELEGRAM_BOT_TOKEN?.length || 0,
      chatIdValue: TELEGRAM_CHAT_ID
    });

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('❌ Missing Telegram configuration');
      console.error('TELEGRAM_BOT_TOKEN:', TELEGRAM_BOT_TOKEN ? '✓ exists' : '✗ missing');
      console.error('TELEGRAM_CHAT_ID:', TELEGRAM_CHAT_ID ? '✓ exists' : '✗ missing');
      return new Response(
        JSON.stringify({ 
          error: 'Telegram configuration missing',
          details: {
            hasToken: !!TELEGRAM_BOT_TOKEN,
            hasChat: !!TELEGRAM_CHAT_ID
          }
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Format message for Telegram
    console.log('📧 Formatting Telegram message...');
    const telegramMessage = formatTelegramMessage(contactData);
    console.log('✓ Message formatted');

    // Send to Telegram
    console.log('🚀 Sending to Telegram API...');
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }
    );

    const telegramData = await telegramResponse.json();
    console.log('📨 Telegram API response:', { 
      ok: telegramResponse.ok,
      status: telegramResponse.status,
      hasResult: !!telegramData.result
    });

    if (!telegramResponse.ok) {
      console.error('❌ Telegram API error:', telegramData);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send Telegram notification',
          telegramError: telegramData.description || telegramData.error_code
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('✅ Telegram message sent successfully');
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact notification sent to Telegram',
        telegramMessageId: telegramData.result.message_id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ Error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
        errorType: error?.constructor?.name || 'Unknown'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

/**
 * Format contact data into a nicely formatted Telegram message
 */
function formatTelegramMessage(data: ContactData): string {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
  });

  return `
<b>📬 New Contact Form Submission</b>

<b>Name:</b> ${escapeHtml(data.name)}
<b>Email:</b> ${escapeHtml(data.email)}
${data.mobile ? `<b>Mobile:</b> ${escapeHtml(data.mobile)}\n` : ''}
<b>Message:</b>
${escapeHtml(data.message)}

<b>Submitted at:</b> ${timestamp} (IST)
  `.trim();
}

/**
 * Escape HTML special characters for Telegram HTML parsing
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
