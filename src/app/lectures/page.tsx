"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Clock, Calendar, User, Eye, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/lib/firebase";

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
    description: "Справжнє лідерство не народжується в тиші кабінетів — воно формується у вогні криз. Розгляд біблійних принципів лідерства в час викликів, через приклади Мойсея, Давида, Неемії та Ісуса.",
    descriptionEn: "True leadership is not born in the silence of offices — it is formed in the fire of crises. Examination of biblical principles of leadership in times of crisis through examples of Moses, David, Nehemiah and Jesus.",
    videoUrl: "https://www.youtube.com/embed/w0cRCx5i3OY"
  }
];

// Function to get video duration from YouTube thumbnail (placeholder)
const getVideoDuration = (youtubeId: string) => {
  // In a real app, you would use YouTube API to get duration
  // For now, return placeholder durations
  const durations: { [key: string]: string } = {
    "d1fM8Fl52qc": "2:25:38",
    "DN7ZAsYSq2s": "2:27:57",
    "XDRty1ClGjE": "1:33:31",
    "0ak_EHjpIYA": "1:12:25",
    "1DFuvUa-8NQ": "2:01:17",
    "w0cRCx5i3OY": "1:25:02"
  };
  return durations[youtubeId] || "1:00:00";
};

// Function to get YouTube thumbnail with fallback
const getYoutubeThumbnail = (youtubeId: string) => {
  // Try different quality levels in order of preference
  // maxresdefault (best) -> sddefault -> hqdefault (fallback)
  return `https://img.youtube.com/vi/${youtubeId}/sddefault.jpg`;
};

export default function LecturesPage() {
  const { t, language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [lectureStats, setLectureStats] = useState<{[key: string]: {views: number, comments: number}}>({});

  useEffect(() => {
    setIsMounted(true);
    loadLectureStats();
  }, []);

  const loadLectureStats = async () => {
    const stats: {[key: string]: {views: number, comments: number}} = {};
    
    for (const lecture of lectures) {
      try {
        const viewsRef = ref(database, `lectures/${lecture.id}/views`);
        const viewsSnapshot = await get(viewsRef);
        const views = viewsSnapshot.val() || 0;
        
        const commentsRef = ref(database, `lectures/${lecture.id}/comments`);
        const commentsSnapshot = await get(commentsRef);
        const commentsData = commentsSnapshot.val();
        const commentsCount = commentsData ? Object.keys(commentsData).length : 0;
        
        stats[lecture.id] = { views, comments: commentsCount };
      } catch (error) {
        console.error(`Error loading stats for ${lecture.id}:`, error);
        stats[lecture.id] = { views: 0, comments: 0 };
      }
    }
    
    setLectureStats(stats);
  };

  const formatDate = (dateString: string) => {
    if (!isMounted) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}.${month.toString().padStart(2, '0')}.${year}`;
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'uk' ? 'uk-UA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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

        {/* Lectures Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...lectures].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((lecture, index) => (
            <motion.div
              key={lecture.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Thumbnail */}
              <div 
                className="relative aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${getYoutubeThumbnail(lecture.youtubeId)})` }}
              >
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/20 transition-colors">
                  <Play className="w-16 h-16 text-white drop-shadow-lg" />
                </div>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {getVideoDuration(lecture.youtubeId)}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                  {language === 'uk' ? lecture.title : lecture.titleEn}
                </h3>
                
                <p className="text-slate-600 mb-4 line-clamp-3">
                  {language === 'uk' ? lecture.description : lecture.descriptionEn}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <User className="w-4 h-4" />
                    {language === 'uk' ? lecture.speaker : lecture.speakerEn}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    {formatDate(lecture.date)}
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                      <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        {lectureStats[lecture.id]?.views || 0}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <MessageCircle className="w-4 h-4" />
                                        {lectureStats[lecture.id]?.comments || 0}
                                      </div>
                                    </div>
                  </div>
                </div>

                {/* Watch Button */}
                <Link href={`/lectures/${lecture.id}`}>
                  <motion.button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-5 h-5" />
                    {t("lectures.watch")}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}