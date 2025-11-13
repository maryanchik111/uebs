"use client";

import { motion } from "framer-motion";
import { Star, Quote, User, MapPin } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Андрій Коваленко",
    role: "Пастор місцевої церкви",
    location: "Рівне",
    rating: 5,
    text: "UEBSchool кардинально змінила мій підхід до служіння. Глибоке вивчення Слова та практичні навички лідерства допомогли мені стати кращим пастором для своєї громади.",
    image: "/testimonial-1.jpg"
  },
  {
    id: 2,
    name: "Марія Петренко",
    role: "Служитель молодіжного служіння",
    location: "Рівне",
    rating: 5,
    text: "Програма навчання допомогла мені зрозуміти своє покликання та оснастила необхідними інструментами для роботи з молоддю. Кожне заняття було наповнене практичною мудрістю.",
    image: "/testimonial-2.jpg"
  },
  {
    id: 3,
    name: "Олексій Сидоренко",
    role: "Вчитель недільної школи",
    location: "Рівне",
    rating: 5,
    text: "Завдяки UEBSchool я навчився не просто читати Біблію, а досліджувати її в контексті. Це допомагає мені готувати глибокі та змістовні уроки для дітей та дорослих.",
    image: "/testimonial-3.jpg"
  },
  {
    id: 4,
    name: "Катерина Мельник",
    role: "Координатор соціального служіння",
    location: "Рівне",
    rating: 5,
    text: "Навчання в UEBSchool показало мені, як християнська віра може трансформувати суспільство. Тепер я з впевненістю веду проекти допомоги нужденним.",
    image: "/testimonial-4.jpg"
  },
  {
    id: 5,
    name: "Василь Іваненко",
    role: "Місіонер",
    location: "Рівне",
    rating: 5,
    text: "Програма дала мені міцну богословську основу та практичні навички євангелізації. Тепер я з впевненістю ділюся Євангелієм у різних культурних контекстах.",
    image: "/testimonial-5.jpg"
  },
  {
    id: 6,
    name: "Ірина Волошина",
    role: "Сімейний консультант",
    location: "Рівне",
    rating: 5,
    text: "Розділ про християнську сім'ю був особливо цінним. Отримані знання допомагають мені консультувати подружні пари та будувати міцні відносини в своїй родині.",
    image: "/testimonial-6.jpg"
  }
];

const stats = [
  { number: "200+", label: "Випускників", description: "за 15 років існування" },
  { number: "95%", label: "Активних служителів", description: "серед випускників" },
  { number: "15+", label: "Років досвіду", description: "у підготовці лідерів" },
  { number: "50+", label: "Церков", description: "де служать наші випускники" }
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Історії наших випускників
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Дізнайтеся, як навчання в UEBSchool змінило життя та служіння наших студентів
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-slate-900 mb-1">{stat.label}</div>
              <div className="text-sm text-slate-600">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-4 left-8 opacity-20">
              <Quote className="w-24 h-24" />
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl lg:text-2xl font-light leading-relaxed mb-8">
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </blockquote>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
                    <div className="text-blue-200">{testimonials[currentTestimonial].role}</div>
                    <div className="flex items-center gap-1 text-blue-300 text-sm">
                      <MapPin className="w-4 h-4" />
                      {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                ←
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                →
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-slate-300" />
              </div>
              
              <p className="text-slate-700 leading-relaxed mb-6">&ldquo;{testimonial.text}&rdquo;</p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Станьте частиною нашої спільноти
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Приєднуйтесь до сотень випускників, які вже змінюють світ навколо себе
          </p>
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Подати заявку на навчання
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}