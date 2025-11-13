"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Clock, BookOpen, Users, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t } = useLanguage();

  const faqs = [
    {
      id: 1,
      question: t("faq.q1"),
      answer: t("faq.a1")
    },
    {
      id: 2,
      question: t("faq.q2"),
      answer: t("faq.a2")
    },
    {
      id: 3,
      question: t("faq.q3"),
      answer: t("faq.a3")
    },
    {
      id: 4,
      question: t("faq.q4"),
      answer: t("faq.a4")
    },
    {
      id: 5,
      question: t("faq.q5"),
      answer: t("faq.a5")
    },
    {
      id: 6,
      question: t("faq.q6"),
      answer: t("faq.a6")
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {t("faq.title")}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t("faq.subtitle")}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-6 mb-16">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-slate-900 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openFaq === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                </motion.div>
              </button>
              
              {openFaq === faq.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <div className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quick Info */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">{t("faq.schedule")}</h3>
            <p className="text-slate-600 text-sm">{t("contacts.class.schedule")}</p>
            <p className="text-slate-600 text-sm">{t("contacts.frequency")}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">{t("contacts.address")}</h3>
            <p className="text-slate-600 text-sm">м. Рівне</p>
            <p className="text-slate-600 text-sm">Україна</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Phone className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">{t("contacts.phone")}</h3>
            <p className="text-slate-600 text-sm">+380 63 344 4555</p>
            <p className="text-slate-600 text-sm">uebs0633444555@gmail.com</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}