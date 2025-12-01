"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowRight, Bell } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useState, useEffect } from "react";

// All lectures data
const lectures = [
  {
    id: "character-of-god",
    title: "«ХАРАКТЕР БОГА» — ЄВАНГЕЛІСТ-МУЗИКАНТ ОЛЕГ НАЗАРЧУК",
    titleEn: "«CHARACTER OF GOD» — EVANGELIST-MUSICIAN OLEG NAZARCHUK",
    speaker: "Олег Назарчук",
    speakerEn: "Oleg Nazarchuk",
    date: "2025-10-24",
    youtubeId: "d1fM8Fl52qc",
  },
  {
    id: "to-ephesians",
    title: "«ОГЛЯД ПОСЛАННЯ ДО ЄФЕСЯН» — КРУКОВСЬКИЙ ВОЛОДИМИР",
    titleEn: "«OVERVIEW OF EPHESIANS» — KRUKOVSKY VOLODYMYR",
    speaker: "Володимир Круковський",
    speakerEn: "Volodymyr Krukovsky",
    date: "2025-11-07",
    youtubeId: "DN7ZAsYSq2s",
  },
  {
    id: "believers-political-participation",
    title: "«УЧАСТЬ ВІРУЮЧИХ У ПОЛІТИЧНОМУ ПРОЦЕСІ ДЕРЖАВИ» — ІГОР ПЛОХОЙ",
    titleEn: "«BELIEVERS' PARTICIPATION IN THE STATE'S POLITICAL PROCESS» — IGOR PLOKHY",
    speaker: "Ігор Плохой",
    speakerEn: "Igor Plokhy",
    date: "2025-11-16",
    youtubeId: "XDRty1ClGjE",
  },
  {
    id: "civic-position-believers-power-functions",
    title: "«ГРОМАДЯНСЬКА ПОЗИЦІЯ ВІРУЮЧИХ ТА ФУНКЦІЇ ВЛАДИ» — ІГОР ПЛОХОЙ",
    titleEn: "«CIVIC POSITION OF BELIEVERS AND FUNCTIONS OF POWER» — IGOR PLOKHY",
    speaker: "Ігор Плохой",
    speakerEn: "Igor Plokhy",
    date: "2025-11-16",
    youtubeId: "0ak_EHjpIYA",
  },
  {
    id: "called-to-be-leader",
    title: "«ПОКЛИКАНИЙ БУТИ ЛІДЕРОМ» — ТИМОНІШИН АНТОН",
    titleEn: "«CALLED TO BE A LEADER» — TIMONISHIN ANTON",
    speaker: "Тимонішин Антон",
    speakerEn: "Timonishin Anton",
    date: "2025-11-22",
    youtubeId: "1DFuvUa-8NQ",
  }
];

export default function NextLectureSection() {
  const { t, language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!isMounted) {
      // Return a consistent format during SSR
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}.${month.toString().padStart(2, '0')}.${year}`;
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'uk' ? 'uk-UA' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getNextLecture = () => {
    const now = new Date();
    const futureAndPastLectures = lectures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const nextLecture = futureAndPastLectures.find(l => new Date(l.date) > now);
    return nextLecture || null;
  };

  const nextLecture = getNextLecture();

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {nextLecture ? (
            // Next lecture exists
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Content */}
              <div className="lg:col-span-2">
                <motion.div
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white/90 font-medium uppercase tracking-wide text-sm">
                    {t("lectures.next.title")}
                  </span>
                </motion.div>

                <motion.h2
                  className="text-3xl lg:text-4xl font-bold text-white mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {language === 'uk' ? nextLecture.title : nextLecture.titleEn}
                </motion.h2>

                <motion.p
                  className="text-white/80 text-lg mb-6 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {language === 'uk' ? nextLecture.speaker : nextLecture.speakerEn}
                </motion.p>

                {/* Meta Info */}
                <motion.div
                  className="flex flex-wrap gap-6 mb-8 text-white/90"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(nextLecture.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>{language === 'uk' ? nextLecture.speaker : nextLecture.speakerEn}</span>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Link href={`/lectures/${nextLecture.id}`}>
                    <motion.button
                      className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t("lectures.watch")}
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <a 
                    href="https://t.me/uebschool" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      className="border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bell className="w-5 h-5" />
                      {t("lectures.next.remind")}
                    </motion.button>
                  </a>
                </motion.div>
              </div>

              {/* Speaker Info */}
              <motion.div
                className="lg:col-span-1 flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative">
                  <div className="w-48 h-48 rounded-full overflow-hidden backdrop-blur-sm border-4 border-white/30 shadow-2xl bg-white/10 flex items-center justify-center">
                    <User className="w-20 h-20 text-white/60" />
                  </div>
                  {/* Speaker name badge */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 shadow-lg">
                    <span className="text-slate-800 font-medium text-sm">
                      {language === 'uk' ? nextLecture.speaker : nextLecture.speakerEn}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            // No next lecture scheduled
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {language === 'uk' ? 'Наступна лекція не запланована' : 'Next lecture not scheduled'}
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  {language === 'uk' 
                    ? 'Наразі у нас немає запланованої наступної лекції, але ви можете переглянути архів всіх попередніх лекцій.'
                    : 'There is no scheduled next lecture at the moment, but you can view the archive of all previous lectures.'
                  }
                </p>
                <Link href="/lectures">
                  <motion.button
                    className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors inline-flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("lectures.watch")}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}