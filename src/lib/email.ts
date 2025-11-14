import nodemailer from 'nodemailer';

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"UEBSchool" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

interface BulkEmailOptions {
  emails: string[];
  subject: string;
  html: string;
  text?: string;
  batchSize?: number;
  delay?: number; // delay between batches in ms
}

export async function sendBulkEmail({ 
  emails, 
  subject, 
  html, 
  text, 
  batchSize = 10, 
  delay = 1000 
}: BulkEmailOptions) {
  const results = {
    total: emails.length,
    sent: 0,
    failed: 0,
    errors: [] as string[]
  };

  // Validate emails
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmails = emails.filter(email => {
    const isValid = emailRegex.test(email.trim());
    if (!isValid) {
      results.failed++;
      results.errors.push(`Invalid email format: ${email}`);
    }
    return isValid;
  });

  console.log(`Starting bulk email send to ${validEmails.length} recipients`);

  // Send emails in batches
  for (let i = 0; i < validEmails.length; i += batchSize) {
    const batch = validEmails.slice(i, i + batchSize);
    
    const batchPromises = batch.map(async (email) => {
      try {
        const result = await sendEmail({
          to: email.trim(),
          subject,
          html,
          text
        });
        
        if (result.success) {
          results.sent++;
          console.log(`Email sent to ${email}`);
        } else {
          results.failed++;
          results.errors.push(`Failed to send to ${email}: ${result.error}`);
        }
      } catch (error) {
        results.failed++;
        results.errors.push(`Error sending to ${email}: ${error instanceof Error ? error.message : String(error)}`);
      }
    });

    await Promise.all(batchPromises);
    
    // Add delay between batches to avoid rate limiting
    if (i + batchSize < validEmails.length && delay > 0) {
      console.log(`Batch completed. Waiting ${delay}ms before next batch...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  console.log(`Bulk email completed: ${results.sent} sent, ${results.failed} failed`);
  return results;
}

// Email templates
export const emailTemplates = {
  applicationConfirmation: (data: {
    firstName: string;
    lastName: string;
    city: string;
    format: string;
  }) => ({
    subject: 'Підтвердження заявки на навчання в UEBSchool',
    html: `
      <!DOCTYPE html>
      <html lang="uk">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Підтвердження заявки</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; }
          .highlight { color: #667eea; font-weight: bold; }
          .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎓 UEBSchool</h1>
          <p>Біблійна школа в м. Рівне</p>
        </div>
        
        <div class="content">
          <h2>Вітаємо, ${data.firstName} ${data.lastName}!</h2>
          
          <p>Дякуємо за вашу заявку на навчання в UEBSchool. Ми отримали вашу заявку та скоро з вами зв'яжемося.</p>
          
          <div class="info-box">
            <h3>Деталі вашої заявки:</h3>
            <p><strong>Місто:</strong> ${data.city}</p>
            <p><strong>Формат навчання:</strong> ${data.format}</p>
            <p><strong>Дата подачі:</strong> ${new Date().toLocaleDateString('uk-UA')}</p>
          </div>
          
          <p>Наша команда розгляне вашу заявку протягом <span class="highlight">24 годин</span> та зв'яжеться з вами для уточнення деталей.</p>
          
          <h3>Що далі?</h3>
          <ul>
            <li>Очікуйте дзвінка від нашого координатора</li>
            <li>Підготуйте документи для зарахування</li>
            <li>Приєднуйтесь до нашої спільноти в соцмережах</li>
          </ul>
          
          <p>З найкращими побажаннями,<br>Команда UEBSchool</p>
        </div>
        
        <div class="footer">
          <p>© 2025 UEBSchool. Біблійна освіта та духовний розвиток.</p>
          <p>м. Рівне, Україна | uebschool.com</p>
        </div>
      </body>
      </html>
    `,
  }),

  newsletterConfirmation: (email: string) => ({
    subject: 'Підписка на розсилку UEBSchool підтверджена',
    html: `
      <!DOCTYPE html>
      <html lang="uk">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Підписка підтверджена</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; }
          .highlight { color: #667eea; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📧 Дякуємо за підписку!</h1>
        </div>
        
        <div class="content">
          <h2>Вітаємо в спільноті UEBSchool!</h2>
          
          <p>Ваша підписка на розсилку успішно підтверджена. Тепер ви будете отримувати:</p>
          
          <ul>
            <li><span class="highlight">Новини</span> про навчальні програми</li>
            <li><span class="highlight">Анонси</span> майбутніх лекцій та подій</li>
            <li><span class="highlight">Духовні роздуми</span> та навчальні матеріали</li>
            <li><span class="highlight">Запрошення</span> на спеціальні заходи</li>
          </ul>
          
          <p>Ми цінуємо ваш інтерес до біблійної освіти та духовного розвитку!</p>
          
          <p>З найкращими побажаннями,<br>Команда UEBSchool</p>
        </div>
        
        <div class="footer">
          <p>© 2024 UEBSchool. Біблійна освіта та духовний розвиток.</p>
          <p>Якщо ви не підписувались на розсилку, проігноруйте цей лист.</p>
        </div>
      </body>
      </html>
    `,
  }),

  adminNotification: (type: 'application' | 'newsletter', data: any) => {
    if (type === 'application') {
      return {
        subject: `Нова заявка на навчання: ${data.firstName} ${data.lastName}`,
        html: `
          <h2>🎓 Нова заявка на навчання</h2>
          <p><strong>Ім'я:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Телефон:</strong> ${data.phone}</p>
          <p><strong>Місто:</strong> ${data.city}</p>
          <p><strong>Формат:</strong> ${data.format}</p>
          <p><strong>Час подачі:</strong> ${new Date().toLocaleString('uk-UA')}</p>
        `,
      };
    } else {
      return {
        subject: `Нова підписка на розсилку`,
        html: `
          <h2>📧 Нова підписка на розсилку</h2>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Час підписки:</strong> ${new Date().toLocaleString('uk-UA')}</p>
        `,
      };
    }
  },
};