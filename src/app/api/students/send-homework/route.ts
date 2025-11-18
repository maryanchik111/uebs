import { NextRequest, NextResponse } from 'next/server';
import { sendBulkEmail } from '@/lib/email';
import { ref, get, update } from 'firebase/database';
import { database } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentEmails, title, description, dueDate, fileUrl, adminKey } = body;

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

    if (!title || !description || !dueDate) {
      return NextResponse.json(
        { error: 'Title, description, and due date are required' },
        { status: 400 }
      );
    }

    const formattedDueDate = new Date(dueDate).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

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
            .homework-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
            .due-date { color: #e53e3e; font-weight: bold; }
            .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; margin-top: 15px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📚 UEBSchool</h1>
              <p>Нове домашнє завдання</p>
            </div>
            <div class="content">
              <div class="homework-card">
                <h2>${title}</h2>
                <p>${description.replace(/\n/g, '<br>')}</p>
                <p><strong>Термін здачі:</strong> <span class="due-date">${formattedDueDate}</span></p>
                ${fileUrl ? `<a href="${fileUrl}" class="button">Переглянути матеріали</a>` : ''}
              </div>
              <p>Виконуйте завдання вчасно та звертайтеся до викладачів, якщо виникнуть питання.</p>
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
      subject: `Домашнє завдання: ${title}`,
      html: emailHtml,
      batchSize: 5,
      delay: 1000
    });

    // Send homework to user accounts with matching emails
    const usersRef = ref(database, 'users');
    const usersSnapshot = await get(usersRef);
    let accountHomework = 0;

    if (usersSnapshot.exists()) {
      const users = usersSnapshot.val();
      const homework = {
        id: Date.now().toString(),
        title,
        description,
        dueDate,
        fileUrl: fileUrl || '',
        completed: false,
        createdAt: new Date().toISOString()
      };

      for (const userId in users) {
        const user = users[userId];
        if (user.email && studentEmails.includes(user.email)) {
          const userHomework = user.homework || [];
          userHomework.push(homework);
          
          await update(ref(database, `users/${userId}`), {
            homework: userHomework
          });
          accountHomework++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      emailResults,
      accountHomework,
      message: `Д/З відправлено: ${emailResults.sent} email(ів), ${accountHomework} акаунт(ів)`
    });

  } catch (error) {
    console.error('Error sending homework:', error);
    return NextResponse.json(
      { error: 'Failed to send homework', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
