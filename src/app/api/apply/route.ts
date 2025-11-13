import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, city, format } = body;

    // Telegram Bot Configuration (you'll need to set these)
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn('Telegram bot credentials not configured');
      return NextResponse.json({ success: true, message: 'Заявку прийнято' });
    }

    // Format message for Telegram
    const message = `
🎓 *Нова заявка на навчання в UEBSchool*

👤 **Ім'я:** ${firstName} ${lastName}
📍 **Місто:** ${city}
📚 **Формат:** ${format}
📞 **Телефон:** ${phone}
📧 **Email:** ${email}

⏰ Час подачі: ${new Date().toLocaleString('uk-UA')}
    `.trim();

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      throw new Error('Failed to send to Telegram');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Заявку успішно відправлено!' 
    });

  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Помилка при відправці заявки' 
    }, { status: 500 });
  }
}