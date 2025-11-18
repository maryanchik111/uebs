'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, User, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export default function QuestionsSection() {
  const { user, userProfile, submitQuestion } = useAuth();
  const [question, setQuestion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;

    setSubmitting(true);
    try {
      await submitQuestion(
        question.trim(),
        user?.uid,
        userProfile?.email,
        userProfile?.displayName
      );
      setQuestion('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting question:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4" />
            Є питання?
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Задайте своє питання
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {user 
              ? `Ви увійшли як ${userProfile?.displayName || userProfile?.email}. Відповідь прийде у повідомлення в кабінеті.`
              : 'Питання можна задати анонімно. Якщо ви авторизовані, відповідь надійде у ваш кабінет.'
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Дякуємо за питання!
              </h3>
              <p className="text-gray-600">
                {user 
                  ? 'Відповідь надійде у ваш кабінет.'
                  : 'Ми отримали ваше питання і скоро на нього відповімо.'
                }
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше питання
                </label>
                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Введіть ваше питання тут..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  disabled={submitting}
                  required
                />
              </div>

              {user && userProfile && (
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <User className="w-4 h-4" />
                  <span>Відправляючи як: <strong>{userProfile.displayName || userProfile.email}</strong></span>
                </div>
              )}

              {!user && (
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <User className="w-4 h-4" />
                  <span>Питання буде відправлено анонімно</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !question.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Відправляємо...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Відправити питання
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
