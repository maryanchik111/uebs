"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Play } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

// Real lectures data with full descriptions
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
    fullDescription: `✝️ **Біблійна Школа розпочалася з теми "Характер Творця".**

Характер Бога — це відображення Його природи, сутності та того, хто Він є насправді. Ми пізнаємо Його не з людських уявлень, а через **Біблію**, **Ісуса Христа** і дію **Святого Духа** в серці.

---

📖 Основні риси характеру Бога

💠 Святість
Бог є абсолютно чистий, безгрішний, відділений від усякого зла.  
*«Будьте святі, бо Я святий» (1 Пет. 1:16)*  
Святість — це фундамент Його характеру. Все інше виходить із цього.

❤️ Любов
Божа любов не залежить від наших заслуг — вона жертвенна, вірна і діюча.  
*«Бог є любов» (1 Ів. 4:8)*  
Найвищий вираз — **хрест Ісуса.**

⚖️ Справедливість
Все, що Бог робить — праведне.  
*«Праведний Господь, і правду любить» (Пс. 10:7)*  
Справедливість гарантує, що зло не залишиться без відповіді.

💧 Милість
Бог готовий прощати, лікувати, піднімати впалого.  
*«Щедрий і милосердий Господь» (Пс. 102:8)*  
Милість не заперечує справедливість — вона пропонує шлях спасіння.

🤍 Вірність
Бог ніколи не порушує Своїх обітниць.  
*«Він пробуває вірним» (2 Тим. 2:13)*  
Це основа нашої надії і молитви.

👁️ Всезнання
Бог знає все — минуле, теперішнє і майбутнє.  
*«Я проголошую кінець від початку» (Іс. 46:10)*

💪 Всесильність
Бог може все, що відповідає Його волі.  
*«Бо для Бога нічого немає неможливого» (Лк. 1:37)*

🌍 Всеприсутність
Бог присутній всюди.  
*«Куди піду від Твого Духа? ...» (Пс. 138:7–10)*

⏳ Довготерпіння
Бог не поспішає карати, дає шанс на покаяння.  
*«Він довготерпить… не бажаючи, щоб хтось загинув» (2 Пет. 3:9)*

🕊️ Незмінність
Бог не міняється — Його характер незмінний у всі часи.  
*«Я Господь, і Я не змінююся» (Мал. 3:6)*

---

✝️ Характер Бога у Христі

*«Хто бачив Мене — той бачив Отця» (Ів. 14:9)*

**Ісус показує серце Отця:**
• любив грішників, але ненавидів гріх  
• служив, а не вимагав служіння  
• говорив істину, навіть коли це було непопулярно  
• прощав, але закликав до покаяння

---

🌿 Чому важливо знати характер Бога?

1. Щоб **правильно вірити** — віра росте з пізнання Божої природи.  
2. Щоб **змінюватися** — ми стаємо подібними до Того, на кого дивимося.  
3. Щоб **служити правильно** — не зі страху, а з любові.  
4. Щоб **жити впевнено** — Бог не зраджує і не міняється.

---

🕊️ *"Серце Бога є джерелом життя, сили, миру і радості для кожного, хто шукає Його."*`,
    fullDescriptionEn: `✝️ **Bible School began with the theme "Character of the Creator".**

God's character is a reflection of His nature, essence and who He truly is. We know Him not from human perceptions, but through **the Bible**, **Jesus Christ** and the action of the **Holy Spirit** in the heart.

---

📖 Main features of God's character

💠 Holiness
God is absolutely pure, sinless, separated from all evil.  
*"Be holy, for I am holy" (1 Pet. 1:16)*  
Holiness is the foundation of His character. Everything else flows from this.

❤️ Love
God's love does not depend on our merits — it is sacrificial, faithful and active.  
*"God is love" (1 John 4:8)*  
The highest expression is **the cross of Jesus.**

⚖️ Justice
Everything God does is righteous.  
*"The Lord is righteous, and loves righteousness" (Ps. 11:7)*  
Justice guarantees that evil will not go unanswered.

💧 Mercy
God is ready to forgive, heal, lift up the fallen.  
*"Gracious and merciful is the Lord" (Ps. 103:8)*  
Mercy does not deny justice — it offers a path to salvation.

🤍 Faithfulness
God never breaks His promises.  
*"He remains faithful" (2 Tim. 2:13)*  
This is the foundation of our hope and prayer.

👁️ Omniscience
God knows everything — past, present and future.  
*"I declare the end from the beginning" (Is. 46:10)*

💪 Omnipotence
God can do everything that corresponds to His will.  
*"For nothing is impossible with God" (Luke 1:37)*

🌍 Omnipresence
God is present everywhere.  
*"Where shall I go from Your Spirit? ..." (Ps. 139:7–10)*

⏳ Long-suffering
God is not quick to punish, gives a chance for repentance.  
*"He is patient... not wanting anyone to perish" (2 Pet. 3:9)*

🕊️ Immutability
God does not change — His character is unchanging at all times.  
*"I the Lord do not change" (Mal. 3:6)*

---

✝️ God's Character in Christ

*"Whoever has seen Me has seen the Father" (John 14:9)*

**Jesus shows the heart of the Father:**
• loved sinners, but hated sin  
• served, rather than demanded service  
• spoke truth, even when it was unpopular  
• forgave, but called for repentance

---

🌿 Why is it important to know God's character?

1. To **believe correctly** — faith grows from knowing God's nature.  
2. To **change** — we become like the One we look at.  
3. To **serve correctly** — not out of fear, but out of love.  
4. To **live confidently** — God does not betray and does not change.

---

🕊️ *"The heart of God is the source of life, strength, peace and joy for everyone who seeks Him."*`,
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
    fullDescription: `✝️ Минулої п'ятниці в нашій Біблійній Школі uebs.com.ua відбулося особливе слухання на тему «Огляд послання до Єфесян».
Це був час глибокого занурення в одне з найпотужніших послань апостола Павла — лист, який відкриває велич Божої благодаті, #покликання Церкви та силу єдності у Христі.

Студенти разом досліджували ключові теми:
 • що означає бути обраними в Христі,
 • як #благодать змінює людське серце,
 • роль Церкви як Тіла Христового,
 • і як духовна зброя допомагає вистояти у щоденній боротьбі.

Було не просто слухання — це був час одкровень, молитви й особистого переосмислення, коли кожен міг побачити своє місце у Божому задумі.

Послання до Єфесян нагадало всім:

Ми не просто люди, ми — спадкоємці Неба.
Ми не самі — ми частина Його Церкви.
І коли ми стоїмо в єдності, Бог діє через нас!

👉 Щира подяка
Круковському Володимиру, викладачу Євроазіатського інституту вивчення Біблії,
за глибоке слово, мудрість і серце, сповнене Божої любові.
Ваше служіння надихає шукати глибше, жити сильніше й стояти твердо у вірі.

«Бо ми — Його творіння, створені в Христі Ісусі на добрі діла…»
(Еф. 2:10)
#ВИВЧЕННЯ_ПИСАННЯ`,
    fullDescriptionEn: `✝️ Last Friday at our Bible School uebs.com.ua there was a special lecture on "Overview of the Epistle to the Ephesians".
This was a time of deep immersion into one of the apostle Paul's most powerful epistles — a letter that reveals the majesty of God's grace, the #calling of the Church and the power of unity in Christ.

Students together explored key themes:
 • what it means to be chosen in Christ,
 • how #grace changes the human heart,
 • the role of the Church as the Body of Christ,
 • and how spiritual armor helps to stand in daily struggle.

It was not just a lecture — it was a time of revelations, prayer and personal rethinking, when everyone could see their place in God's plan.

The Epistle to the Ephesians reminded everyone:

We are not just people, we are heirs of Heaven.
We are not alone — we are part of His Church.
And when we stand in unity, God works through us!

👉 Sincere thanks
to Volodymyr Krukovsky, teacher at the Eurasian Institute for Bible Study,
for the deep word, wisdom and heart full of God's love.
Your ministry inspires to seek deeper, live stronger and stand firm in faith.

"For we are His workmanship, created in Christ Jesus for good works..."
(Eph. 2:10)
#BIBLE_STUDY`,
    thumbnail: `https://img.youtube.com/vi/DN7ZAsYSq2s/maxresdefault.jpg`,
    videoUrl: "https://www.youtube.com/embed/DN7ZAsYSq2s"
  }
];

