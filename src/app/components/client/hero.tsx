"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronDown, BookOpen, Heart, Users, Play, Star, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const controls = useAnimation();
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const stats = useMemo(() => [
    { label: t("hero.meetings"), value: "50+", icon: Calendar },
    { label: t("hero.hours"), value: "150+", icon: Clock },
    { label: t("hero.time"), value: "19–22", icon: Star },
    { label: t("hero.format"), value: t("hero.format.frequency"), icon: Users }
  ], [t, language]);

  const pillars = useMemo(() => [
    { icon: BookOpen, title: t("hero.word"), desc: t("hero.word.desc"), color: "from-amber-400 to-yellow-500" },
    { icon: Heart, title: t("hero.spirit"), desc: t("hero.spirit.desc"), color: "from-rose-400 to-pink-500" },
    { icon: Users, title: t("hero.service"), desc: t("hero.service.desc"), color: "from-sky-400 to-blue-500" }
  ], [t, language]);

  useEffect(() => {
    controls.start("visible");
    setIsMounted(true);
  }, [controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.15 } }
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20"
      initial="hidden"
      animate={controls}
      variants={container}
    >
      {/* ── Deep navy / charcoal background ── */}
      <div className="absolute inset-0 bg-[#0f172a]" />

      {/* Subtle radial glows for depth */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      {/* Elegant texture pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 w-full text-center">
        <motion.div className="flex flex-col items-center space-y-10" variants={item}>

          {/* Logo with subtle glow */}
          <motion.div
            className="w-48 h-12 relative drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            whileHover={{ scale: 1.02 }}
          >
            <Image src="/logo-white.svg" alt="UEBSchool Logo" fill className="object-contain" priority />
          </motion.div>

          {/* Scripture / Motto Badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-amber-400/30 bg-amber-400/5 text-amber-200/90 text-sm font-medium backdrop-blur-sm"
            variants={item}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="tracking-wide">
              {language === "uk"
                ? "«Пізнайте Слово — і Слово звільнить вас»"
                : "«Know the Word — and the Word will set you free»"}
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-6">
            <motion.h1
              className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
              variants={item}
              dangerouslySetInnerHTML={{ __html: t("hero.title") }}
            />
            <motion.p
              className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium"
              variants={item}
            >
              {t("hero.subtitle")}
            </motion.p>
          </div>

          {/* Actions */}
          <motion.div className="flex flex-wrap justify-center gap-5 pt-4" variants={item}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/apply"
                className="inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl font-bold text-[#0f172a] bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_10px_40px_-10px_rgba(251,191,36,0.5)] hover:from-amber-300 hover:to-amber-400 transition-all duration-300"
              >
                <Play className="w-5 h-5 fill-current" />
                {t("hero.apply")}
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#program"
                className="inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl font-bold text-white border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                {t("hero.learn")}
                <ArrowRight className="w-5 h-5 text-white/50" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Bar - Refined academic style */}
          <motion.div
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 pt-12"
            variants={item}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors group"
              >
                <div className="p-3 rounded-xl bg-amber-400/10 mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Enrollment Badge */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-bold"
            variants={item}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            {language === "uk" ? "Набір на 2025-2026 відкрито" : "2025-2026 Enrollment Open"}
          </motion.div>

        </motion.div>
      </div>

      {/* Down arrow */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </motion.div>
    </motion.section>
  );
}