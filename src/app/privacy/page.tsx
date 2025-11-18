"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      icon: Lock,
      title: "Збір інформації",
      content: `Ми збираємо інформацію, яку ви надаєте нам добровільно при реєстрації на нашому сайті, подачі заявки на навчання або підписці на розсилку. Це може включати ваше ім'я, електронну адресу, номер телефону та іншу контактну інформацію.`
    },
    {
      icon: Database,
      title: "Використання інформації",
      content: `Ми використовуємо зібрану інформацію для:\n• Обробки ваших заявок на навчання\n• Надання доступу до навчальних матеріалів\n• Відправлення важливих повідомлень про навчальний процес\n• Покращення якості наших послуг\n• Відповідей на ваші запитання`
    },
    {
      icon: Shield,
      title: "Захист даних",
      content: `Ми вживаємо відповідних технічних та організаційних заходів для захисту ваших персональних даних від несанкціонованого доступу, зміни, розкриття або знищення. Ваші дані зберігаються на захищених серверах з використанням сучасних методів шифрування.`
    },
    {
      icon: Eye,
      title: "Розкриття інформації",
      content: `Ми не продаємо, не обмінюємо та не передаємо вашу особисту інформацію третім особам без вашої згоди, за винятком випадків, передбачених законодавством України або необхідних для надання освітніх послуг.`
    },
    {
      icon: UserCheck,
      title: "Ваші права",
      content: `Ви маєте право:\n• Отримати доступ до своїх персональних даних\n• Виправити неточні дані\n• Видалити свої дані\n• Обмежити обробку даних\n• Заперечити проти обробки даних\n• Отримати копію своїх даних`
    },
    {
      icon: Mail,
      title: "Cookies та аналітика",
      content: `Наш сайт використовує cookies для покращення користувацького досвіду. Ми також використовуємо аналітичні сервіси (Google Analytics, Vercel Analytics) для збору статистики відвідувань та покращення функціональності сайту.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Shield className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Політика конфіденційності
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ми цінуємо вашу довіру та зобов'язуємось захищати вашу особисту інформацію
          </p>
          <p className="text-sm text-slate-500 mt-4">
            Остання оновлення: {new Date().toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Вступ</h2>
          <p className="text-slate-600 leading-relaxed">
            Ця Політика конфіденційності описує, як UEBSchool («ми», «нас», «наш») збирає, використовує та захищає персональну інформацію відвідувачів нашого веб-сайту та студентів. Використовуючи наш сайт, ви погоджуєтесь із практиками, описаними в цій політиці.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                  <section.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-lg mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">Зв'язок з нами</h2>
          <p className="mb-6 leading-relaxed">
            Якщо у вас є питання щодо цієї Політики конфіденційності або ви хочете скористатися своїми правами щодо персональних даних, будь ласка, зв'яжіться з нами:
          </p>
          <div className="space-y-2">
            <p><strong>Email:</strong> uebs0633444555@gmail.com</p>
            <p><strong>Телефон:</strong> +380 63 344 4555</p>
            <p><strong>Адреса:</strong> м. Рівне, Україна</p>
          </div>
        </motion.div>

        {/* Back Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            ← Повернутися на головну
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
