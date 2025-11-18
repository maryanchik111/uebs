'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { isUserAdmin } from '@/lib/user-utils';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Users, Plus, Mail, Phone, User, X, Calendar, Trash2, Edit, FileText } from 'lucide-react';
import { ref, onValue, push, set, remove } from 'firebase/database';
import { database } from '@/lib/firebase';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  format: 'очно' | 'онлайн';
  addedAt: string;
  source: 'manual' | 'application';
}

export default function StudentsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    format: 'очно' as 'очно' | 'онлайн'
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    isUserAdmin(user.uid).then((admin) => {
      if (!admin) {
        router.push('/');
      } else {
        setIsAdmin(true);
        loadStudents();
      }
    });
  }, [user, router]);

  const loadStudents = () => {
    const studentsRef = ref(database, 'students');
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setStudents(studentsList.sort((a, b) => 
          new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
        ));
      } else {
        setStudents([]);
      }
      setLoading(false);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Заповніть обов\'язкові поля');
      return;
    }

    const studentData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      format: formData.format,
      addedAt: new Date().toISOString(),
      source: 'manual'
    };

    if (editingStudent) {
      // Update existing student
      const studentRef = ref(database, `students/${editingStudent.id}`);
      await set(studentRef, studentData);
    } else {
      // Add new student
      const studentsRef = ref(database, 'students');
      await push(studentsRef, studentData);
    }

    resetForm();
  };

  const handleDelete = async (studentId: string) => {
    if (confirm('Ви впевнені, що хочете видалити цього студента?')) {
      const studentRef = ref(database, `students/${studentId}`);
      await remove(studentRef);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      format: student.format
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      format: 'очно'
    });
    setEditingStudent(null);
    setShowAddModal(false);
  };

  if (!isAdmin || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Завантаження...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Студенти</h1>
              <p className="text-slate-600">Всього: {students.length}</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-shadow"
          >
            <Plus className="w-5 h-5" />
            Додати студента
          </button>
        </motion.div>

        {/* Students List */}
        <div className="grid gap-4">
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {student.firstName} {student.lastName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.format === 'очно' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {student.format}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.source === 'manual' 
                            ? 'bg-gray-100 text-gray-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {student.source === 'manual' ? 'Додано вручну' : 'Із заявки'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{student.email}</span>
                    </div>
                    {student.phone && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{student.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(student.addedAt).toLocaleDateString('uk-UA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Редагувати"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Видалити"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {students.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Поки що немає студентів</h3>
              <p className="text-slate-600">Додайте першого студента, натиснувши кнопку вгорі</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingStudent ? 'Редагувати студента' : 'Додати студента'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Ім'я *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Іван"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Прізвище *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Іваненко"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+380 XX XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Формат навчання *
                </label>
                <select
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value as 'очно' | 'онлайн' })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="очно">Очно</option>
                  <option value="онлайн">Онлайн</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                >
                  {editingStudent ? 'Зберегти' : 'Додати'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