// Function to get video duration from YouTube (placeholder)
const getVideoDuration = (youtubeId: string) => {
  const durations: { [key: string]: string } = {
    "d1fM8Fl52qc": "2:25:38",
    "DN7ZAsYSq2s": "2:27:57"
  };
  return durations[youtubeId] || "1:00:00";
};

export default function LecturePage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const lectureId = params.id as string;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const lecture = lectures.find(l => l.id === lectureId);

  if (!lecture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Лекцію не знайдено</h1>
          <Link href="/lectures" className="text-blue-600 hover:text-blue-800">
            Повернутися до списку лекцій
          </Link>
        </div>
      </div>
    );
  }

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
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/lectures">
            <motion.button
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              {t("lectures.back")}
            </motion.button>
          </Link>
        </motion.div>

        {/* Video Player */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="aspect-video bg-black rounded-t-2xl flex items-center justify-center">
            <iframe
              src={lecture.videoUrl}
              title={language === 'uk' ? lecture.title : lecture.titleEn}
              className="w-full h-full rounded-t-2xl"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Lecture Info */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            {language === 'uk' ? lecture.title : lecture.titleEn}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 mb-8 text-slate-600">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{t("lectures.speaker")}:</span>
              <span>{language === 'uk' ? lecture.speaker : lecture.speakerEn}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{t("lectures.date")}:</span>
              <span>{formatDate(lecture.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-medium">{t("lectures.duration")}:</span>
              <span>{getVideoDuration(lecture.youtubeId)}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {t("lectures.description")}
            </h2>
            <div className="text-slate-700 leading-relaxed text-lg prose prose-slate max-w-none">
              <div dangerouslySetInnerHTML={{
                __html: (language === 'uk' ? lecture.fullDescription : lecture.fullDescriptionEn)
                  .replace(/\n/g, '<br />')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/### (.*)/g, '<h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">$1</h3>')
                  .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">$1</h2>')
                  .replace(/• (.*)/g, '<li class="ml-4">$1</li>')
                  .replace(/---/g, '<hr class="my-6 border-slate-300" />')
              }} />
            </div>
          </div>
        </motion.div>

        {/* Related Lectures */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Інші лекції
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {lectures
              .filter(l => l.id !== lectureId)
              .slice(0, 4)
              .map(relatedLecture => (
                <Link key={relatedLecture.id} href={`/lectures/${relatedLecture.id}`}>
                  <motion.div
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
                    whileHover={{ y: -2 }}
                  >
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                      {language === 'uk' ? relatedLecture.title : relatedLecture.titleEn}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {language === 'uk' ? relatedLecture.speaker : relatedLecture.speakerEn}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {getVideoDuration(relatedLecture.youtubeId)}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}