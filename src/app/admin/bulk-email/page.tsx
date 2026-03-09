'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { isUserAdmin } from '@/lib/user-utils';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function BulkEmailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    emails: '',
    subject: '',
    html: '',
    text: '',
    adminKey: '',
    batchSize: 10,
    delay: 1000
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    isUserAdmin(user.uid).then((admin) => {
      if (!admin) {
        router.push('/');
      } else {
        setIsAdmin(true);
      }
    });
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResults(null);

    try {
      // Convert emails string to array
      const emailsArray = formData.emails
        .split('\n')
        .map(email => email.trim())
        .filter(email => email.length > 0);

      const response = await fetch('/api/bulk-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emails: emailsArray,
          subject: formData.subject,
          html: formData.html,
          text: formData.text,
          adminKey: formData.adminKey,
          batchSize: formData.batchSize,
          delay: formData.delay
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send emails');
      }

      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const defaultTemplate = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Повідомлення від UEBSchool</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; }
    .highlight { color: #667eea; font-weight: bold; }
    .image-container { text-align: center; margin: 20px 0; }
    .content-image { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎓 UEBSchool</h1>
    <p>Біблійна школа в м. Рівне</p>
  </div>
  
  <div class="content">
    <h2>Вітаємо!</h2>
    
    <p>Дорогі друзі! Маємо важливу інформацію для вас.</p>
    
    <div class="image-container">
      <img src="https://uebs.com.ua/ihorplohoy.jpg" alt="Повідомлення від UEBSchool" class="content-image" />
    </div>
    
    <p>Тут ваш контент з описом фотографії або важливою інформацією...</p>
    
    <p><strong>Важливо:</strong> Не забудьте приєднатися до наших заходів!</p>
    
    <p>З найкращими побажаннями,<br>Команда UEBSchool</p>
  </div>
  
  <div class="footer">
    <p>© 2025 UEBSchool. Біблійна освіта та духовний розвиток.</p>
    <p>м. Рівне, Україна | uebschool.com</p>
  </div>
</body>
</html>`;

  if (authLoading || (!isAdmin && user)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            📧 Масова розсилка Email
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Admin Key */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Адмін ключ *
              </label>
              <input
                type="password"
                value={formData.adminKey}
                onChange={(e) => setFormData({ ...formData, adminKey: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Введіть адмін ключ"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Тема листа *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Введіть тему листа"
              />
            </div>

            {/* Email addresses */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email адреси * (по одному на рядок)
              </label>
              <textarea
                value={formData.emails}
                onChange={(e) => setFormData({ ...formData, emails: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                required
                placeholder="user1@example.com&#10;user2@example.com&#10;user3@example.com"
              />
              <p className="text-sm text-gray-500 mt-1">
                Всього email адрес: {formData.emails.split('\n').filter(e => e.trim()).length}
              </p>
            </div>

            {/* HTML Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HTML контент *
              </label>
              <div className="mb-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, html: defaultTemplate })}
                  className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  Завантажити шаблон
                </button>
              </div>
              <textarea
                value={formData.html}
                onChange={(e) => setFormData({ ...formData, html: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-64 font-mono text-sm"
                required
                placeholder="Введіть HTML контент листа"
              />
            </div>

            {/* Text version (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Текстова версія (необов'язково)
              </label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Текстова версія листа (буде згенерована автоматично, якщо не вказана)"
              />
            </div>

            {/* Advanced settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Розмір батчу
                </label>
                <input
                  type="number"
                  value={formData.batchSize}
                  onChange={(e) => setFormData({ ...formData, batchSize: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="50"
                />
                <p className="text-sm text-gray-500 mt-1">Кількість листів в одному батчі</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Затримка (мс)
                </label>
                <input
                  type="number"
                  value={formData.delay}
                  onChange={(e) => setFormData({ ...formData, delay: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="10000"
                />
                <p className="text-sm text-gray-500 mt-1">Затримка між батчами</p>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition duration-200"
            >
              {isLoading ? 'Відправляю листи...' : 'Відправити листи'}
            </button>
          </form>

          {/* Error display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Results display */}
          {results && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Результати розсилки</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{results.total}</p>
                  <p className="text-sm text-gray-600">Всього</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{results.sent}</p>
                  <p className="text-sm text-gray-600">Відправлено</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{results.failed}</p>
                  <p className="text-sm text-gray-600">Помилки</p>
                </div>
              </div>

              {results.errors && results.errors.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-red-800 mb-2">Помилки:</h4>
                  <div className="max-h-32 overflow-y-auto">
                    {results.errors.map((error: string, index: number) => (
                      <p key={index} className="text-sm text-red-700">{error}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}