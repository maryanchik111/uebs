"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowRight, Bell } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useState, useEffect } from "react";

// Next upcoming lecture data
const nextLecture = {
  id: "christian-and-society",
  title: "Християнин і суспільство: покликання впливу",
  titleEn: "Christian and Society: The Calling of Influence",
  speaker: "Ігор Плохой",
  speakerEn: "Igor Plohoy",
  speakerPhoto: "/ihorplohoy.jpg",
  date: "2025-11-14",
  time: "19:00",
  description: "Християнин у силових структурах; Християнин у громадській діяльності;",
  descriptionEn: "Christian in law enforcement; Christian in public activities;",
  meetingLink: "", // Empty means no link available yet
  isLive: false
};

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

  const isUpcoming = () => {
    const lectureDate = new Date(`${nextLecture.date}T${nextLecture.time}`);
    return lectureDate > new Date();
  };

  const hasStreamLink = () => {
    return nextLecture.meetingLink && nextLecture.meetingLink !== "" && nextLecture.meetingLink !== "#";
  };

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
                {language === 'uk' ? nextLecture.description : nextLecture.descriptionEn}
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
                  <Clock className="w-5 h-5" />
                  <span>{nextLecture.time}</span>
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
                {isUpcoming() ? (
                  <>
                    {hasStreamLink() ? (
                      <Link href={nextLecture.meetingLink}>
                        <motion.button
                          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {t("lectures.next.join")}
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </Link>
                    ) : (
                      <motion.button
                        disabled
                        className="bg-white/50 text-slate-400 font-semibold px-6 py-3 rounded-lg cursor-not-allowed flex items-center gap-2 opacity-60"
                        title={t("lectures.next.link.unavailable")}
                      >
                        {t("lectures.next.join")}
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    )}
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
                  </>
                ) : (
                  <Link href="/lectures">
                    <motion.button
                      className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t("lectures.watch")}
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Speaker Photo */}
            <motion.div
              className="lg:col-span-1 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                <div className="w-48 h-48 rounded-full overflow-hidden backdrop-blur-sm border-4 border-white/30 shadow-2xl">
                  {nextLecture.speakerPhoto ? (
                    <Image
                      src={nextLecture.speakerPhoto}
                      alt={language === 'uk' ? nextLecture.speaker : nextLecture.speakerEn}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full bg-white/20 flex items-center justify-center">
                              <svg class="w-20 h-20 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                              </svg>
                            </div>
                          `;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-white/20 flex items-center justify-center">
                      <User className="w-20 h-20 text-white/60" />
                    </div>
                  )}
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
        </motion.div>
      </div>
    </section>
  );
}