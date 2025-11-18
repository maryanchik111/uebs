'use client';

import { usePathname } from 'next/navigation';
import { Home, GraduationCap, User, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { isUserAdmin } from '@/lib/user-utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      isUserAdmin(user.uid).then(setIsAdmin);
    }
  }, [user]);

  // Don't show navbar on login/register pages or if not logged in
  if (!user || pathname === '/login' || pathname === '/register') {
    return null;
  }

  const isActive = (path: string) => {
    if (path === '/cabinet') {
      return pathname === '/cabinet';
    }
    return pathname === path;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
      <div className={`grid ${isAdmin ? 'grid-cols-4' : 'grid-cols-3'} gap-1 px-2 py-2`}>
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
            isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Головна</span>
        </Link>
        
        <Link
          href="/lectures"
          className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
            isActive('/lectures') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <GraduationCap className="w-6 h-6" />
          <span className="text-xs mt-1">Лекції</span>
        </Link>
        
        <Link
          href="/cabinet"
          className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
            isActive('/cabinet') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Кабінет</span>
        </Link>
        
        {isAdmin && (
          <Link
            href="/admin"
            className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
              isActive('/admin') || pathname.startsWith('/admin/') ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Shield className="w-6 h-6" />
            <span className="text-xs mt-1">Адмін</span>
          </Link>
        )}
      </div>
    </div>
  );
}
