"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import {
    Target,
    Compass,
    Quote,
    CheckCircle2,
    Users,
    BookOpen,
    ShieldCheck,
    Globe
} from "lucide-react";

export default function AboutPage() {
    const { t } = useLanguage();

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const values = [
        { title: t("about.values.item1.title"), text: t("about.values.item1.text"), icon: BookOpen },
        { title: t("about.values.item2.title"), text: t("about.values.item2.text"), icon: ShieldCheck },
        { title: t("about.values.item3.title"), text: t("about.values.item3.text"), icon: Target },
        { title: t("about.values.item4.title"), text: t("about.values.item4.text"), icon: Users },
        { title: t("about.values.item5.title"), text: t("about.values.item5.text"), icon: Globe },
    ];

    const striveItems = [
        t("about.strive.item1"),
        t("about.strive.item2"),
        t("about.strive.item3"),
        t("about.strive.item4"),
        t("about.strive.item5"),
    ];

    const importanceItems = [
        t("about.importance.item1"),
        t("about.importance.item2"),
        t("about.importance.item3"),
        t("about.importance.item4"),
    ];

    const placeItems = [
        t("about.place.item1"),
        t("about.place.item2"),
        t("about.place.item3"),
        t("about.place.item4"),
    ];

    const keyGoals = [
        { title: t("about.keygoals.item1.title"), text: t("about.keygoals.item1.text") },
        { title: t("about.keygoals.item2.title"), text: t("about.keygoals.item2.text") },
        { title: t("about.keygoals.item3.title"), text: t("about.keygoals.item3.text") },
        { title: t("about.keygoals.item4.title"), text: t("about.keygoals.item4.text") },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    {...fadeIn}
                >
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 mt-10">
                        {t("about.title")}
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        {t("about.subtitle")}
                    </p>
                </motion.div>

                {/* Goal Description Section */}
                <section className="mb-20">
                    <motion.div
                        className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-blue-100"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col lg:flex-row gap-12 items-center">
                            <div className="lg:w-2/3">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <Target className="w-8 h-8 text-amber-500" />
                                    {t("about.goal.title")}
                                </h2>
                                <p className="text-lg text-slate-700 leading-relaxed mb-8">
                                    {t("about.goal.description")}
                                </p>
                                <p className="text-slate-600 italic">
                                    {t("about.summary")}
                                </p>
                            </div>
                            <div className="lg:w-1/3 grid grid-cols-1 gap-4">
                                {striveItems.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Mission & Importance */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <Quote className="absolute -top-10 -right-10 w-48 h-48 opacity-10" />
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Compass className="w-8 h-8 text-amber-400" />
                            {t("about.mission.title")}
                        </h2>
                        <p className="text-lg text-blue-50 leading-relaxed mb-8">
                            {t("about.mission.text")}
                        </p>
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                            <p className="italic text-blue-100 mb-2">{t("about.quote.eph411")}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-3xl shadow-lg p-10 border border-slate-100"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">{t("about.importance.title")}</h2>
                        <div className="space-y-6">
                            {importanceItems.map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2.5 flex-shrink-0" />
                                    <p className="text-lg text-slate-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* School Description Quote Section */}
                <section className="mb-20 text-center">
                    <motion.div
                        className="max-w-4xl mx-auto"
                        {...fadeIn}
                    >
                        <div className="mb-10 p-8 bg-amber-50 rounded-2xl border border-amber-100 shadow-sm">
                            <p className="text-2xl font-serif text-slate-800 italic leading-snug">
                                {t("about.quote.2tim22")}
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            {t("about.description.text")}
                        </p>
                    </motion.div>
                </section>

                {/* Values Section */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">{t("about.values.title")}</h2>
                        <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                className="bg-white p-6 rounded-2xl shadow-md border border-slate-50 text-center hover:shadow-lg transition-shadow"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{value.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Place & Vision */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        className="bg-white rounded-3xl shadow-lg p-10 border border-slate-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">{t("about.place.title")}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {placeItems.map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-center">
                                    <p className="text-slate-800 font-bold text-center">{item}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-3xl font-bold mb-6">{t("about.vision.title")}</h2>
                        <p className="text-lg text-slate-300 leading-relaxed mb-8">
                            {t("about.vision.text")}
                        </p>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-amber-400 font-serif italic text-lg">{t("about.quote.col316")}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Key Goals Section */}
                <section className="mb-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">{t("about.keygoals.title")}</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {keyGoals.map((goal, i) => (
                            <motion.div
                                key={i}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all h-full"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="text-amber-500 font-bold text-4xl mb-4 opacity-50">0{i + 1}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{goal.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{goal.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Content & Vision (Context) */}
                <motion.div
                    className="text-center bg-blue-50 rounded-3xl p-12 border border-blue-100"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">{t("about.context.title")}</h2>
                    <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
                        {t("about.context.text")}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
