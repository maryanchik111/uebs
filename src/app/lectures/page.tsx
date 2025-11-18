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
    thumbnail: `https://img.youtube.com/vi/d1fM8Fl52qc/maxresdefault.jpg`,
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
    thumbnail: `https://img.youtube.com/vi/DN7ZAsYSq2s/maxresdefault.jpg`,
    videoUrl: "https://www.youtube.com/embed/DN7ZAsYSq2s"
  }
];

// Function to get video duration from YouTube thumbnail (placeholder)
const getVideoDuration = (youtubeId: string) => {
  // In a real app, you would use YouTube API to get duration
  // For now, return placeholder durations
  const durations: { [key: string]: string } = {
    "d1fM8Fl52qc": "2:25:38",
    "DN7ZAsYSq2s": "2:27:57"
  };
  return durations[youtubeId] || "1:00:00";
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
                style={{ backgroundImage: `url(${lecture.thumbnail})` }}
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