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
  const { user } = useAuth();

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.lectures"), href: "/lectures" },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/98 backdrop-blur-lg shadow-xl border-b border-slate-200/50" 
          : "bg-white/90 backdrop-blur-md shadow-lg"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-36 h-10">
                <Image
                  src={scrolled ? "/logo-black.svg" : "/logo-white.svg"}
                  alt="UEBSchool logo"
                  fill
                  className="object-contain transition-opacity duration-300"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <div className={cn(
                  "text-sm font-semibold transition-colors duration-300",
                  scrolled ? "text-slate-800" : "text-white"
                )}>
                  UEBSchool
                </div>
                <div className={cn(
                  "text-xs -mt-0.5 transition-colors duration-300",
                  scrolled ? "text-slate-500" : "text-white/80"
                )}>
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
                  className={cn(
                    "font-medium transition-colors duration-300 hover:scale-105 transform",
                    scrolled 
                      ? "text-slate-700 hover:text-blue-600" 
                      : "text-white/90 hover:text-white"
                  )}
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
                className={cn(
                  "flex items-center gap-2 transition-colors duration-300",
                  scrolled ? "text-slate-600" : "text-white/80"
                )}
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:block">+380 63 344 4555</span>
              </motion.div>
              <motion.div
                className={cn(
                  "flex items-center gap-2 transition-colors duration-300",
                  scrolled ? "text-slate-600" : "text-white/80"
                )}
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden xl:block">Рівне</span>
              </motion.div>
              <LanguageSwitcher scrolled={scrolled} />
            </div>

            {user ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/cabinet"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  Кабінет
                </Link>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3"
              >
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-slate-700 font-medium px-4 py-2 hover:text-blue-600 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Вхід
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            {user ? (
              <Link
                href="/cabinet"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Кабінет
              </Link>
            ) : (
              <Link
                href="/apply"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold px-4 py-2 rounded-lg text-sm"
              >
                {t("nav.apply")}
              </Link>
            )}

            <button
              onClick={() => setOpen(!open)}
              className={cn(
                "p-2 rounded-lg transition-colors duration-300",
                scrolled 
                  ? "text-slate-700 hover:bg-slate-100" 
                  : "text-white hover:bg-white/10"
              )}
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