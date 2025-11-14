import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            🔐 Адмін панель UEBSchool
          </h1>

          <div className="space-y-4">
            <Link
              href="/admin/bulk-email"
              className="block p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition duration-200"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">📧</span>
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">Масова розсилка Email</h3>
                  <p className="text-blue-600">Відправити листи всім користувачам</p>
                </div>
              </div>
            </Link>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📊</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">Статистика</h3>
                  <p className="text-gray-500">Скоро буде доступно</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">👥</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">Управління користувачами</h3>
                  <p className="text-gray-500">Скоро буде доступно</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Безпека</h3>
            <ul className="text-yellow-700 space-y-1">
              <li>• Не діліться адмін ключем з іншими</li>
              <li>• Використовуйте надійний пароль</li>
              <li>• Регулярно змінюйте адмін ключ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}