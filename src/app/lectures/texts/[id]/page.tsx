"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, User, Calendar, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { texts } from "../data";
import { use } from "react";

interface Props {
    params: Promise<{ id: string }>;
}

export default function TextPage({ params }: Props) {
    const { id } = use(params);
    const { language } = useLanguage();

    const article = texts.find((t) => t.id === id);
    if (!article) notFound();

    const title = language === "uk" ? article.title : article.titleEn;
    const author = language === "uk" ? article.author : article.authorEn;
    const content = language === "uk" ? article.text : article.textEn;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(language === "uk" ? "uk-UA" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-24">
            <div className="max-w-3xl mx-auto px-6">

                {/* Back */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                >
                    <Link
                        href="/lectures"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {language === "uk" ? "Назад до матеріалів" : "Back to materials"}
                    </Link>
                </motion.div>

                {/* Article */}
                <motion.article
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 px-8 py-10 text-white">
                        <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
                            <BookOpen className="w-4 h-4" />
                            {language === "uk" ? "Стаття" : "Article"}
                        </div>
                        <h1 className="text-2xl lg:text-3xl font-bold leading-snug mb-6">
                            {title}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-sm text-blue-100">
                            <span className="flex items-center gap-1.5">
                                <User className="w-4 h-4" /> {author}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" /> {formatDate(article.date)}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-8 py-10">
                        <div className="prose prose-slate max-w-none">
                            {content.split("\n").map((line: string, i: number) => {
                                if (line.trim() === "") return <br key={i} />;
                                return (
                                    <p key={i} className="text-slate-700 leading-relaxed mb-2 whitespace-pre-wrap">
                                        {line}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </motion.article>

                {/* Back footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="mt-8 text-center"
                >
                    <Link href="/lectures">
                        <motion.button
                            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:border-blue-300 hover:text-blue-600 transition-colors shadow-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {language === "uk" ? "До всіх матеріалів" : "All materials"}
                        </motion.button>
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
