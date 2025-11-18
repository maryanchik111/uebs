"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, CheckCircle, AlertCircle, Users, BookOpen, XCircle } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      icon: CheckCircle,
      title: "Ласкаво просимо!",
      content: `Використовуючи веб-сайт UEBSchool, ви приєднуєтесь до нашої дружньої спільноти студентів та викладачів. Ми раді бачити вас тут і сподіваємося, що ці прості правила допоможуть нам разом створити комфортне середовище для навчання та духовного зростання.`
    },
    {
      icon: Users,
      title: "Реєстрація",
      content: `• Будь ласка, вкажіть актуальну контактну інформацію при реєстрації\n• Бережіть свій пароль та не передавайте його іншим\n• Один обліковий запис — для одного студента\n• Якщо виникли проблеми з доступом, зв'яжіться з нами — ми завжди раді допомогти!`
    },
    {
      icon: BookOpen,
      title: "Навчальні матеріали",
      content: `Усі матеріали — лекції, конспекти, відео — створені з любов'ю для вашого навчання. Ви можете:\n• Використовувати їх для особистого вивчення Біблії\n• Ділитися ними з друзями, які також навчаються\n• Робити нотатки та конспекти\n\nПросимо лише:\n• Не використовувати матеріали в комерційних цілях\n• Зберігати посилання на авторство UEBSchool`
    },
    {
      icon: AlertCircle,
      title: "Атмосфера любові та поваги",
      content: `Ми створюємо простір, де кожен відчуває себе прийнятим:\n• Поважаймо один одного та викладачів\n• Спілкуймося з добротою та розумінням\n• Підтримуймо атмосферу взаємодопомоги\n• Пам'ятаймо про християнські цінності в усіх взаємодіях\n• Якщо виникли непорозуміння — давайте вирішувати їх у дусі миру`
    },
    {
      icon: XCircle,
      title: "Що варто знати",
      content: `Ми докладаємо всіх зусиль, щоб навчання було якісним і безперебійним, але:\n• Іноді можуть траплятися технічні збої — дякуємо за розуміння\n• Кожен студент навчається у своєму темпі — це нормально\n• Ми не несемо відповідальності за дії третіх осіб\n\nЯкщо щось пішло не так — просто напишіть нам, і ми разом знайдемо рішення!`
    },
    {
      icon: FileText,
      title: "Оновлення умов",
      content: `Час від часу ми можемо оновлювати ці правила, щоб зробити навчання ще кращим. Усі зміни публікуються на цій сторінці. Якщо у вас виникнуть запитання — ми завжди відкриті до діалогу і раді пояснити будь-які деталі.`
    }
  ];

  const additionalTerms = [
    {
      title: "Відвідування занять",
      items: [
        "Намагайтеся відвідувати заняття за розкладом — разом краще!",
        "Якщо не зможете прийти, повідомте нас — ми розуміємо, що життя буває непередбачуваним",
        "При систематичних пропусках ми зв'яжемося, щоб дізнатися, чи все гаразд і як можемо допомогти"
      ]
    },
    {
      title: "Домашні завдання",
      items: [
        "Виконуйте завдання у зручному для вас темпі — головне робити це регулярно",
        "Якщо щось незрозуміло, питайте — немає дурних питань!",
        "Намагайтеся виконувати роботи самостійно — це найкращий спосіб навчитися"
      ]
    },
    {
      title: "Сертифікат",
      items: [
        "Сертифікат отримують всі, хто пройшов програму з любов'ю та старанністю",
        "Для цього бажано відвідати більшість занять (близько 80%)",
        "Важливо виконати основні завдання курсу"
      ]
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <FileText className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Правила нашої спільноти
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Прості та дружелюбні правила, які допомагають нам разом зростати у вірі
          </p>
          <p className="text-sm text-slate-500 mt-4">
            Остання оновлення: {new Date().toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Main Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-xl flex-shrink-0">
                  <section.icon className="w-6 h-6 text-purple-600" />
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

        {/* Additional Terms */}
        <motion.div
          className="mt-12 bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Рекомендації для студентів</h2>
          <div className="space-y-6">
            {additionalTerms.map((term, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">{term.title}</h3>
                <ul className="space-y-2">
                  {term.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl shadow-lg mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">Є питання?</h2>
          <p className="mb-6 leading-relaxed">
            Якщо щось незрозуміло або потрібна допомога — просто напишіть або зателефонуйте. Ми завжди раді спілкуванню!
          </p>
          <div className="space-y-2">
            <p><strong>Email:</strong> uebs0633444555@gmail.com</p>
            <p><strong>Телефон:</strong> +380 63 344 4555</p>
            <p><strong>Адреса:</strong> м. Рівне, Україна</p>
          </div>
        </motion.div>

        {/* Agreement Notice */}
        <motion.div
          className="bg-amber-50 border border-amber-200 p-6 rounded-xl mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Головне</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ці правила створені не для обмежень, а щоб нам було комфортно навчатися разом. Якщо виникають питання чи складнощі — давайте обговоримо. Ми відкриті до діалогу та завжди готові знайти найкраще рішення для кожного студента. 💙
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            ← Повернутися на головну
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
