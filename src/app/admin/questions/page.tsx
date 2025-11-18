'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, Question } from '@/contexts/auth-context';
import { isUserAdmin } from '@/lib/user-utils';
import { ref, get, update } from 'firebase/database';
import { database } from '@/lib/firebase';
import { 
  Loader2, 
  MessageCircle, 
  User as UserIcon, 
  Clock, 
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function AdminQuestionsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [answering, setAnswering] = useState(false);

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
        loadQuestions();
      }
    });
  }, [user, router]);

  const loadQuestions = async () => {
    try {
      if (!database) return;
      const questionsRef = ref(database, 'questions');
      const snapshot = await get(questionsRef);
      
      if (snapshot.exists()) {
        const questionsData = snapshot.val();
        const questionsList = Object.values(questionsData) as Question[];
        // Сортуємо: спочатку без відповіді, потім за датою
        questionsList.sort((a, b) => {
          if (a.answered === b.answered) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
          return a.answered ? 1 : -1;
        });
        setQuestions(questionsList);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (questionId: string) => {
    if (!answer.trim() || !user || !database) return;

    setAnswering(true);
    try {
      const question = questions.find(q => q.id === questionId);
      if (!question) return;

      // Оновлюємо питання з відповіддю
      const questionRef = ref(database, `questions/${questionId}`);
      await update(questionRef, {
        answered: true,
        answer: answer.trim(),
        answeredAt: new Date().toISOString(),
        answeredBy: user.uid
      });

      // Якщо питання від зареєстрованого користувача, надсилаємо повідомлення
      if (question.userId && database) {
        const userRef = ref(database, `users/${question.userId}`);
        const userSnapshot = await get(userRef);
        
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          const notifications = userData.notifications || [];
          
          notifications.push({
            id: `notif-${Date.now()}`,
            title: 'Відповідь на ваше питання',
            message: `Питання: "${question.question}"\n\nВідповідь: ${answer.trim()}`,
            createdAt: new Date().toISOString(),
            read: false,
            type: 'info'
          });

          await update(userRef, { notifications });
        }
      }

      setAnswer('');
      setSelectedQuestion(null);
      loadQuestions();
    } catch (error) {
      console.error('Error answering question:', error);
    } finally {
      setAnswering(false);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8 pb-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Питання користувачів
          </h1>
          <p className="text-gray-600">
            Всього питань: {questions.length} | 
            Без відповіді: {questions.filter(q => !q.answered).length}
          </p>
        </div>

        <div className="space-y-4">
          {questions.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Питань поки немає</p>
            </div>
          ) : (
            questions.map((question) => (
              <div
                key={question.id}
                className={`bg-white rounded-xl shadow-md p-6 border-2 ${
                  question.answered 
                    ? 'border-green-200' 
                    : 'border-orange-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${
                      question.answered ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      <MessageCircle className={`w-5 h-5 ${
                        question.answered ? 'text-green-600' : 'text-orange-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {question.isAnonymous ? (
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <UserIcon className="w-4 h-4" />
                            Анонімно
                          </span>
                        ) : (
                          <span className="text-sm text-blue-600 font-medium flex items-center gap-1">
                            <UserIcon className="w-4 h-4" />
                            {question.userName || question.userEmail}
                          </span>
                        )}
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(question.createdAt).toLocaleString('uk-UA')}
                        </span>
                      </div>
                      <p className="text-gray-800 font-medium mb-3">{question.question}</p>
                      
                      {question.answered && question.answer && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Відповідь:</span>
                          </div>
                          <p className="text-gray-700 text-sm">{question.answer}</p>
                          {question.answeredAt && (
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(question.answeredAt).toLocaleString('uk-UA')}
                            </p>
                          )}
                        </div>
                      )}

                      {!question.answered && selectedQuestion === question.id && (
                        <div className="mt-4">
                          <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Введіть відповідь..."
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-3"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAnswerSubmit(question.id)}
                              disabled={!answer.trim() || answering}
                              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                              {answering ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Send className="w-4 h-4" />
                              )}
                              Відправити
                            </button>
                            <button
                              onClick={() => {
                                setSelectedQuestion(null);
                                setAnswer('');
                              }}
                              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Скасувати
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {!question.answered && selectedQuestion !== question.id && (
                  <button
                    onClick={() => setSelectedQuestion(question.id)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Відповісти
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
