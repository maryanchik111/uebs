import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send to Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramMessage = `📧 *Нова підписка на розсилку*\n\n` +
        `Email: ${email}\n` +
        `Час: ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' })}`;

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
            parse_mode: 'Markdown',
          }),
        }
      );

      if (!telegramResponse.ok) {
        console.error('Failed to send to Telegram');
      }
    }

    // Send confirmation email to subscriber
    if (process.env.SMTP_USER) {
      const confirmationTemplate = emailTemplates.newsletterConfirmation(email);
      
      await sendEmail({
        to: email,
        subject: confirmationTemplate.subject,
        html: confirmationTemplate.html,
      });
    }

    // Send notification email to admin
    if (process.env.ADMIN_EMAIL && process.env.SMTP_USER) {
      const adminTemplate = emailTemplates.adminNotification('newsletter', { email });
      
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: adminTemplate.subject,
        html: adminTemplate.html,
      });
    }

    return NextResponse.json(
      { message: 'Newsletter subscription successful' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}