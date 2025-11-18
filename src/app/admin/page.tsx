'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { isUserAdmin } from '@/lib/user-utils';
import { Bell, BookOpen, Mail, Users, BarChart3, Shield, Loader2 } from 'lucide-react';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    isUserAdmin(user.uid).then((isAdmin) => {
      if (!isAdmin) {
        router.push('/');
      } else {
        setAdmin(true);
        setLoading(false);
      }
    });
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Адмін панель
            </h1>
          </div>
          <p className="text-gray-600">Управління системою UEBSchool</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/admin/notifications"
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-purple-200"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Повідомлення</h3>
                <p className="text-gray-600 text-sm">Надіслати сповіщення користувачам</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/notifications"
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-blue-200"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Домашнє завдання</h3>
                <p className="text-gray-600 text-sm">Створити та призначити д/з студентам</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/bulk-email"
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-green-200"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Email розсилка</h3>
                <p className="text-gray-600 text-sm">Масова розсилка на пошту</p>
              </div>
            </div>
          </Link>

          <div className="group bg-white rounded-xl shadow-md p-6 border-2 border-gray-200 opacity-60">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-400 mb-1">Користувачі</h3>
                <p className="text-gray-400 text-sm">Скоро буде доступно</p>
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-xl shadow-md p-6 border-2 border-gray-200 opacity-60">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-400 mb-1">Статистика</h3>
                <p className="text-gray-400 text-sm">Скоро буде доступно</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Безпека</h3>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Не діліться адмін доступом з іншими</li>
                <li>• Використовуйте надійний пароль</li>
                <li>• Регулярно перевіряйте активність користувачів</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}