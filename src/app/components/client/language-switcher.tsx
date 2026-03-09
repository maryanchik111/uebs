"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface LanguageSwitcherProps {
  scrolled?: boolean;
}

export default function LanguageSwitcher({ scrolled = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "uk", name: "Укр", flag: "🇺🇦" },
    { code: "en", name: "Eng", flag: "🇺🇸" }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${scrolled
            ? "text-slate-700 hover:bg-slate-100"
            : "text-white hover:bg-white/10"
          }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline text-sm">{currentLanguage?.name}</span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
        >
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as "uk" | "en");
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${language === lang.code ? "bg-blue-50 text-blue-600" : "text-gray-700"
                }`}
              whileHover={{ backgroundColor: "rgb(249 250 251)" }}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
              {language === lang.code && (
                <span className="ml-auto text-blue-600 text-sm">✓</span>
              )}
            </motion.button>
          ))}
        </motion.div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}