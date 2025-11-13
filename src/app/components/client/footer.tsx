"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useState } from "react";

const navigation = {
  main: [
    { name: "Головна", href: "/" },
    { name: "Програма навчання", href: "#program" },
    { name: "Контакти", href: "/contacts" },
  ],
  support: [
    { name: "Подати заявку", href: "/apply" },
    { name: "Часті питання", href: "/faq" },
  ],
  legal: [
    { name: "Політика конфіденційності", href: "/privacy" },
    { name: "Умови використання", href: "/terms" },
    { name: "Правила навчання", href: "/rules" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Instagram", href: "#", icon: Instagram },
];

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigationLinks = {
    main: [
      { name: t("nav.home"), href: "/" },
      { name: t("nav.lectures"), href: "/lectures" },
      { name: t("nav.contacts"), href: "/contacts" },
    ],
    support: [
      { name: t("nav.apply"), href: "/apply" },
      { name: t("contacts.faq"), href: "/faq" },
    ],
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting newsletter:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <div className="relative w-48 h-12 mb-4">
                <Image
                  src="/logo-white.svg"
                  alt="UEBSchool"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-slate-300 leading-relaxed">
                Духовно‑освітнє середовище, де Слово Боже, молитва та спільність формують зрілих служителів.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>м. Рівне, Україна</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>+380 63 344 4555</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>uebs0633444555@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Навігація</h3>
            <ul className="space-y-3">
              {navigationLinks.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Підтримка</h3>
            <ul className="space-y-3">
              {navigationLinks.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">{t("footer.newsletter")}</h3>
            <p className="text-slate-300 mb-4">
              {t("footer.newsletter.text")}
            </p>
            {isSubmitted && (
              <motion.div
                className="mb-4 p-3 bg-green-600/20 border border-green-500/30 rounded-lg text-green-300 text-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {t("footer.newsletter.success")}
              </motion.div>
            )}
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.newsletter.email")}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("footer.newsletter.subscribing")}
                  </>
                ) : (
                  t("footer.newsletter.subscribe")
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-6 mt-12 pt-8 border-t border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              className="w-12 h-12 bg-slate-800 hover:bg-amber-500 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} UEBSchool. Всі права захищені.
          </p>
          
          <div className="flex flex-wrap gap-6 mt-4 md:mt-0">
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-400 hover:text-amber-400 text-sm transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Decorative Element */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent opacity-50"></div>
      </div>
    </footer>
  );
}