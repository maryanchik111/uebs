"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, MapPin, User, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./language-switcher";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const { user, userProfile } = useAuth();

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.lectures"), href: "/lectures" },
    { name: t("nav.about"), href: "/about" },
    { name: t("contacts.faq"), href: "/faq" },
    { name: t("nav.contacts"), href: "/contacts" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href="/" className="flex items-center gap-2 md:gap-3">
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-slate-800">
                  UEBSchool
                </div>
                <div className="text-xs -mt-0.5 text-slate-500">
                  Біблійна школа • Рівне
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="font-medium text-slate-700 hover:text-blue-600 transition-colors duration-300 hover:scale-105 transform"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-4 text-sm">
              <motion.div
                className="flex items-center gap-2 text-slate-600"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden xl:block">Рівне</span>
              </motion.div>
              <LanguageSwitcher scrolled={true} />
            </div>

            {user ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-block"
              >
                <Link
                  href="/cabinet"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  Кабінет
                </Link>
                {userProfile && (userProfile.notifications?.filter(n => !n.read).length > 0 || userProfile.homework?.filter(h => !h.completed).length > 0) && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 z-10 shadow-lg">
                    {(userProfile.notifications?.filter(n => !n.read).length || 0) + (userProfile.homework?.filter(h => !h.completed).length || 0)}
                  </span>
                )}
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 md:gap-3"
              >
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-slate-700 font-medium px-4 py-2 hover:text-blue-600 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Вхід</span>
                </Link>
                <Link
                  href="/apply"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t("nav.apply")}
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Actions & Menu Button */}
          <div className="lg:hidden flex items-center gap-2 md:gap-3">
            {user ? (
              <Link
                href="/cabinet"
                className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg"
              >
                <User className="w-5 h-5" />
                {userProfile && (userProfile.notifications?.filter(n => !n.read).length > 0 || userProfile.homework?.filter(h => !h.completed).length > 0) && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {(userProfile.notifications?.filter(n => !n.read).length || 0) + (userProfile.homework?.filter(h => !h.completed).length || 0)}
                  </span>
                )}
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-slate-700 hover:text-blue-600 p-2"
              >
                <LogIn className="w-6 h-6" />
              </Link>
            )}

            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200"
          >
            <div className="px-6 py-6 space-y-4">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-slate-800 font-medium hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {!user && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
                >
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Вхід
                  </Link>
                </motion.div>
              )}

              <motion.div
                className="pt-4 border-t border-slate-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="flex flex-col gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+380 XX XXX XXXX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>м. Рівне</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}