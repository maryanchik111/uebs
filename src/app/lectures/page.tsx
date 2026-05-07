"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Play, Clock, Calendar, User, Eye, MessageCircle, Video, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/lib/firebase";
import { texts } from "./texts/data";

// Real lectures data
const lectures = [
  {
    id: "character-of-god",
    title: "«ХАРАКТЕР БОГА» — ЄВАНГЕЛІСТ-МУЗИКАНТ ОЛЕГ НАЗАРЧУК",
    titleEn: "«CHARACTER OF GOD» — EVANGELIST-MUSICIAN OLEG NAZARCHUK",
    speaker: "Олег Назарчук",
    speakerEn: "Oleg Nazarchuk",
    date: "2025-10-24",
    youtubeId: "d1fM8Fl52qc",
    description: "Тема відкриває глибини Божої природи — любов, святість, справедливість і милість. Спікер ділиться особистими переживаннями та біблійними істинами, що змінюють серце.",
    descriptionEn: "The topic reveals the depths of God's nature — love, holiness, justice and mercy. The speaker shares personal experiences and biblical truths that transform the heart.",
    videoUrl: "https://www.youtube.com/embed/d1fM8Fl52qc"
  },
  {
    id: "to-ephesians",
    title: "«ОГЛЯД ПОСЛАННЯ ДО ЄФЕСЯН» — КРУКОВСЬКИЙ ВОЛОДИМИР",
    titleEn: "«OVERVIEW OF EPHESIANS» — KRUKOVSKY VOLODYMYR",
    speaker: "Володимир Круковський",
    speakerEn: "Volodymyr Krukovsky",
    date: "2025-11-07",
    youtubeId: "DN7ZAsYSq2s",
    description: "Глибоке занурення в одне з найпотужніших послань апостола Павла — лист, який відкриває велич Божої благодаті, покликання Церкви та силу єдності у Христі.",
    descriptionEn: "Deep dive into one of the apostle Paul's most powerful epistles — a letter that reveals the majesty of God's grace, the calling of the Church and the power of unity in Christ.",
    videoUrl: "https://www.youtube.com/embed/DN7ZAsYSq2s"
  },
  {
    id: "believers-political-participation",
    title: "«УЧАСТЬ ВІРУЮЧИХ У ПОЛІТИЧНОМУ ПРОЦЕСІ ДЕРЖАВИ» — ІГОР ПЛОХОЙ",
    titleEn: "«BELIEVERS' PARTICIPATION IN THE STATE'S POLITICAL PROCESS» — IGOR PLOKHY",
    speaker: "Ігор Плохой",
    speakerEn: "Igor Plokhy",
    date: "2025-11-16",
    youtubeId: "XDRty1ClGjE",
    description: "Розгляд важливої теми про роль віруючих у політичному житті держави, їхні обов'язки і можливості впливу на суспільство.",
    descriptionEn: "Examination of the important topic of the role of believers in the political life of the state, their duties and opportunities to influence society.",
    videoUrl: "https://www.youtube.com/embed/XDRty1ClGjE"
  },
  {
    id: "civic-position-believers-power-functions",
    title: "«ГРОМАДЯНСЬКА ПОЗИЦІЯ ВІРУЮЧИХ ТА ФУНКЦІЇ ВЛАДИ» — ІГОР ПЛОХОЙ",
    titleEn: "«CIVIC POSITION OF BELIEVERS AND FUNCTIONS OF POWER» — IGOR PLOKHY",
    speaker: "Ігор Плохой",
    speakerEn: "Igor Plokhy",
    date: "2025-11-16",
    youtubeId: "0ak_EHjpIYA",
    description: "Розуміння громадянської позиції віруючих та того, як функціонує влада в контексті розвитку демократичного суспільства.",
    descriptionEn: "Understanding the civic position of believers and how power functions in the context of developing a democratic society.",
    videoUrl: "https://www.youtube.com/embed/0ak_EHjpIYA"
  },
  {
    id: "called-to-be-leader",
    title: "«ПОКЛИКАНИЙ БУТИ ЛІДЕРОМ» — ТИМОНІШИН АНТОН",
    titleEn: "«CALLED TO BE A LEADER» — TIMONISHIN ANTON",
    speaker: "Тимонішин Антон",
    speakerEn: "Timonishin Anton",
    date: "2025-11-22",
    youtubeId: "1DFuvUa-8NQ",
    description: "Розгляд теми лідерства в контексті Божого покликання — як стати ефективним лідером, керуючись духовними принципами і служінням.",
    descriptionEn: "Examination of leadership in the context of God's calling — how to become an effective leader guided by spiritual principles and service.",
    videoUrl: "https://www.youtube.com/embed/1DFuvUa-8NQ"
  },
  {
    id: "leadership-in-times-of-crisis",
    title: "«ЛІДЕРСТВО В ЕПОХУ ВИКЛИКІВ» — ТИМОНІШИН АНТОН",
    titleEn: "«LEADERSHIP IN TIMES OF CRISIS» — TIMONISHIN ANTON",
    speaker: "Тимонішин Антон",
    speakerEn: "Timonishin Anton",
    date: "2025-12-05",
    youtubeId: "w0cRCx5i3OY",
    description: "Справжнє лідерство не народжується в тиші кабінетів — воно формується у вогні криз. Розгляд біблійних принципів лідерства в час викликів.",
    descriptionEn: "True leadership is not born in the silence of offices — it is formed in the fire of crises. Biblical principles of leadership in times of crisis.",
    videoUrl: "https://www.youtube.com/embed/w0cRCx5i3OY"
  },
  {
    id: "vessel-of-honor",
    title: "«ЯК ПРИГОТОВИТИ СВОЮ ПОСУДИНУ ДЛЯ ЧЕСТІ В СЛАВІ БОЖІЙ?» — МУСЕВИЧ СЕРГІЙ",
    titleEn: "«HOW TO PREPARE YOUR VESSEL FOR HONOR IN GOD'S GLORY?» — SERHIY MUSEVYCH",
    speaker: "Мусевич Сергій",
    speakerEn: "Serhiy Musevych",
    date: "2026-02-13",
    youtubeId: "EgcoEVfBUUw",
    description: "Мета Біблійної школи — формувати зрілих, відповідальних і духовно сильних учнів Христа. Лекція про місію та цілі школи.",
    descriptionEn: "The purpose of the Bible School is to form mature, responsible, and spiritually strong disciples of Christ. Lecture on the school's mission and goals.",
    videoUrl: "https://www.youtube.com/embed/EgcoEVfBUUw"
  },
  {
    id: "how-to-convey-gods-vision",
    title: "«ЯК ПЕРЕДАВАТИ БАЧЕННЯ БОГА ЛЮДЯМ?» — ІВАН ГАЙДУК",
    titleEn: "«HOW TO CONVEY GOD'S VISION TO PEOPLE?» — IVAN HAYDUK",
    speaker: "Іван Гайдук",
    speakerEn: "Ivan Hayduk",
    date: "2026-03-06",
    youtubeId: "jEPRYcjtZSo",
    description: "🎓 МЕТА СТВОРЕННЯ БІБЛІЙНОЇ ШКОЛИ #UEBSchool ПРИ НАШІЙ СПІЛЬНОТІ slti-church.com. Біблійна школа uebs.com.ua створена для того, щоб поглиблювати пізнання Божого Слова та формувати зрілих, відповідальних і духовно сильних учнів Христа.",
    descriptionEn: "🎓 THE PURPOSE OF CREATING THE BIBLE SCHOOL #UEBSchool AT OUR COMMUNITY slti-church.com. The Bible school uebs.com.ua was created to deepen the knowledge of God's Word and form mature, responsible and spiritually strong disciples of Christ.",
    videoUrl: "https://www.youtube.com/embed/jEPRYcjtZSo"
  },
  {
    id: "planning-and-strategy-of-vision",
    title: "«ПЛАНУВАННЯ І СТРАТЕГІЯ ВТІЛЕННЯ БАЧЕННЯ» — ІВАН ГАЙДУК",
    titleEn: "«PLANNING AND STRATEGY OF VISION REALIZATION» — IVAN HAYDUK",
    speaker: "Іван Гайдук",
    speakerEn: "Ivan Hayduk",
    date: "2026-03-06",
    youtubeId: "iBvOn4xcNHk",
    description: "🎓 МЕТА СТВОРЕННЯ БІБЛІЙНОЇ ШКОЛИ #UEBSchool ПРИ НАШІЙ СПІЛЬНОТІ slti-church.com. Біблійна школа uebs.com.ua створена для того, щоб поглиблювати пізнання Божого Слова та формувати зрілих, відповідальних і духовно сильних учнів Христа.",
    descriptionEn: "🎓 THE PURPOSE OF CREATING THE BIBLE SCHOOL #UEBSchool AT OUR COMMUNITY slti-church.com. The Bible school uebs.com.ua was created to deepen the knowledge of God's Word and form mature, responsible and spiritually strong disciples of Christ.",
    videoUrl: "https://www.youtube.com/embed/iBvOn4xcNHk"
  },
  {
    id: "divine-and-human-nature-of-christ",
    title: "«БОЖЕСТВЕННА ТА ЛЮДСЬКА ПРИРОДА ХРИСТА» — ДАНІЄЛ КУЧУРЯН",
    titleEn: "«DIVINE AND HUMAN NATURE OF CHRIST» — DANIEL KUCHURYAN",
    speaker: "Данієл Кучурян",
    speakerEn: "Daniel Kuchuryan",
    date: "2026-03-13",
    youtubeId: "-hH2ahxUeuI",
    description: "🎓 МЕТА СТВОРЕННЯ БІБЛІЙНОЇ ШКОЛИ #UEBSchool ПРИ НАШІЙ СПІЛЬНОТІ slti-church.com. Біблійна школа uebs.com.ua створена для того, щоб поглиблювати пізнання Божого Слова та формувати зрілих, відповідальних і духовно сильних учнів Христа.",
    descriptionEn: "🎓 THE PURPOSE OF CREATING THE BIBLE SCHOOL #UEBSchool AT OUR COMMUNITY slti-church.com. The Bible school uebs.com.ua was created to deepen the knowledge of God's Word and form mature, responsible and spiritually strong disciples of Christ.",
    videoUrl: "https://www.youtube.com/embed/-hH2ahxUeuI"
  },
  {
    id: "christology-two-natures-of-jesus-christ",
    title: "«ХРИСТОЛОГІЯ - ДВІ ПРИРОДИ ІСУСА ХРИСТА» — ДАНІЄЛ КУЧУРЯН",
    titleEn: "«CHRISTOLOGY - TWO NATURES OF JESUS CHRIST» — DANIEL KUCHURYAN",
    speaker: "Данієл Кучурян",
    speakerEn: "Daniel Kuchuryan",
    date: "2026-03-13",
    youtubeId: "5g2XqLyvSs4",
    description: "🎓 МЕТА СТВОРЕННЯ БІБЛІЙНОЇ ШКОЛИ #UEBSchool ПРИ НАШІЙ СПІЛЬНОТІ slti-church.com. Біблійна школа uebs.com.ua створена для того, щоб поглиблювати пізнання Божого Слова та формувати зрілих, відповідальних і духовно сильних учнів Христа.",
    descriptionEn: "🎓 THE PURPOSE OF CREATING THE BIBLE SCHOOL #UEBSchool AT OUR COMMUNITY slti-church.com. The Bible school uebs.com.ua was created to deepen the knowledge of God's Word and form mature, responsible and spiritually strong disciples of Christ.",
  },
  {
    id: "marriage-by-creators-design",
    title: "«ПОДРУЖЖЯ ЗА ЗАДУМОМ ТВОРЦЯ» — ЛЮБОМИР ТУРЧАК",
    titleEn: "«MARRIAGE BY THE CREATOR'S DESIGN» — LYUBOMYR TURCHAK",
    speaker: "Любомир Турчак",
    speakerEn: "Lyubomyr Turchak",
    date: "2026-05-01",
    youtubeId: "8BEDpNaLaKo",
    description: "Розгляд біблійної моделі подружжя, задуму Творця для чоловіка та жінки, а також засад щасливого сімейного життя.",
    descriptionEn: "Examination of the biblical model of marriage, the Creator's design for man and woman, and the principles of a happy family life.",
    videoUrl: "https://www.youtube.com/embed/8BEDpNaLaKo"
  },
  {
    id: "choosing-a-life-partner",
    title: "«ВИБІР СУПУТНИКА ЖИТТЯ» — ЛЮБОМИР ТУРЧАК",
    titleEn: "«CHOOSING A LIFE PARTNER» — LYUBOMYR TURCHAK",
    speaker: "Любомир Турчак",
    speakerEn: "Lyubomyr Turchak",
    date: "2026-05-01",
    youtubeId: "Ia9CaAPlt5I",
    description: "Роздуми про важливість правильного вибору супутника життя, біблійні критерії та духовну підготовку до шлюбу.",
    descriptionEn: "Reflections on the importance of choosing the right life partner, biblical criteria, and spiritual preparation for marriage.",
    videoUrl: "https://www.youtube.com/embed/Ia9CaAPlt5I"
  }
];

