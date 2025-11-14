"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "uk" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  uk: {
    // Navigation
    "nav.home": "Головна",
    "nav.program": "Програма",
    "nav.contacts": "Контакти",
    "nav.lectures": "Лекції",
    "nav.apply": "Записатися",
    
    // Hero Section
    "hero.title": "UEBSchool — <span class=\"bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent\">Біблійна школа</span> в Рівному",
    "hero.subtitle": "Духовно‑освітнє середовище, де Слово Боже, молитва та спільність формують зрілих служителів — носіїв світла, правди й благодаті. Заняття вечорами, 2 рази на місяць.",
    "hero.apply": "Записатися зараз",
    "hero.learn": "Дізнатися більше",
    "hero.word": "СЛОВО",
    "hero.word.desc": "Усе навчання укорінене в Святому Письмі — щоб жити й служити згідно з Божою волею.",
    "hero.spirit": "ДУХ",
    "hero.spirit.desc": "Напрямок практики та формування характеру через життя під керівництвом Духа Святого.",
    "hero.service": "СЛУЖІННЯ",
    "hero.service.desc": "Підготовка для практичного служіння в церкві, сім'ї та громаді — служити з любов'ю та істинністю.",
    "hero.meetings": "Зустрічей за рік",
    "hero.hours": "Годин навчання",
    "hero.time": "Час занять",
    "hero.format": "Формат",
    "hero.format.frequency": "2x/міс",
    "hero.schedule": "50 зустрічей · 19:00-22:00",
    "hero.format.desc": "Формат — очний / змішаний",
    "hero.program.desc": "Програма: Основи віри, служіння, лідерство та практика. Підготовка для служіння в церкві й громаді.",
    
    // Format Section
    "format.title": "Формати навчання",
    "format.subtitle": "Оберіть зручний для вас формат участі в UEBSchool",
    "format.inperson": "Очне навчання",
    "format.inperson.desc": "19:00 - 22:00, зручно після роботи",
    "format.online": "Онлайн навчання",
    "format.online.desc": "Участь через відеозв'язок з будь-якої точки",
    "format.mixed": "Змішаний формат",
    "format.mixed.desc": "Комбінація очного та онлайн навчання",
    
    // Format Features
    "format.feature1.title": "2 рази на місяць",
    "format.feature1.desc": "Заняття кожні два тижні у п'ятницю",
    "format.feature2.title": "Вечірній час", 
    "format.feature2.desc": "19:00 - 22:00, зручно після роботи",
    "format.feature3.title": "Місто Рівне",
    "format.feature3.desc": "Очні заняття в центрі міста",
    "format.feature4.title": "Змішаний формат",
    "format.feature4.desc": "Можливість онлайн підключення",
    
    // Program Section
    "program.title": "Повна програма навчання",
    "program.subtitle": "Програма розрахована на 1 рік навчання - 50 зустрічей по 3 години. Кожна зустріч: тема, біблійний текст, практична дискусія, молитва та застосування.",
    "program.meetings": "Зустрічей",
    "program.hours": "Годин навчання",
    "program.sections": "Розділів програми",
    
    // Program Sections
    "program.faith.title": "ОСНОВИ ВІРИ ТА СПАСІННЯ",
    "program.faith.subtitle": "Заняття 1-10",
    "program.bible.title": "БІБЛІЙНЕ ДОСЛІДЖЕННЯ",
    "program.bible.subtitle": "Заняття 11-20",
    "program.spiritual.title": "ДУХОВНЕ ФОРМУВАННЯ І ХАРАКТЕР",
    "program.spiritual.subtitle": "Заняття 21-30",
    "program.leadership.title": "СЛУЖІННЯ І ЛІДЕРСТВО",
    "program.leadership.subtitle": "Заняття 31-38",
    "program.family.title": "СІМ'Я І ХРИСТИЯНСЬКЕ ЖИТТЯ",
    "program.family.subtitle": "Заняття 39-43",
    "program.church.title": "ЦЕРКВА І СУСПІЛЬСТВО",
    "program.church.subtitle": "Заняття 44-47",
    "program.prophetic.title": "ПРОРОЧЕ СЛОВО І МАЙБУТНЄ",
    "program.prophetic.subtitle": "Заняття 48-50",
    "format.additional.interactive.title": "Інтерактивне навчання",
    "format.additional.interactive.description": "Кожне заняття включає дискусії, практичні завдання та групову роботу для кращого засвоєння матеріалу.",
    "format.additional.mentoring.title": "Менторство",
    "format.additional.mentoring.description": "Індивідуальне наставництво від досвідчених викладачів та можливість особистих консультацій.",
    "format.additional.resources.title": "Ресурси для навчання",
    "format.additional.resources.description": "Доступ до бібліотеки, навчальних матеріалів та онлайн-ресурсів для поглибленого вивчення.",
    
    // Apply Page
    "apply.title": "Подати заявку на навчання",
    "apply.subtitle": "Розпочніть свою духовну подорож з UEBSchool. Заповніть форму нижче, і ми зв'яжемося з вами.",
    "apply.form.title": "Реєстрація на навчання",
    "apply.firstname": "Ім'я",
    "apply.lastname": "Прізвище",
    "apply.city": "Місто",
    "apply.format": "Формат навчання",
    "apply.format.placeholder": "Оберіть формат навчання",
    "apply.format.inperson": "Очний (присутність в Рівному)",
    "apply.format.online": "Онлайн (через відеозв'язок)",
    "apply.format.mixed": "Змішаний (частково очно, частково онлайн)",
    "apply.phone": "Телефон",
    "apply.email": "Email",
    "apply.submit": "Подати заявку",
    "apply.submitting": "Відправляємо...",
    "apply.success.title": "Заявку відправлено!",
    "apply.success.message": "Дякуємо за вашу заявку на навчання в UEBSchool. Ми зв'яжемося з вами найближчим часом.",
    "apply.success.button": "Подати ще одну заявку",
    "apply.info.duration": "Курс триває 1 рік (50 занять)",
    "apply.info.schedule": "Заняття проходять 2 рази на місяць у п'ятницю з 19:00 до 22:00",
    "apply.info.format": "Формат: очний та онлайн",
    "apply.info.education": "Комплексна біблійна освіта",
    "apply.info.certificate": "Після завершення курсу - сертифікат",
    "apply.privacy": "Натискаючи \"Подати заявку\", ви погоджуєтеся з обробкою персональних даних",
    
    // Contacts Page (old keys - removed)
    "contacts.class.schedule": "П'ятниця: 19:00-22:00",
    "contacts.frequency": "2 рази на місяць",
    "contacts.faq": "Інфо",
    "contacts.contact.address": "Адреса",
    "contacts.contact.phone": "Телефон", 
    "contacts.contact.email": "Email",
    "contacts.contact.schedule": "Розклад занять",
    "contacts.city": "м. Рівне, Україна",
    "contacts.center": "Центр міста",
    "contacts.hours": "Пн-Пт: 9:00-18:00",
    "contacts.main.email": "Основна пошта",
    "contacts.title": "Зв'яжіться з нами",
    "contacts.subtitle": "Маєте питання про навчання в UEBSchool? З радістю допоможемо вам та надамо всю необхідну інформацію.",
    "contacts.form.title": "Напишіть нам",
    "contacts.form.name": "Ім'я",
    "contacts.form.email": "Email",
    "contacts.form.subject": "Тема",
    "contacts.form.message": "Повідомлення",
    "contacts.form.send": "Надіслати",
    "contacts.form.sending": "Надсилання...",
    "contacts.form.success": "Повідомлення надіслано!",
    "contacts.form.select.placeholder": "Оберіть тему",
    "contacts.form.select.admission": "Питання про вступ",
    "contacts.form.select.program": "Програма навчання",
    "contacts.form.select.schedule": "Розклад та формат",
    "contacts.form.select.technical": "Технічні питання",
    "contacts.form.select.other": "Інше",
    "contacts.location.title": "Наше розташування",
    "contacts.location.note": "Точна адреса буде надана після підтвердження заявки",
    
    // FAQ Page
    "faq.title": "Інфо",
    "faq.subtitle": "Відповіді на найпоширеніші запитання про навчання в UEBSchool",
    "faq.schedule": "Розклад",
    "faq.q1": "Скільки коштує навчання в UEBSchool?",
    "faq.a1": "Навчання в UEBSchool є безкоштовним. Ми віримо, що біблійна освіта має бути доступною для всіх, хто прагне глибше пізнати Бога та Його Слово.",
    "faq.q2": "Чи потрібен попередній досвід для вступу?",
    "faq.a2": "Ні, попередній досвід не потрібен. Наша програма розрахована на людей з різним рівнем біблійних знань - від початківців до тих, хто вже має певний досвід.",
    "faq.q3": "Як довго триває курс?",
    "faq.a3": "Повний курс триває 1 рік і включає 50 занять. Заняття проходять 2 рази на місяць по п'ятницях з 19:00 до 22:00.",
    "faq.q4": "Чи можна навчатися онлайн?",
    "faq.a4": "Так, ми пропонуємо змішаний формат навчання. Ви можете відвідувати заняття очно в Рівному або підключатися онлайн через відеозв'язок.",
    "faq.q5": "Які документи видаються після закінчення?",
    "faq.a5": "Після успішного завершення курсу студенти отримують сертифікат про закінчення UEBSchool, який підтверджує отримання базової біблійної освіти.",
    "faq.q6": "Як подати заявку на навчання?",
    "faq.a6": "Заповніть форму заявки на нашому сайті або зв'яжіться з нами за телефоном +380 63 344 4555 чи email: uebs0633444555@gmail.com. Ми зв'яжемося з вами для уточнення деталей.",
    
    // Footer
    "footer.about": "Про UEBSchool",
    "footer.about.text": "Духовно-освітнє середовище для підготовки зрілих служителів Божих.",
    "footer.quick.links": "Швидкі посилання",
    "footer.newsletter": "Розсилка",
    "footer.newsletter.text": "Підпишіться на оновлення та новини UEBSchool",
    "footer.newsletter.email": "Ваш email",
    "footer.newsletter.subscribe": "Підписатися",
    "footer.newsletter.subscribing": "Підписуємось...",
    "footer.newsletter.success": "Дякуємо за підписку! Ми надішлемо вам новини.",
    "footer.social": "Соціальні мережі",
    "footer.rights": "Всі права захищені.",
    
    // Lectures
    "lectures.title": "Онлайн лекції",
    "lectures.subtitle": "Перегляньте попередні лекції та навчальні матеріали",
    "lectures.watch": "Переглянути",
    "lectures.duration": "Тривалість",
    "lectures.speaker": "Спікер",
    "lectures.date": "Дата",
    "lectures.description": "Опис",
    "lectures.back": "Назад до лекцій",
    "lectures.next.title": "Наступна лекція",
    "lectures.next.join": "Приєднатися",
    "lectures.next.remind": "Нагадати",
    "lectures.next.link.unavailable": "Посилання на трансляцію ще не доступне"
  },
  
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.program": "Program",
    "nav.contacts": "Contacts",
    "nav.lectures": "Lectures",
    "nav.apply": "Apply",
    
    // Hero Section
    "hero.title": "UEBSchool — <span class=\"bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent\">Bible School</span> in Rivne",
    "hero.subtitle": "A spiritual-educational environment where God's Word, prayer, and fellowship shape mature ministers — bearers of light, truth, and grace. Evening classes, twice a month.",
    "hero.apply": "Apply Now",
    "hero.learn": "Learn More",
    "hero.word": "WORD",
    "hero.word.desc": "All education is rooted in Holy Scripture — to live and serve according to God's will.",
    "hero.spirit": "SPIRIT",
    "hero.spirit.desc": "Direction of practice and character formation through life under the guidance of the Holy Spirit.",
    "hero.service": "SERVICE",
    "hero.service.desc": "Preparation for practical ministry in church, family, and community — to serve with love and truth.",
    "hero.meetings": "Meetings per Year",
    "hero.hours": "Study Hours",
    "hero.time": "Class Time",
    "hero.format": "Format",
    "hero.format.frequency": "2x/month",
    "hero.schedule": "50 meetings · 7:00-10:00 PM",
    "hero.format.desc": "Format — in-person / mixed",
    "hero.program.desc": "Program: Fundamentals of faith, ministry, leadership and practice. Preparation for service in church and community.",
    
    // Format Section
    "format.title": "Learning Formats",
    "format.subtitle": "Choose a convenient format for your participation in UEBSchool",
    "format.inperson": "In-Person Learning",
    "format.inperson.desc": "7:00 - 10:00 PM, convenient after work",
    "format.online": "Online Learning",
    "format.online.desc": "Participate via video call from anywhere",
    "format.mixed": "Mixed Format",
    "format.mixed.desc": "Combination of in-person and online learning",
    
    // Format Features
    "format.feature1.title": "Twice a month",
    "format.feature1.desc": "Classes every two weeks on Friday",
    "format.feature2.title": "Evening time", 
    "format.feature2.desc": "7:00 - 10:00 PM, convenient after work",
    "format.feature3.title": "Rivne city",
    "format.feature3.desc": "In-person classes in the city center",
    "format.feature4.title": "Mixed format",
    "format.feature4.desc": "Online connection option",
    
    // Program Section
    "program.title": "Complete Study Program",
    "program.subtitle": "The program is designed for 1 year of study - 50 meetings of 3 hours each. Each meeting: topic, biblical text, practical discussion, prayer and application.",
    "program.meetings": "Meetings",
    "program.hours": "Study Hours",
    "program.sections": "Program Sections",
    
    // Program Sections
    "program.faith.title": "FUNDAMENTALS OF FAITH AND SALVATION",
    "program.faith.subtitle": "Classes 1-10",
    "program.bible.title": "BIBLICAL STUDY",
    "program.bible.subtitle": "Classes 11-20",
    "program.spiritual.title": "SPIRITUAL FORMATION & CHARACTER",
    "program.spiritual.subtitle": "Classes 21-30",
    "program.leadership.title": "MINISTRY & LEADERSHIP",
    "program.leadership.subtitle": "Classes 31-38",
    "program.family.title": "FAMILY & CHRISTIAN LIFE",
    "program.family.subtitle": "Classes 39-43",
    "program.church.title": "CHURCH & SOCIETY",
    "program.church.subtitle": "Classes 44-47",
    "program.prophetic.title": "PROPHETIC WORD & FUTURE",
    "program.prophetic.subtitle": "Classes 48-50",
    "format.additional.interactive.title": "Interactive Learning",
    "format.additional.interactive.description": "Each lesson includes discussions, practical tasks and group work for better material understanding.",
    "format.additional.mentoring.title": "Mentoring",
    "format.additional.mentoring.description": "Individual guidance from experienced teachers and opportunity for personal consultations.",
    "format.additional.resources.title": "Learning Resources",
    "format.additional.resources.description": "Access to library, educational materials and online resources for in-depth study.",
    
    // Apply Page
    "apply.title": "Apply for Studies",
    "apply.subtitle": "Begin your spiritual journey with UEBSchool. Fill out the form below and we'll contact you.",
    "apply.form.title": "Registration for Studies",
    "apply.firstname": "First Name",
    "apply.lastname": "Last Name",
    "apply.city": "City",
    "apply.format": "Learning Format",
    "apply.format.placeholder": "Choose learning format",
    "apply.format.inperson": "In-Person (presence in Rivne)",
    "apply.format.online": "Online (via video call)",
    "apply.format.mixed": "Mixed (partially in-person, partially online)",
    "apply.phone": "Phone",
    "apply.email": "Email",
    "apply.submit": "Submit Application",
    "apply.submitting": "Submitting...",
    "apply.success.title": "Application Submitted!",
    "apply.success.message": "Thank you for your application to UEBSchool. We will contact you soon.",
    "apply.success.button": "Submit Another Application",
    "apply.info.duration": "Course lasts 1 year (50 classes)",
    "apply.info.schedule": "Classes are held twice a month on Fridays from 7:00 to 10:00 PM",
    "apply.info.format": "Format: in-person and online",
    "apply.info.education": "Comprehensive biblical education",
    "apply.info.certificate": "Certificate upon course completion",
    "apply.privacy": "By clicking \"Submit Application\", you agree to personal data processing",
    
    // Contacts Page (old keys - removed)
    "contacts.page.title": "Contacts",
    "contacts.class.schedule": "Friday: 7:00-10:00 PM",
    "contacts.frequency": "2 times per month", 
    "contacts.faq": "FAQ",
    "contacts.contact.address": "Address",
    "contacts.contact.phone": "Phone",
    "contacts.contact.email": "Email", 
    "contacts.contact.schedule": "Class Schedule",
    "contacts.city": "Rivne, Ukraine",
    "contacts.center": "City Center",
    "contacts.hours": "Mon-Fri: 9:00-18:00",
    "contacts.main.email": "Main Email",
    "contacts.title": "Contact Us",
    "contacts.subtitle": "Have questions about studying at UEBSchool? We're happy to help you and provide all necessary information.",
    "contacts.form.title": "Send Us a Message",
    "contacts.form.name": "Name",
    "contacts.form.email": "Email",
    "contacts.form.subject": "Subject",
    "contacts.form.message": "Message",
    "contacts.form.send": "Send",
    "contacts.form.sending": "Sending...",
    "contacts.form.success": "Message sent!",
    "contacts.form.select.placeholder": "Select a topic",
    "contacts.form.select.admission": "Admission questions",
    "contacts.form.select.program": "Study program",
    "contacts.form.select.schedule": "Schedule and format",
    "contacts.form.select.technical": "Technical questions",
    "contacts.form.select.other": "Other",
    "contacts.location.title": "Our Location",
    "contacts.location.note": "Exact address will be provided after application confirmation",
    
    // FAQ Page
    "faq.title": "Info",
    "faq.subtitle": "Answers to the most common questions about studying at UEBSchool",
    "faq.schedule": "Schedule",
    "faq.q1": "How much does studying at UEBSchool cost?",
    "faq.a1": "Education at UEBSchool is free. We believe that biblical education should be accessible to everyone who seeks to know God and His Word more deeply.",
    "faq.q2": "Is prior experience required for admission?",
    "faq.a2": "No, prior experience is not required. Our program is designed for people with different levels of biblical knowledge - from beginners to those who already have some experience.",
    "faq.q3": "How long does the course last?",
    "faq.a3": "The full course lasts 1 year and includes 50 classes. Classes are held twice a month on Fridays from 7:00 to 10:00 PM.",
    "faq.q4": "Can I study online?",
    "faq.a4": "Yes, we offer a mixed learning format. You can attend classes in-person in Rivne or connect online via video call.",
    "faq.q5": "What documents are issued after graduation?",
    "faq.a5": "After successful completion of the course, students receive a certificate of completion from UEBSchool, which confirms receiving basic biblical education.",
    "faq.q6": "How to apply for studies?",
    "faq.a6": "Fill out the application form on our website or contact us at +380 63 344 4555 or email: uebs0633444555@gmail.com. We will contact you to clarify the details.",
    
    // Footer
    "footer.about": "About UEBSchool",
    "footer.about.text": "A spiritual-educational environment for training mature servants of God.",
    "footer.quick.links": "Quick Links",
    "footer.newsletter": "Newsletter",
    "footer.newsletter.text": "Subscribe to UEBSchool updates and news",
    "footer.newsletter.email": "Your email",
    "footer.newsletter.subscribe": "Subscribe",
    "footer.newsletter.subscribing": "Subscribing...",
    "footer.newsletter.success": "Thank you for subscribing! We'll send you news.",
    "footer.social": "Social Media",
    "footer.rights": "All rights reserved.",
    
    // Lectures
    "lectures.title": "Online Lectures",
    "lectures.subtitle": "Watch previous lectures and educational materials",
    "lectures.watch": "Watch",
    "lectures.duration": "Duration",
    "lectures.speaker": "Speaker",
    "lectures.date": "Date",
    "lectures.description": "Description",
    "lectures.back": "Back to Lectures",
    "lectures.next.title": "Next Lecture",
    "lectures.next.join": "Join",
    "lectures.next.remind": "Remind Me",
    "lectures.next.link.unavailable": "Stream link not available yet"
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("uk");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}