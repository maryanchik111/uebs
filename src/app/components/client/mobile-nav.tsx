'use client';

import { usePathname } from 'next/navigation';
import { Home, GraduationCap, User, Shield, Menu, X, Phone, MapPin, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { isUserAdmin } from '@/lib/user-utils';
import { useLanguage } from '@/contexts/language-context';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function MobileNav() {
  const pathname = usePathname();
  const { user, userProfile } = useAuth();
  const { t } = useLanguage();
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      isUserAdmin(user.uid).then(setIsAdmin);
    }
  }, [user]);

  // Don't show navbar on login/register pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  const isActive = (path: string) => {
    if (path === '/cabinet') {
      return pathname === '/cabinet';
    }
    return pathname === path;
  };

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.lectures"), href: "/lectures" },
    { name: t("contacts.faq"), href: "/faq" },
    { name: t("nav.contacts"), href: "/contacts" },
  ];

  return (
    <>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="md:hidden fixed bottom-16 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 max-h-[70vh] overflow-y-auto"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Меню</h3>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-4 text-slate-800 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {!user && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navigation.length * 0.05 }}
                >
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-3 px-4 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Вхід
                  </Link>
                </motion.div>
              )}

              {!user && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (navigation.length + 1) * 0.05 }}
                >
                  <Link
                    href="/apply"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg text-center hover:shadow-lg transition-all"
                  >
                    {t("nav.apply")}
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
                    <span>+380 63 344 4555</span>
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

      {/* Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
        <div className="flex justify-around items-center px-2 py-2">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-2 px-3 transition-colors ${
              isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Головна</span>
          </Link>
          
          <Link
            href="/lectures"
            className={`flex flex-col items-center justify-center py-2 px-3 transition-colors ${
              isActive('/lectures') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <GraduationCap className="w-6 h-6" />
            <span className="text-xs mt-1">Лекції</span>
          </Link>
          
          {user ? (
            <Link
              href="/cabinet"
              className={`flex flex-col items-center justify-center py-2 px-3 transition-colors ${
                isActive('/cabinet') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <div className="relative inline-block">
                <User className="w-6 h-6" />
                {userProfile && (userProfile.notifications?.filter(n => !n.read).length > 0 || userProfile.homework?.filter(h => !h.completed).length > 0) && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 z-10">
                    {(userProfile.notifications?.filter(n => !n.read).length || 0) + (userProfile.homework?.filter(h => !h.completed).length || 0)}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 truncate max-w-[60px]">{user.displayName || user.email?.split('@')[0] || 'Кабінет'}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex flex-col items-center justify-center py-2 px-3 transition-colors text-gray-600 hover:text-blue-600"
            >
              <LogIn className="w-6 h-6" />
              <span className="text-xs mt-1">Увійти</span>
            </Link>
          )}
          
          {user && isAdmin && (
            <Link
              href="/admin"
              className={`flex flex-col items-center justify-center py-2 px-3 transition-colors ${
                isActive('/admin') || pathname.startsWith('/admin/') ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <Shield className="w-6 h-6" />
              <span className="text-xs mt-1">Адмін</span>
            </Link>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex flex-col items-center justify-center py-2 px-3 transition-colors ${
              menuOpen ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            <span className="text-xs mt-1">Меню</span>
          </button>
        </div>
      </div>
    </>
  );
}
