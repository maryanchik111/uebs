'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { isUserAdmin } from '@/lib/user-utils';
import { useRouter } from 'next/navigation';
import { Loader2, Users, ChevronDown, ChevronUp, Check, Search, X } from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  format: 'очно' | 'онлайн';
}

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

  // Students state
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [showStudentPicker, setShowStudentPicker] = useState(false);
  const [selectedStudentIds, setSelectedStudentIds] = useState<Set<string>>(new Set());
  const [studentSearch, setStudentSearch] = useState('');

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
        // Load students from Firebase
        const studentsRef = ref(database, 'students');
        onValue(studentsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const list = Object.keys(data).map(key => ({ id: key, ...data[key] })) as Student[];
            setStudents(list.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)));
          } else {
            setStudents([]);
          }
          setStudentsLoading(false);
        });
      }
    });
  }, [user, authLoading, router]);

  const filteredStudents = students.filter(s => {
    const q = studentSearch.toLowerCase();
    return (
      s.firstName.toLowerCase().includes(q) ||
      s.lastName.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q)
    );
  });

  const handleToggleStudent = (id: string) => {
    setSelectedStudentIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAllStudents = () => {
    if (selectedStudentIds.size === filteredStudents.length && filteredStudents.length > 0) {
      setSelectedStudentIds(new Set());
    } else {
      setSelectedStudentIds(new Set(filteredStudents.map(s => s.id)));
    }
  };

  const applySelectedStudents = () => {
    const selected = students.filter(s => selectedStudentIds.has(s.id));
    const emails = selected.map(s => s.email).join('\n');
    setFormData(prev => ({ ...prev, emails }));
    setShowStudentPicker(false);
  };

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

  const allFilteredSelected =
    filteredStudents.length > 0 && filteredStudents.every(s => selectedStudentIds.has(s.id));

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-12">
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

              {/* Student Picker Button */}
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => setShowStudentPicker(prev => !prev)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  <Users className="w-4 h-4" />
                  Обрати студентів з бази
                  {showStudentPicker ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Student Picker Panel */}
              {showStudentPicker && (
                <div className="mb-3 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  {/* Panel Header */}
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                      Студенти ({students.length})
                      {selectedStudentIds.size > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                          Вибрано: {selectedStudentIds.size}
                        </span>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={handleSelectAllStudents}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      {allFilteredSelected ? 'Зняти всіх' : 'Вибрати всіх'}
                    </button>
                  </div>

                  {/* Search */}
                  <div className="px-4 py-2 border-b border-gray-100 relative">
                    <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={studentSearch}
                      onChange={e => setStudentSearch(e.target.value)}
                      placeholder="Пошук студента..."
                      className="w-full pl-8 pr-8 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {studentSearch && (
                      <button
                        type="button"
                        onClick={() => setStudentSearch('')}
                        className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Student List */}
                  <div className="max-h-56 overflow-y-auto divide-y divide-gray-50">
                    {studentsLoading ? (
                      <div className="flex items-center justify-center py-6">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                      </div>
                    ) : filteredStudents.length === 0 ? (
                      <p className="text-center text-sm text-gray-500 py-6">Студентів не знайдено</p>
                    ) : (
                      filteredStudents.map(student => {
                        const checked = selectedStudentIds.has(student.id);
                        return (
                          <label
                            key={student.id}
                            className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors ${checked ? 'bg-blue-50' : ''}`}
                          >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                              {checked && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => handleToggleStudent(student.id)}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-800 truncate">
                                {student.firstName} {student.lastName}
                              </p>
                              <p className="text-xs text-gray-500 truncate">{student.email}</p>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${student.format === 'очно' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                              {student.format}
                            </span>
                          </label>
                        );
                      })
                    )}
                  </div>

                  {/* Apply Button */}
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3">
                    <span className="text-xs text-gray-500">
                      {selectedStudentIds.size === 0
                        ? 'Оберіть студентів'
                        : `${selectedStudentIds.size} email(и) будуть додані`}
                    </span>
                    <button
                      type="button"
                      onClick={applySelectedStudents}
                      disabled={selectedStudentIds.size === 0}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Застосувати
                    </button>
                  </div>
                </div>
              )}

              <textarea
                value={formData.emails}
                onChange={(e) => setFormData({ ...formData, emails: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                required
                placeholder={"user1@example.com\nuser2@example.com\nuser3@example.com"}
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