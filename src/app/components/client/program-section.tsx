"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, Heart, Users, Crown, Home, Church, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { programTranslations } from "@/contexts/program-translations";

export default function ProgramSection() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const { t, language } = useLanguage();

  const programSections = [
    {
      id: 1,
      title: t("program.faith.title"),
      subtitle: t("program.faith.subtitle"),
      icon: BookOpen,
      color: "from-blue-500 to-indigo-600",
      lessons: programTranslations[language]["program.faith.lessons"]
    },
    {
      id: 2,
      title: t("program.bible.title"),
      subtitle: t("program.bible.subtitle"),
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600",
      lessons: programTranslations[language]["program.bible.lessons"]
    },
    {
      id: 3,
      title: t("program.spiritual.title"),
      subtitle: t("program.spiritual.subtitle"),
      icon: Heart,
      color: "from-purple-500 to-pink-600",
      lessons: programTranslations[language]["program.spiritual.lessons"]
    },
    {
      id: 4,
      title: t("program.leadership.title"),
      subtitle: t("program.leadership.subtitle"),
      icon: Crown,
      color: "from-amber-500 to-orange-600",
      lessons: programTranslations[language]["program.leadership.lessons"]
    },
    {
      id: 5,
      title: t("program.family.title"),
      subtitle: t("program.family.subtitle"),
      icon: Home,
      color: "from-rose-500 to-red-600",
      lessons: programTranslations[language]["program.family.lessons"]
    },
    {
      id: 6,
      title: t("program.church.title"),
      subtitle: t("program.church.subtitle"),
      icon: Church,
      color: "from-indigo-500 to-purple-600",
      lessons: programTranslations[language]["program.church.lessons"]
    },
    {
      id: 7,
      title: t("program.prophetic.title"),
      subtitle: t("program.prophetic.subtitle"),
      icon: Zap,
      color: "from-yellow-500 to-amber-600",
      lessons: programTranslations[language]["program.prophetic.lessons"]
    }
  ];

  const toggleSection = (sectionId: number) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  return (
    <section id="program" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {t("program.title")}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t("program.subtitle")}
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50</div>
              <div className="text-slate-600">{t("program.meetings")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">100+</div>
              <div className="text-slate-600">{t("program.hours")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">7</div>
              <div className="text-slate-600">{t("program.sections")}</div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {programSections.map((section, index) => (
            <motion.div
              key={section.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.button
                className="w-full p-6 text-left focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                onClick={() => toggleSection(section.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color} text-white`}>
                      <section.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                      <p className="text-slate-600 mt-1">{section.subtitle}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openSection === section.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {openSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="bg-slate-50 p-6 rounded-xl">
                        <ol className="space-y-3">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <motion.li
                              key={lessonIndex}
                              className="flex items-start gap-3 text-slate-700"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: lessonIndex * 0.05 }}
                            >
                              <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${section.color} text-white text-sm font-semibold flex items-center justify-center mt-0.5`}>
                                {lessonIndex + 1}
                              </span>
                              <span className="leading-relaxed">{lesson}</span>
                            </motion.li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Готові розпочати своє духовне навчання?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Приєднуйтесь до нашої спільноти учнів та розпочніть подорож духовного зростання вже сьогодні.
            </p>
            <motion.button
              className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Записатися на навчання
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}