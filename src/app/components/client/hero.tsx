"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronDown, BookOpen, Heart, Users, Play, Star, Calendar, Clock, User, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";

export default function Hero() {

  const [isMounted, setIsMounted] = useState(false);
  const controls = useAnimation();
  const { t, language } = useLanguage();
  const { user, userProfile } = useAuth();

  // Generate consistent positions
  const backgroundElements = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      left: (i * 17 + 23) % 100, // Consistent positions
      top: (i * 31 + 47) % 100
    })), []
  );

  const features = useMemo(() => [
    {
      icon: BookOpen,
      title: t("hero.word"),
      description: t("hero.word.desc")
    },
    {
      icon: Heart,
      title: t("hero.spirit"),
      description: t("hero.spirit.desc")
    },
    {
      icon: Users,
      title: t("hero.service"),
      description: t("hero.service.desc")
    }
  ], [t, language]);

  const stats = useMemo(() => [
    { label: t("hero.meetings"), value: "50", icon: Calendar },
    { label: t("hero.hours"), value: "150+", icon: Clock },
    { label: t("hero.time"), value: "19-22", icon: Star },
    { label: t("hero.format"), value: t("hero.format.frequency"), icon: Users }
  ], [t, language]);

  const slides = useMemo(() => [
    {
      image: "/hero.jpeg",
      title: language === "uk" ? "UEBSchool • Рівне" : "UEBSchool • Rivne",
      subtitle: t("hero.schedule")
    }
  ], [t]);

  useEffect(() => {
    controls.start("visible");
    setIsMounted(true);
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 gradient-hero"></div>
      
      {/* Animated background elements */}
      {isMounted && (
        <div className="absolute inset-0 opacity-10">
          {backgroundElements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${element.left}%`,
                top: `${element.top}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + (element.id % 3),
                repeat: Infinity,
                delay: element.id * 0.1,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div
              className="space-y-6"
              variants={itemVariants}
            >
              <motion.div
                className="w-48 h-12 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/logo-white.svg"
                  alt="UEBSchool Logo"
                  fill
                  className="object-contain"
                />
              </motion.div>

              <motion.h1
                className="text-4xl lg:text-6xl font-bold text-white leading-tight"
                variants={itemVariants}
                dangerouslySetInnerHTML={{ __html: t("hero.title") }}
              />

              <motion.p
                className="text-xl text-white/90 leading-relaxed max-w-2xl"
                variants={itemVariants}
              >
                {t("hero.subtitle")}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Play className="w-5 h-5" />
                    {t("hero.apply")}
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#program"
                    className="inline-flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    <BookOpen className="w-5 h-5" />
                    {t("hero.learn")}
                  </Link>
                </motion.div>

                {/* Cabinet button on mobile */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="md:hidden relative inline-block">
                  <Link
                    href={user ? "/cabinet" : "/login"}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {user ? <User className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                    {user ? "Кабінет" : "Увійти"}
                  </Link>
                  {user && userProfile && (userProfile.notifications?.filter(n => !n.read).length > 0 || userProfile.homework?.filter(h => !h.completed).length > 0) && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-2 z-10 shadow-lg">
                      {(userProfile.notifications?.filter(n => !n.read).length || 0) + (userProfile.homework?.filter(h => !h.completed).length || 0)}
                    </span>
                  )}
                </motion.div>
              </motion.div>

              {/* Key features */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
                variants={itemVariants}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="glass-dark p-6 rounded-xl text-center"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-8 h-8 mx-auto mb-3 text-amber-400" />
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right content - Visual card */}
          <motion.div
            className="relative"
            variants={itemVariants}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="glass p-8 rounded-3xl shadow-2xl backdrop-blur-md">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/hero.jpeg"
                  alt="UEBSchool навчання"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="font-semibold text-lg">UEBSchool • Рівне</div>
                  <div className="text-white/90 text-sm">{t("hero.schedule")}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-white/90">
                  <div className="font-semibold mb-2">{t("hero.format.desc")}</div>
                  <div className="text-white/70 text-sm leading-relaxed">
                    {t("hero.program.desc")}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center p-3 glass-dark rounded-lg"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                    >
                      <stat.icon className="w-6 h-6 mx-auto mb-1 text-amber-400" />
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-white/70 text-xs">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </div>
    </motion.section>
  );
}