'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, Notification, Homework } from '@/contexts/auth-context';
import Image from 'next/image';
import {
  User,
  Mail,
  Calendar,
  LogOut,
  Loader2,
  Edit2,
  Save,
  X,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell,
  BookOpen,
  Camera,
  FileText,
  BellOff,
} from 'lucide-react';

export default function CabinetPage() {
  const { 
    user, 
    userProfile, 
    loading, 
    logout, 
    updateUserProfile, 
    sendVerificationEmail,
    uploadProfilePhoto,
    markNotificationAsRead,
    markHomeworkAsCompleted,
  } = useAuth();
  
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'homework'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || '');
    }
  }, [userProfile]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleSaveProfile = async () => {
    if (!displayName.trim()) return;
    
    setSaving(true);
    try {
      await updateUserProfile({ displayName: displayName.trim() });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setDisplayName(userProfile?.displayName || '');
    setIsEditing(false);
  };

  const handleSendVerificationEmail = async () => {
    setVerificationError('');
    setVerificationEmailSent(false);
    try {
      await sendVerificationEmail();
      setVerificationEmailSent(true);
    } catch (error: any) {
      console.error('Error sending verification email:', error);
      if (error.code === 'auth/too-many-requests') {
        setVerificationError('Забагато спроб. Спробуйте пізніше.');
      } else {
        setVerificationError('Помилка відправки листа. Спробуйте ще раз.');
      }
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Файл занадто великий. Максимальний розмір 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Будь ласка, виберіть зображення');
      return;
    }

    setUploadingPhoto(true);
    try {
      await uploadProfilePhoto(file);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Помилка завантаження фото');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await markNotificationAsRead(notification.id);
    }
  };

  const handleMarkHomeworkCompleted = async (homeworkId: string) => {
    await markHomeworkAsCompleted(homeworkId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Завантаження...</p>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unreadNotifications = (userProfile.notifications || []).filter(n => !n.read).length;
  const pendingHomework = (userProfile.homework || []).filter(h => !h.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 left-0 right-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Особистий кабінет</h1>
              <p className="text-gray-600 mt-1">ID: {userProfile.userId}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              Вийти
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-lg shadow-md p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 min-h-[48px] ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="w-5 h-5 flex-shrink-0" />
            <span className="hidden sm:inline">Профіль</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 relative min-h-[48px] ${
              activeTab === 'notifications'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Bell className="w-5 h-5 flex-shrink-0" />
            <span className="hidden sm:inline">Повідомлення</span>
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('homework')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 relative min-h-[48px] ${
              activeTab === 'homework'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-5 h-5 flex-shrink-0" />
            <span className="hidden sm:inline">Домашнє завдання</span>
            {pendingHomework > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingHomework}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'profile' && (
          <div className="grid gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                {/* Photo */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold relative">
                    {userProfile.photoURL ? (
                      <Image
                        src={userProfile.photoURL}
                        alt={userProfile.displayName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      userProfile.displayName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingPhoto}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all disabled:opacity-50"
                  >
                    {uploadingPhoto ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Camera className="w-5 h-5" />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {userProfile.displayName}
                      </h2>
                      <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-1">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        ID: <span className="font-mono font-semibold">{userProfile.userId}</span>
                      </p>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                        Редагувати
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ім'я
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ваше ім'я"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        disabled={saving || !displayName.trim()}
                        className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {saving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Зберегти
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Скасувати
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 text-gray-700 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Дата реєстрації</span>
                  </div>
                  <p className="text-gray-900 ml-8 text-sm">{formatDate(userProfile.createdAt)}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 text-gray-700 mb-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Останній вхід</span>
                  </div>
                  <p className="text-gray-900 ml-8 text-sm">{formatDate(userProfile.lastLogin)}</p>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Інформація про акаунт</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">Email верифіковано</p>
                      <p className="text-sm text-gray-600">
                        {user.emailVerified ? 'Так' : 'Ні'}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.emailVerified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {user.emailVerified ? 'Підтверджено' : 'Не підтверджено'}
                    </div>
                  </div>

                  {!user.emailVerified && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      {verificationEmailSent && (
                        <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-green-800">
                            Лист для верифікації відправлено на {user.email}
                          </p>
                        </div>
                      )}

                      {verificationError && (
                        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-800">{verificationError}</p>
                        </div>
                      )}

                      <button
                        onClick={handleSendVerificationEmail}
                        className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Відправити лист верифікації
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="overflow-hidden">
                    <p className="font-medium text-gray-900">User ID</p>
                    <p className="text-sm text-gray-600 font-mono truncate">{user.uid}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Повідомлення</h3>
            </div>

            {(!userProfile.notifications || userProfile.notifications.length === 0) ? (
              <div className="text-center py-12">
                <BellOff className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Повідомлень поки немає</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[...userProfile.notifications]
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      notification.read
                        ? 'bg-gray-50 border-gray-200'
                        : 'bg-blue-50 border-blue-200 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatDate(notification.createdAt)}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        notification.type === 'success' ? 'bg-green-100 text-green-800' :
                        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        notification.type === 'homework' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {notification.type === 'homework' ? 'Завдання' :
                         notification.type === 'success' ? 'Успіх' :
                         notification.type === 'warning' ? 'Важливо' : 'Інфо'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'homework' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Домашнє завдання</h3>
            </div>

            {(!userProfile.homework || userProfile.homework.length === 0) ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Домашніх завдань поки немає</p>
              </div>
            ) : (
              <div className="space-y-4">
                {[...userProfile.homework]
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((hw) => (
                  <div
                    key={hw.id}
                    className={`p-4 sm:p-6 rounded-lg border ${
                      hw.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{hw.title}</h4>
                          {hw.completed && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{hw.description}</p>
                        <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-500">
                          <span>Створено: {formatDate(hw.createdAt)}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className={`font-medium ${
                            new Date(hw.dueDate) < new Date() && !hw.completed
                              ? 'text-red-600'
                              : 'text-gray-700'
                          }`}>
                            Термін здачі: {formatDate(hw.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {hw.fileUrl && (
                      <a
                        href={hw.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm mb-3"
                      >
                        <FileText className="w-4 h-4" />
                        Переглянути файл
                      </a>
                    )}

                    {!hw.completed && (
                      <button
                        onClick={() => handleMarkHomeworkCompleted(hw.id)}
                        className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Позначити як виконане
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
