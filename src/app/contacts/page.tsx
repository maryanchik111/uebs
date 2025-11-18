"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Users, Building } from "lucide-react";
import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/language-context";

export default function ContactsPage() {
  const { t } = useLanguage();

  const contactInfo = useMemo(() => [
    {
      icon: MapPin,
      title: "Адреса",
      details: ["м. Рівне, Україна", "Центр міста"],
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Phone,
      title: "Телефон",
      details: ["+380 63 344 4555", "Пн-Пт: 9:00-18:00"],
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["uebs0633444555@gmail.com", "Основна пошта"],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Clock,
      title: "Розклад занять",
      details: ["П'ятниця: 19:00-22:00", "2 рази на місяць"],
      color: "from-amber-500 to-orange-600"
    }
  ], []);

  const faqItems = useMemo(() => [
    {
      question: t("faq.cost.question"),
      answer: t("faq.cost.answer")
    },
    {
      question: t("faq.experience.question"),
      answer: t("faq.experience.answer")
    },
    {
      question: t("faq.online.question"),
      answer: t("faq.online.answer")
    },
    {
      question: t("faq.duration.question"),
      answer: t("faq.duration.answer")
    }
  ], [t]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {t("contacts.title")}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t("contacts.subtitle")}
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center text-white mb-4`}>
                <info.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">{info.title}</h3>
              <div className="space-y-1">
                {info.details.map((detail, i) => (
                  <p key={i} className="text-slate-600 text-sm">{detail}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Send className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">{t("contacts.form.title")}</h2>
            </div>

            {isSubmitted && (
              <motion.div
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {t("contacts.form.success")}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    {t("contacts.form.name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder={t("contacts.form.name")}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    {t("contacts.form.email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  {t("contacts.form.subject")}
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">{t("contacts.form.select.placeholder")}</option>
                  <option value="admission">{t("contacts.form.select.admission")}</option>
                  <option value="program">{t("contacts.form.select.program")}</option>
                  <option value="schedule">{t("contacts.form.select.schedule")}</option>
                  <option value="technical">{t("contacts.form.select.technical")}</option>
                  <option value="other">{t("contacts.form.select.other")}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  {t("contacts.form.message")} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Опишіть ваше питання або повідомлення..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("contacts.form.sending")}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t("contacts.form.send")}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* FAQ and Additional Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* FAQ */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">{t("faq.title")}</h2>
              </div>

              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="border-b border-slate-200 pb-4 last:border-b-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <h3 className="font-semibold text-slate-900 mb-2">{item.question}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-6 h-6" />
                <h3 className="text-xl font-bold">Швидкий зв'язок</h3>
              </div>
              <p className="mb-6 text-blue-100">
                Потрібна негайна допомога або консультація? Зв'яжіться з нами прямо зараз!
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>+380 63 344 4555</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>uebs0633444555@gmail.com</span>
                </div>
              </div>
              <motion.button
                className="mt-6 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Зателефонувати зараз
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Location Map Placeholder */}
        <motion.div
          className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">{t("contacts.location.title")}</h2>
            </div>
            <div className="bg-slate-100 h-64 rounded-xl flex items-center justify-center">
              <div className="text-center text-slate-500">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg font-medium">{t("contacts.city")}</p>
                <p className="text-sm">{t("contacts.location.note")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}