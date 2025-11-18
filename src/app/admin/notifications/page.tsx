'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, Notification, Homework } from '@/contexts/auth-context';
import { ref, get, update } from 'firebase/database';
import { database } from '@/lib/firebase';
import { isUserAdmin } from '@/lib/user-utils';
import {
  Send,
  Users,
  Bell,
  BookOpen,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface UserData {
  uid: string;
  userId: string;
  displayName: string;
  email: string;
}

export default function AdminNotificationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [sending, setSending] = useState(false);
  
  // Повідомлення
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'info' | 'success' | 'warning' | 'homework'>('info');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Домашнє завдання
  const [homeworkTitle, setHomeworkTitle] = useState('');
  const [homeworkDescription, setHomeworkDescription] = useState('');
  const [homeworkDueDate, setHomeworkDueDate] = useState('');
  const [homeworkFileUrl, setHomeworkFileUrl] = useState('');
  
  const [activeSection, setActiveSection] = useState<'notification' | 'homework'>('notification');
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        router.push('/login');
        return;
      }

      const adminStatus = await isUserAdmin(user.uid);
      if (!adminStatus) {
        router.push('/cabinet');
        return;
      }

      setIsAdmin(true);
      setCheckingAdmin(false);
      loadUsers();
    };

    if (!loading) {
      checkAdminStatus();
    }
  }, [user, loading, router]);

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      if (!database) return;
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const usersData: UserData[] = [];
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          usersData.push({
            uid: childSnapshot.key as string,
            userId: userData.userId,
            displayName: userData.displayName,
            email: userData.email,
          });
        });
        setUsers(usersData);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(u => u.uid));
    }
    setSelectAll(!selectAll);
  };

  const handleUserToggle = (uid: string) => {
    setSelectedUsers(prev =>
      prev.includes(uid)
        ? prev.filter(id => id !== uid)
        : [...prev, uid]
    );
  };

  const sendNotification = async () => {
    if (!notificationTitle || !notificationMessage || selectedUsers.length === 0) {
      alert('Заповніть всі поля та виберіть користувачів');
      return;
    }
    if (!database) return;

    setSending(true);
    try {
      const notification: Notification = {
        id: Date.now().toString(),
        title: notificationTitle,
        message: notificationMessage,
        type: notificationType,
        createdAt: new Date().toISOString(),
        read: false,
      };

      for (const uid of selectedUsers) {
        const userRef = ref(database, `users/${uid}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const notifications = userData.notifications || [];
          notifications.push(notification);
          
          await update(userRef, { notifications });
        }
      }

      alert(`Повідомлення відправлено ${selectedUsers.length} користувачам!`);
      setNotificationTitle('');
      setNotificationMessage('');
      setSelectedUsers([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Помилка відправки повідомлення');
    } finally {
      setSending(false);
    }
  };

  const sendHomework = async () => {
    if (!homeworkTitle || !homeworkDescription || !homeworkDueDate || selectedUsers.length === 0) {
      alert('Заповніть всі поля та виберіть користувачів');
      return;
    }
    if (!database) return;

    setSending(true);
    try {
      const homework: Homework = {
        id: Date.now().toString(),
        title: homeworkTitle,
        description: homeworkDescription,
        dueDate: new Date(homeworkDueDate).toISOString(),
        createdAt: new Date().toISOString(),
        completed: false,
        ...(homeworkFileUrl && { fileUrl: homeworkFileUrl }), // Додаємо тільки якщо є значення
      };

      const notification: Notification = {
        id: Date.now().toString(),
        title: '📚 Нове домашнє завдання',
        message: `Тема: ${homeworkTitle}`,
        type: 'homework',
        createdAt: new Date().toISOString(),
        read: false,
      };

      for (const uid of selectedUsers) {
        const userRef = ref(database, `users/${uid}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const homeworkList = userData.homework || [];
          const notifications = userData.notifications || [];
          
          homeworkList.push(homework);
          notifications.push(notification);
          
          await update(userRef, { 
            homework: homeworkList,
            notifications,
          });
        }
      }

      alert(`Домашнє завдання відправлено ${selectedUsers.length} користувачам!`);
      setHomeworkTitle('');
      setHomeworkDescription('');
      setHomeworkDueDate('');
      setHomeworkFileUrl('');
      setSelectedUsers([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error sending homework:', error);
      alert('Помилка відправки домашнього завдання');
    } finally {
      setSending(false);
    }
  };

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Перевірка доступу...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-28">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Адмін панель</h1>
          <p className="text-gray-600 mt-1">Відправка повідомлень та завдань</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left side - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md p-1 inline-flex gap-1">
              <button
                onClick={() => setActiveSection('notification')}
                className={`px-6 py-3 rounded-md font-medium transition-all flex items-center gap-2 ${
                  activeSection === 'notification'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Bell className="w-5 h-5" />
                Повідомлення
              </button>
              <button
                onClick={() => setActiveSection('homework')}
                className={`px-6 py-3 rounded-md font-medium transition-all flex items-center gap-2 ${
                  activeSection === 'homework'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                Домашнє завдання
              </button>
            </div>

            {/* Notification Form */}
            {activeSection === 'notification' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Нове повідомлення</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Заголовок
                    </label>
                    <input
                      type="text"
                      value={notificationTitle}
                      onChange={(e) => setNotificationTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Введіть заголовок"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Повідомлення
                    </label>
                    <textarea
                      value={notificationMessage}
                      onChange={(e) => setNotificationMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Введіть текст повідомлення"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Тип повідомлення
                    </label>
                    <select
                      value={notificationType}
                      onChange={(e) => setNotificationType(e.target.value as any)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="info">Інформація</option>
                      <option value="success">Успіх</option>
                      <option value="warning">Попередження</option>
                      <option value="homework">Завдання</option>
                    </select>
                  </div>

                  <button
                    onClick={sendNotification}
                    disabled={sending || selectedUsers.length === 0}
                    className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Відправка...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Відправити ({selectedUsers.length})
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Homework Form */}
            {activeSection === 'homework' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Нове домашнє завдання</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Назва
                    </label>
                    <input
                      type="text"
                      value={homeworkTitle}
                      onChange={(e) => setHomeworkTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Введіть назву завдання"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Опис
                    </label>
                    <textarea
                      value={homeworkDescription}
                      onChange={(e) => setHomeworkDescription(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Опишіть завдання"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Термін здачі
                    </label>
                    <input
                      type="datetime-local"
                      value={homeworkDueDate}
                      onChange={(e) => setHomeworkDueDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Посилання на файл (необов'язково)
                    </label>
                    <input
                      type="url"
                      value={homeworkFileUrl}
                      onChange={(e) => setHomeworkFileUrl(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>

                  <button
                    onClick={sendHomework}
                    disabled={sending || selectedUsers.length === 0}
                    className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Відправка...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Відправити ({selectedUsers.length})
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Users */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div 
                className="flex items-center justify-between cursor-pointer lg:cursor-default"
                onClick={() => setShowUserList(!showUserList)}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Користувачі ({selectedUsers.length}/{users.length})
                  </h3>
                </div>
                <button className="lg:hidden">
                  {showUserList ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>

              <div className={`mt-4 space-y-3 ${showUserList ? 'block' : 'hidden lg:block'}`}>
                <button
                  onClick={handleSelectAll}
                  className="w-full px-4 py-2 border-2 border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-all"
                >
                  {selectAll ? 'Зняти вибір з усіх' : 'Вибрати всіх'}
                </button>

                {loadingUsers ? (
                  <div className="text-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin text-purple-600 mx-auto" />
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {users.map((user) => (
                      <label
                        key={user.uid}
                        className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.uid)}
                          onChange={() => handleUserToggle(user.uid)}
                          className="mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{user.displayName}</p>
                          <p className="text-sm text-gray-600 truncate">{user.email}</p>
                          <p className="text-xs text-gray-500 font-mono">{user.userId}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
