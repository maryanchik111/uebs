import { NextRequest, NextResponse } from 'next/server';
import { sendBulkEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { emails, subject, html, text, batchSize, delay, adminKey } = body;

    // Simple admin authentication
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid admin key.' },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: 'Emails array is required and must not be empty' },
        { status: 400 }
      );
    }

    if (!subject || !html) {
      return NextResponse.json(
        { error: 'Subject and HTML content are required' },
        { status: 400 }
      );
    }

    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      return NextResponse.json(
        { error: 'SMTP configuration is missing. Please configure email settings.' },
        { status: 500 }
      );
    }

    console.log(`Starting bulk email send to ${emails.length} recipients`);

    // Send bulk emails
    const results = await sendBulkEmail({
      emails,
      subject,
      html,
      text,
      batchSize: batchSize || 10,
      delay: delay || 1000
    });

    return NextResponse.json({
      success: true,
      message: `Bulk email completed: ${results.sent} sent, ${results.failed} failed`,
      results
    });

  } catch (error) {
    console.error('Error in bulk email send:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}