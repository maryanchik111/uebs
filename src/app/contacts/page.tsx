"use client";

import { useState } from "react";
import Header from "../components/client/header";
import Link from "next/link";

export default function ApplyPage() {

  return (
    <>

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <section className="px-2">
              <img src="/logo-black.svg" alt="" />
              <h1 className="text-2xl font-bold text-slate-900">Контакти</h1>
              <p className="mt-2 text-slate-700">
                Номер телефону: +380 63 3 444 555<br />
                Пошта: uebs0633444555@gmail.com<br />
                Адреса: м. Рівне, вул. Уласа Самчука, 14<br />
              </p>

            </section>

            <aside className="px-4 border-l hidden md:block">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Інформація</h3>
                <p className="mt-2 text-sm text-slate-700">
                  📘 UEBSchool — Повна навчальна програма (50 навчальних зустрічей)
                     Мета: виховати зрілого, біблійно обґрунтованого, духовно зрілого служителя Ісуса Христа, який розуміє Писання, діє в любові й служінні, та несе світло Євангелія у сім’ю, Церкву і суспільство.
                </p>
              </div>

            </aside>
          </div>
        </div>
      </main>
    </>
  );
}