// Helper: video duration map
const getVideoDuration = (youtubeId: string) => {
  const durations: Record<string, string> = {
    "d1fM8Fl52qc": "2:25:38",
    "DN7ZAsYSq2s": "2:27:57",
    "XDRty1ClGjE": "1:33:31",
    "0ak_EHjpIYA": "1:12:25",
    "1DFuvUa-8NQ": "2:01:17",
    "w0cRCx5i3OY": "1:25:02",
    "EgcoEVfBUUw": "59:40",
    "jEPRYcjtZSo": "57:35",
    "iBvOn4xcNHk": "1:29:45",
    "-hH2ahxUeuI": "1:09:09",
    "5g2XqLyvSs4": "1:15:25",
    "8BEDpNaLaKo": "1:34:38",
    "Ia9CaAPlt5I": "49:19"
  };
  return durations[youtubeId] || "1:00:00";
};

const getYoutubeThumbnail = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/sddefault.jpg`;

export default function LecturesPage() {
  const { t, language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"videos" | "texts">("videos");
  const [lectureStats, setLectureStats] = useState<Record<string, { views: number; comments: number }>>({});

  useEffect(() => {
    setIsMounted(true);
    loadLectureStats();
  }, []);

  const loadLectureStats = async () => {
    const stats: Record<string, { views: number; comments: number }> = {};
    for (const lecture of lectures) {
      try {
        const viewsSnap = await get(ref(database, `lectures/${lecture.id}/views`));
        const commentsSnap = await get(ref(database, `lectures/${lecture.id}/comments`));
        const commentsData = commentsSnap.val();
        stats[lecture.id] = {
          views: viewsSnap.val() || 0,
          comments: commentsData ? Object.keys(commentsData).length : 0,
        };
      } catch {
        stats[lecture.id] = { views: 0, comments: 0 };
      }
    }
    setLectureStats(stats);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (!isMounted) {
      return `${date.getDate()}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
    }
    return date.toLocaleDateString(language === "uk" ? "uk-UA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const sortedLectures = [...lectures].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedTexts = [...texts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {t("lectures.title")}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t("lectures.subtitle")}
          </p>
        </motion.div>

        {/* Tab Pills */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="inline-flex bg-white rounded-2xl shadow border border-slate-100 p-1.5 gap-1">
            {(["videos", "texts"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors duration-200 ${activeTab === tab ? "text-white" : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab === "videos" ? <Video className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  {tab === "videos"
                    ? language === "uk" ? "Відео" : "Videos"
                    : language === "uk" ? "Тексти" : "Texts"}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "videos" ? (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedLectures.map((lecture, index) => (
                  <motion.div
                    key={lecture.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.07 }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="relative aspect-video bg-gradient-to-br from-blue-500 to-purple-600 bg-cover bg-center"
                      style={{ backgroundImage: `url(${getYoutubeThumbnail(lecture.youtubeId)})` }}
                    >
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/20 transition-colors">
                        <Play className="w-14 h-14 text-white drop-shadow-lg" />
                      </div>
                      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-0.5 rounded text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getVideoDuration(lecture.youtubeId)}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col gap-3">
                      <h3 className="text-lg font-bold text-slate-900 line-clamp-2">
                        {language === "uk" ? lecture.title : lecture.titleEn}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3">
                        {language === "uk" ? lecture.description : lecture.descriptionEn}
                      </p>
                      <div className="flex flex-col gap-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{language === "uk" ? lecture.speaker : lecture.speakerEn}</span>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(lecture.date)}</span>
                          <span className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{lectureStats[lecture.id]?.views || 0}</span>
                            <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{lectureStats[lecture.id]?.comments || 0}</span>
                          </span>
                        </div>
                      </div>
                      <Link href={`/lectures/${lecture.id}`} className="mt-1">
                        <motion.button
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm hover:shadow-lg transition-shadow"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Play className="w-4 h-4" />
                          {t("lectures.watch")}
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="texts"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedTexts.map((text, index) => (
                  <motion.div
                    key={text.id}
                    className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.07 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="p-6 flex flex-col gap-4 flex-1">
                      {/* Icon */}
                      <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 line-clamp-3">
                        {language === "uk" ? text.title : text.titleEn}
                      </h3>

                      <p className="text-slate-600 text-sm line-clamp-4 flex-1">
                        {language === "uk" ? text.description : text.descriptionEn}
                      </p>

                      <div className="flex flex-col gap-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{language === "uk" ? text.author : text.authorEn}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(text.date)}</span>
                      </div>

                      <Link href={`/lectures/texts/${text.id}`}>
                        <motion.button
                          className="w-full bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl border border-slate-200 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-colors flex items-center justify-center gap-2 text-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <BookOpen className="w-4 h-4" />
                          {language === "uk" ? "Читати" : "Read"}
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}