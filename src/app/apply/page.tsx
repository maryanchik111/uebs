"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ApplyPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "Рівне",
    format: "очний",
    note: "",
  });
  const [status, setStatus] = useState<null | "idle" | "sending" | "success" | "error">("idle");
  const [showModal, setShowModal] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (showModal) {
      const t = setTimeout(() => setShowModal(false), 5000);
      return () => clearTimeout(t);
    }
  }, [showModal]);

  useEffect(() => {
    if (showModal) closeRef.current?.focus();
  }, [showModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ fullName: "", email: "", phone: "", city: "Рівне", format: "очний", note: "" });
        setShowModal(true);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <>
      <section
        style={{
        background:
          "rgba(2, 24, 40, 1)"
      }}
      >
        <main className="container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <section className="px-2">
                <img src="/logo-black.svg" alt="" />
                <h1 className="text-2xl font-bold text-slate-900">Записатися</h1>
                <p className="mt-2 text-slate-700">
                  Заповніть коротку заявку. Заняття у Рівному, вечірній формат,
                  2 рази на місяць.
                </p>

                <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">ПІБ</label>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300 text-black"
                      placeholder="Іван Іваненко"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300 text-black"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Телефон</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300 text-black"
                        placeholder="+380 63 000 0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">Місто</label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300 text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Формат</label>
                    <select
                      name="format"
                      value={form.format}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300 text-black"
                    >
                      <option value="очний">Очний (Рівне)</option>
                      <option value="онлайн">Онлайн</option>
                      <option value="змішаний">Змішаний</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Коротко про мотивацію (необов'язково)</label>
                    <textarea
                      name="note"
                      value={form.note}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300 text-black"
                      placeholder="Чому хочете пройти програму..."
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center justify-center px-4 py-2 bg-amber-500 text-slate-900 font-semibold rounded-md shadow-sm hover:scale-[1.02] transition-transform disabled:opacity-60 w-full"
                    >
                      {status === "sending" ? "Відправляємо..." : "Відправити заявку"}
                    </button>

                    <div className="text-sm text-slate-600">
                      {status === "error" && <span className="text-rose-600">Помилка. Перевірте поля та спробуйте знову.</span>}
                    </div>
                  </div>
                </form>
              </section>

              <aside className="px-4 border-l hidden md:block">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">Коротко про курс</h3>
                  <p className="mt-2 text-sm text-slate-700">
                    Повна програма — 50 зустрічей. Формат: вечірні заняття по 2 години. Теми: Основи віри, Біблійне дослідження,
                    учнівство, служіння, сім'я, церква та майбутнє.
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-700">Що потрібно</h4>
                  <ul className="mt-2 text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>Бажання вчитися і служити</li>
                    <li>Регулярна участь (2 рази на місяць)</li>
                    <li>Серце, відкрите до змін</li>
                  </ul>
                </div>

                <div className="text-sm text-slate-600">
                  Питання? <Link href="/contact" className="text-amber-500 font-semibold">Зв'яжіться з нами</Link>.
                </div>
              </aside>
            </div>
          </div>
        </main>
      </section>

      {/* SUCCESS MODAL */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
           <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6 z-10 flex flex-col items-center">
            <p className="text-[48px]">✅</p>
            <p className="text-sm text-green-500 mb-4 text-center">Ваша заявка надіслана.</p>
            <div className="flex justify-end gap-2">
              <button
                ref={closeRef}
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 items-center flex justify-center"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}