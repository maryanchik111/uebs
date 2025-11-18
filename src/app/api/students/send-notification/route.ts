import { NextRequest, NextResponse } from 'next/server';
import { sendBulkEmail } from '@/lib/email';
import { ref, get, update } from 'firebase/database';
import { database } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentEmails, title, message, type, adminKey } = body;

    // Simple admin authentication
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid admin key.' },
        { status: 401 }
      );
    }

    if (!studentEmails || !Array.isArray(studentEmails) || studentEmails.length === 0) {
      return NextResponse.json(
        { error: 'Student emails are required' },
        { status: 400 }
      );
    }

    if (!title || !message) {
      return NextResponse.json(
        { error: 'Title and message are required' },
        { status: 400 }
      );
    }

    // Prepare email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>UEBSchool</h1>
            </div>
            <div class="content">
              <h2>${title}</h2>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="footer">
              <p>© 2025 UEBSchool. Всі права захищені.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send emails
    const emailResults = await sendBulkEmail({
      emails: studentEmails,
      subject: title,
      html: emailHtml,
      batchSize: 5,
      delay: 1000
    });

    // Send notifications to user accounts with matching emails
    const usersRef = ref(database, 'users');
    const usersSnapshot = await get(usersRef);
    let accountNotifications = 0;

    if (usersSnapshot.exists()) {
      const users = usersSnapshot.val();
      const notification = {
        id: Date.now().toString(),
        title,
        message,
        type: type || 'info',
        read: false,
        createdAt: new Date().toISOString()
      };

      for (const userId in users) {
        const user = users[userId];
        if (user.email && studentEmails.includes(user.email)) {
          const userNotifications = user.notifications || [];
          userNotifications.push(notification);
          
          await update(ref(database, `users/${userId}`), {
            notifications: userNotifications
          });
          accountNotifications++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      emailResults,
      accountNotifications,
      message: `Повідомлення відправлено: ${emailResults.sent} email(ів), ${accountNotifications} акаунт(ів)`
    });

  } catch (error) {
    console.error('Error sending notifications:', error);
    return NextResponse.json(
      { error: 'Failed to send notifications', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
