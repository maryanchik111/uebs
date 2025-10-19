"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-black.svg" alt="UEBSchool logo" width={140} height={56} priority />
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-slate-800">UEBSchool</div>
            <div className="text-xs text-slate-500 -mt-0.5">Біблійна школа • Рівне</div>
          </div>
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-slate-700 hover:text-slate-900 font-medium">
            Головна
          </Link>
          <Link href="/contact" className="text-slate-600 hover:text-slate-800">
            Контакти
          </Link>
          <Link
            href="/apply"
            className="inline-block px-3 py-2 bg-amber-500 text-slate-900 font-semibold rounded-md shadow-sm hover:scale-[1.02] transition-transform"
          >
            Записатися
          </Link>
        </nav>

        {/* mobile controls */}
        <div className="md:hidden flex items-center">
          <Link href="/apply" className="mr-3 px-3 py-2 bg-amber-400 text-slate-900 rounded-md text-sm font-semibold">
            Записатися
          </Link>

          <button
            aria-label="Відкрити меню"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-md inline-flex items-center justify-center text-slate-700 hover:bg-slate-100"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-[max-height,opacity] duration-300 ease-in-out origin-top overflow-hidden bg-white/95 border-t ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0 z-10"
        }`}
        aria-hidden={!open}
      >
        <div className="px-4 pt-3 pb-6 space-y-3 items-center flex flex-col">
          <Link href="/" onClick={() => setOpen(false)} className="block py-2 text-slate-800 font-medium">
            Головна
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="block py-2 text-slate-700">
            Контакти
          </Link>
          <Link
            href="/apply"
            onClick={() => setOpen(false)}
            className="block text-center mt-1 py-2 bg-amber-400 text-slate-900 rounded-md font-semibold w-full"
          >
            Записатися
          </Link>
        </div>
      </div>
    </header>
  );
}