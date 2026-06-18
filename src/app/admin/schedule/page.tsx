'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { isUserAdmin } from '@/lib/user-utils';
import { database } from '@/lib/firebase';
import { ref, get, push, set, remove, onValue } from 'firebase/database';
import { Shield, Loader2, ArrowLeft, Plus, Trash2, CalendarDays } from 'lucide-react';
import Link from 'next/link';

interface ScheduledLecture {
  id: string;
  title: string;
  titleEn: string;
  speaker: string;
  speakerEn: string;
  date: string;
  youtubeId?: string;
}

export default function AdminSchedulePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [lectures, setLectures] = useState<ScheduledLecture[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    speaker: '',
    speakerEn: '',
    date: '',
    youtubeId: ''
  });

  useEffect(() => {
    if (authLoading) return;

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
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!admin) return;

    const lecturesRef = ref(database, 'scheduled_lectures');
    const unsubscribe = onValue(lecturesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const lecturesList: ScheduledLecture[] = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        // Sort by date (closest future first)
        lecturesList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setLectures(lecturesList);
      } else {
        setLectures([]);
      }
    });

    return () => unsubscribe();
  }, [admin]);

  const handleAddLecture = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const lecturesRef = ref(database, 'scheduled_lectures');
      const newLectureRef = push(lecturesRef);

      const newLecture = {
        title: formData.title,
        titleEn: formData.titleEn,
        speaker: formData.speaker,
        speakerEn: formData.speakerEn,
        date: formData.date,
        youtubeId: formData.youtubeId || ''
      };

      await set(newLectureRef, newLecture);

      // Reset form
      setFormData({
        title: '',
        titleEn: '',
        speaker: '',
        speakerEn: '',
        date: '',
        youtubeId: ''
      });

      alert('Лекцію успішно додано!');
    } catch (error) {
      console.error('Error adding lecture:', error);
      alert('Помилка при додаванні лекції.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Ви впевнені, що хочете видалити цю заплановану лекцію?')) {
      try {
        await remove(ref(database, `scheduled_lectures/${id}`));
      } catch (error) {
        console.error('Error deleting lecture:', error);
        alert('Помилка при видаленні.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад до адмін панелі
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <CalendarDays className="w-8 h-8 text-teal-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Розклад лекцій
            </h1>
          </div>
          <p className="text-gray-600">Керування списком запланованих лекцій (показуються на головній сторінці)</p>
        </div>

        {/* Add Lecture Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-2 border-transparent hover:border-teal-100 transition-all">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
            <Plus className="w-5 h-5 text-teal-600" /> Додати нову лекцію
          </h2>
          <form onSubmit={handleAddLecture} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Назва (Укр)*</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="Наприклад: «ХАРАКТЕР БОГА»"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Назва (Англ)*</label>
                <input
                  type="text"
                  required
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="Наприклад: «CHARACTER OF GOD»"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Спікер (Укр)*</label>
                <input
                  type="text"
                  required
                  value={formData.speaker}
                  onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="Наприклад: Олег Назарчук"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Спікер (Англ)*</label>
                <input
                  type="text"
                  required
                  value={formData.speakerEn}
                  onChange={(e) => setFormData({ ...formData, speakerEn: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="Наприклад: Oleg Nazarchuk"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Дата проведення*</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className=" px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube ID (Необов&apos;язково)</label>
                <input
                  type="text"
                  value={formData.youtubeId}
                  onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="Наприклад: d1fM8Fl52qc"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isAdding}
              className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 mt-4 flex justify-center items-center gap-2"
            >
              {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              Зберегти лекцію
            </button>
          </form>
        </div>

        {/* Existing Lectures List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-slate-800">Заплановані лекції ({lectures.length})</h2>

          {lectures.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Немає запланованих лекцій.</p>
          ) : (
            <div className="space-y-4">
              {lectures.map((lecture) => {
                const isPast = new Date(lecture.date) < new Date();

                return (
                  <div key={lecture.id} className={`p-4 rounded-lg border ${isPast ? 'bg-gray-50 border-gray-200' : 'bg-teal-50 border-teal-100'} flex justify-between items-center`}>
                    <div>
                      <h3 className={`font-semibold ${isPast ? 'text-gray-600' : 'text-slate-800'}`}>
                        {lecture.title}
                        {isPast && <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Минула</span>}
                      </h3>
                      <p className="text-sm text-gray-600">{lecture.speaker} • {lecture.date}</p>
                      {lecture.youtubeId && (
                        <p className="text-xs text-blue-500 mt-1">YouTube: {lecture.youtubeId}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(lecture.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Видалити"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
