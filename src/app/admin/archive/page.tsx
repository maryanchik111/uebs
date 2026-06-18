'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { isUserAdmin } from '@/lib/user-utils';
import { database } from '@/lib/firebase';
import { ref, get, set, remove, onValue } from 'firebase/database';
import { Shield, Loader2, ArrowLeft, Plus, Trash2, Library } from 'lucide-react';
import Link from 'next/link';

interface ArchiveLecture {
  id: string; // Used as the key in Firebase
  title: string;
  titleEn: string;
  speaker: string;
  speakerEn: string;
  date: string;
  youtubeId: string;
  description: string;
  descriptionEn: string;
  fullDescription: string;
  fullDescriptionEn: string;
  duration: string;
  videoUrl?: string; // Optional since it can be derived from youtubeId
}

export default function AdminArchivePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [lectures, setLectures] = useState<ArchiveLecture[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    titleEn: '',
    speaker: '',
    speakerEn: '',
    date: '',
    youtubeId: '',
    description: '',
    descriptionEn: '',
    fullDescription: '',
    fullDescriptionEn: '',
    duration: ''
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

    const lecturesRef = ref(database, 'archive_lectures');
    const unsubscribe = onValue(lecturesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const lecturesList: ArchiveLecture[] = Object.keys(data).map(key => ({
          ...data[key],
          id: key // the key is the ID
        }));
        // Sort by date descending (newest first)
        lecturesList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setLectures(lecturesList);
      } else {
        setLectures([]);
      }
    });

    return () => unsubscribe();
  }, [admin]);

  const handleAddLecture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id.trim()) {
      alert("ID лекції обов'язковий!");
      return;
    }

    setIsAdding(true);

    try {
      // Use the provided ID as the key in Firebase
      const newLectureRef = ref(database, `archive_lectures/${formData.id}`);

      const newLecture = {
        title: formData.title,
        titleEn: formData.titleEn,
        speaker: formData.speaker,
        speakerEn: formData.speakerEn,
        date: formData.date,
        youtubeId: formData.youtubeId,
        description: formData.description,
        descriptionEn: formData.descriptionEn,
        fullDescription: formData.fullDescription,
        fullDescriptionEn: formData.fullDescriptionEn,
        duration: formData.duration,
        videoUrl: `https://www.youtube.com/embed/${formData.youtubeId}`
      };

      await set(newLectureRef, newLecture);

      // Reset form
      setFormData({
        id: '',
        title: '',
        titleEn: '',
        speaker: '',
        speakerEn: '',
        date: '',
        youtubeId: '',
        description: '',
        descriptionEn: '',
        fullDescription: '',
        fullDescriptionEn: '',
        duration: ''
      });

      alert('Лекцію успішно додано в архів!');
    } catch (error) {
      console.error('Error adding lecture to archive:', error);
      alert('Помилка при додаванні лекції.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Ви впевнені, що хочете видалити цю лекцію з архіву?')) {
      try {
        await remove(ref(database, `archive_lectures/${id}`));
      } catch (error) {
        console.error('Error deleting lecture:', error);
        alert('Помилка при видаленні.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
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
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад до адмін панелі
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Library className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Архів лекцій
            </h1>
          </div>
          <p className="text-gray-600">Додавання минулих лекцій, які будуть відображатися на сторінці Архіву</p>
        </div>

        {/* Add Lecture Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-2 border-transparent hover:border-purple-100 transition-all">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-600" /> Додати нову лекцію в архів
          </h2>
          <form onSubmit={handleAddLecture} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">ID (Англ літери, без пробілів, напр: my-new-lecture)*</label>
                <input
                  type="text"
                  required
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="character-of-god"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Назва (Укр)*</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Назва (Англ)*</label>
                <input
                  type="text"
                  required
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Спікер (Укр)*</label>
                <input
                  type="text"
                  required
                  value={formData.speaker}
                  onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Спікер (Англ)*</label>
                <input
                  type="text"
                  required
                  value={formData.speakerEn}
                  onChange={(e) => setFormData({ ...formData, speakerEn: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Дата проведення*</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className=" px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube ID* (напр: d1fM8Fl52qc)</label>
                <input
                  type="text"
                  required
                  value={formData.youtubeId}
                  onChange={(e) => setFormData({...formData, youtubeId: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Тривалість відео* (напр: 1:30:00)</label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="1:30:00"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Короткий опис (Укр)*</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none min-h-[80px]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Короткий опис (Англ)*</label>
                <textarea
                  required
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none min-h-[80px]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Повний опис - Markdown (Укр)*</label>
                <textarea
                  required
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none min-h-[200px]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Повний опис - Markdown (Англ)*</label>
                <textarea
                  required
                  value={formData.fullDescriptionEn}
                  onChange={(e) => setFormData({ ...formData, fullDescriptionEn: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none min-h-[200px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isAdding}
              className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 mt-4 flex justify-center items-center gap-2"
            >
              {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              Зберегти в архів
            </button>
          </form>
        </div>

        {/* Existing Lectures List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-slate-800">Динамічний Архів ({lectures.length})</h2>

          {lectures.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Жодної лекції ще не додано через адмінку.</p>
          ) : (
            <div className="space-y-4">
              {lectures.map((lecture) => (
                <div key={lecture.id} className="p-4 rounded-lg border bg-purple-50 border-purple-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {lecture.title}
                      <span className="ml-2 text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">{lecture.id}</span>
                    </h3>
                    <p className="text-sm text-gray-600">{lecture.speaker} • {lecture.date}</p>
                    <p className="text-xs text-blue-500 mt-1">YouTube: {lecture.youtubeId}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(lecture.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Видалити"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
