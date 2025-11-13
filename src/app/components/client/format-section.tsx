"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, Video, BookOpen, Heart, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useMemo } from "react";



const principles = [
  {
    icon: BookOpen,
    title: "Слово як основа",
    description: "Усе навчання базується на Святому Письмі. Кожна тема підкріплюється біблійними текстами та глибоким вивченням контексту.",
    verse: "2 Тим. 3:16-17"
  },
  {
    icon: Heart,
    title: "Дух Святий — наставник",
    description: "Навчання не обмежується теорією, а включає духовне формування через молитву та життя в присутності Божій.",
    verse: "Ів. 16:13"
  },
  {
    icon: Users,
    title: "Учень як місіонер",
    description: "Кожен студент готується не лише для особистого зростання, але й для служіння іншим у церкві та суспільстві.",
    verse: "Матв. 28:19-20"
  }
];

export default function FormatSection() {
  const { t, language } = useLanguage();

  const additionalInfo = useMemo(() => [
    {
      icon: Lightbulb,
      title: t("format.additional.interactive.title"),
      description: t("format.additional.interactive.description")
    },
    {
      icon: Users,
      title: t("format.additional.mentoring.title"),
      description: t("format.additional.mentoring.description")
    },
    {
      icon: BookOpen,
      title: t("format.additional.resources.title"),
      description: t("format.additional.resources.description")
    }
  ], [t]);

  const formatFeatures = useMemo(() => [
    {
      icon: Calendar,
      title: t("format.feature1.title"),
      description: t("format.feature1.desc"),
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Clock,
      title: t("format.feature2.title"),
      description: t("format.feature2.desc"),
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: MapPin,
      title: t("format.feature3.title"),
      description: t("format.feature3.desc"),
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Video,
      title: t("format.feature4.title"),
      description: t("format.feature4.desc"),
      color: "from-amber-500 to-orange-600"
    }
  ], [t, language]);
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Format Features */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {t("format.title")}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t("format.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {formatFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Principles Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Принципи навчання
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Три фундаментальні принципи, які лежать в основі всієї програми UEBSchool
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                className="bg-slate-50 p-8 rounded-2xl hover:bg-slate-100 transition-colors duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <principle.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900">{principle.title}</h4>
                    <span className="text-sm text-blue-600 font-medium">{principle.verse}</span>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-12 rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Чому обрати UEBSchool?</h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Ми не просто передаємо знання, а трансформуємо життя, розвиваємо характер та відкриваємо дію благодаті Святого Духа.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                  <info.icon className="w-8 h-8 text-amber-400" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{info.title}</h4>
                <p className="text-slate-300 leading-relaxed">{info.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-shadow duration-300">
              Дізнатися більше про вступ
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}