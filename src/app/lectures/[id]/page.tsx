"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Play, Eye, MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { ref, get, set, push, onValue, increment } from "firebase/database";
import { database } from "@/lib/firebase";

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
    fullDescription: `✝️ **Участь віруючих у політичному процесі держави**

Одна з найактуальніших та найскладніших питань для вірян — як бути причетними до суспільного життя, розуміти політичні процеси і при цьому залишатися прив'язаними до своєї віри?

В нашій Біблійній Школі uebs.com.ua відбулася особливе обговорення на тему **"Участь віруючих у політичному процесі держави"** зі спікером **Ігором Плохим**, який дав глибокий аналіз цієї складної теми.

---

📖 **Основні питання, що розглядалися:**

🗳️ **Громадянський обов'язок віруючих**
Як вірянин може активно брати участь у виборчих процесах і прийнятті рішень в державі?
Чи це обов'язок перед Богом та суспільством?

⚖️ **Біблійна позиція щодо влади**
Апостол Павло говорив про те, що влада встановлена від Бога (Рим. 13:1-7).
Що це означає для нас сьогодні?
Як залишатися вірним своїм принципам, коли система іноді противиться таким принципам?

💭 **Совість і компроміс**
Як вірянин має голосувати, коли всі варіанти не ідеальні?
Де межа між участю і морально-етичною компромісністю?

✊ **Служіння суспільству**
Вірянин покликаний не тільки на духовне спасіння, але й на трансформацію суспільства.
Як це здійснюється на практиці?

🕊️ **Мир і справедливість**
Як вірянин може відстоювати справедливість і мир без насильства?
Які інструменти демократії ми маємо?

---

💡 **Ключові принципи:**

1. **Активність без фанатизму** — політика — це не релігія, але обов'язок перед суспільством
2. **Моральна стійкість** — вірянин не може голосувати за людей або ідеї, які противлять його переконанням
3. **Служіння найменшим** — політична участь мусить бути спрямована на захист вразливих верств суспільства
4. **Об'єднання, а не поділ** — вірянин має збирати суспільство, а не розділяти його по лініях ненависті
5. **Молитва як дія** — перш ніж голосувати, вірянин молиться, розмірковує, консультується з Писанням

---

🙏 **Висновок:**

Віра не відділена від реальності. Вірянин живе в цьому світі і мусить здійснювати позитивний вплив на нього. Участь у політичному процесі — це одна з форм служіння, мудрості та любові до ближніх.

**"Благословенні миротворці, бо вони будуть звані синами Божими" (Мт. 5:9)**`,
    fullDescriptionEn: `✝️ **Believers' Participation in the State's Political Process**

One of the most relevant and complex issues for believers is how to be involved in public life, understand political processes and remain committed to your faith at the same time?

At our Bible School uebs.com.ua, there was a special discussion on the topic of **"Believers' Participation in the State's Political Process"** with speaker **Igor Plokhy**, who provided a deep analysis of this complex topic.

---

📖 **Main issues discussed:**

🗳️ **Civic Duty of Believers**
How can a believer actively participate in electoral processes and decision-making in the state?
Is it a duty before God and society?

⚖️ **Biblical Position on Authority**
The Apostle Paul spoke about authority being established by God (Rom. 13:1-7).
What does this mean for us today?
How to remain faithful to one's principles when the system sometimes resists such principles?

💭 **Conscience and Compromise**
How should a believer vote when all options are not ideal?
Where is the line between participation and moral compromise?

✊ **Serving Society**
A believer is called not only to spiritual salvation, but also to the transformation of society.
How is this implemented in practice?

🕊️ **Peace and Justice**
How can a believer uphold justice and peace without violence?
What tools of democracy do we have?

---

💡 **Key Principles:**

1. **Activity without fanaticism** — politics is not religion, but a duty to society
2. **Moral resilience** — a believer cannot vote for people or ideas that contradict his convictions
3. **Service to the least** — political participation must be aimed at protecting vulnerable segments of society
4. **Unity, not division** — a believer must unite society, not divide it along lines of hatred
5. **Prayer as action** — before voting, a believer prays, reflects, consults Scripture

---

🙏 **Conclusion:**

Faith is not separated from reality. A believer lives in this world and must have a positive influence on it. Participation in the political process is one form of service, wisdom and love for neighbors.

**"Blessed are the peacemakers, for they will be called children of God" (Mt. 5:9)**`,
    thumbnail: `https://img.youtube.com/vi/XDRty1ClGjE/maxresdefault.jpg`,
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
    fullDescription: `✝️ **Громадянська позиція віруючих та функції влади**

На продовженні нашої розмови про роль віруючих у суспільстві, ми розглянули глибшу тему: як розуміти **громадянську позицію віруючих** та **функції влади** в демократичному суспільстві.

---

📖 **Основні аспекти громадянської позиції**

🤝 **Відповідальність перед спільнотою**
Віруючий не може бути байдужим до долі його народу і держави. Біблія закликає нас турбуватися про справедливість, захист вразливих і розвиток суспільства.

⚖️ **Розуміння функцій влади**
Влада встановлена від Бога для:
• захисту громадян
• забезпечення справедливості
• підтримки порядку та миру
• розвитку суспільства

🗳️ **Активна громадянська позиція**
Віруючий має право і обов'язок:
• голосувати на виборах
• висловлювати свою позицію
• поточувати владні структури
• пропонувати конструктивні рішення

💭 **Розуміння демократії**
Демократія — це система, яка захищає права меншості, дозволяє голос простих людей бути почутим, і забезпечує мирну зміну влади.

✊ **Демократичне активізм віруючих**
Віруючі мають бути видимою силою в суспільстві, яка:
• відстоює справедливість
• захищає права людини
• підтримує вразливих
• пропагує мирні методи вирішення конфліктів

---

🔍 **Ключові питання**

**Чому влада важлива для віруючих?**
Тому що влада впливає на життя всіх людей — захищає абортів сиріт, права людини, свободу совісті.

**Як віруючий може впливати на владу?**
1. Через голосування за чесних кандидатів
2. Через громадянське суспільство та правозахисні організації
3. Через молитву та інтерцесію
4. Через своє особистое приклад моралі
5. Через конструктивний критицизм і добрі поради

**Біблійна позиція щодо державної влади:**
*"Будь-яка влада від Бога, і встановлена влада від Бога" (Рим. 13:1)*
Це не означає, що влада завжди праведна — це означає, що вона встановлена для певної мети.

---

💡 **Висновок**

Громадянська позиція віруючих — це не політична партійність, а відданість справедливості, правді, і служіння суспільству через демократичні інструменти. Віруючий повинен бути голосом тих, хто не має голосу, і силою для позитивних змін у своїй країні.

**"Тішіся з радіючими і плач з плачущими" (Рим. 12:15)**`,
    fullDescriptionEn: `✝️ **Civic Position of Believers and Functions of Power**

Continuing our discussion on the role of believers in society, we explored a deeper topic: how to understand the **civic position of believers** and the **functions of power** in a democratic society.

---

📖 **Key Aspects of Civic Position**

🤝 **Responsibility to the Community**
A believer cannot be indifferent to the fate of his people and state. The Bible calls us to care about justice, protection of the vulnerable and the development of society.

⚖️ **Understanding the Functions of Power**
Power is established by God to:
• protect citizens
• ensure justice
• maintain order and peace
• develop society

🗳️ **Active Civic Position**
A believer has the right and duty to:
• vote in elections
• express their position
• monitor power structures
• propose constructive solutions

💭 **Understanding Democracy**
Democracy is a system that protects the rights of minorities, allows the voice of ordinary people to be heard, and ensures the peaceful transfer of power.

✊ **Democratic Activism of Believers**
Believers must be a visible force in society that:
• stands up for justice
• protects human rights
• supports the vulnerable
• promotes peaceful methods of conflict resolution

---

🔍 **Key Questions**

**Why is power important to believers?**
Because power affects the lives of all people — it protects orphans, human rights, and freedom of conscience.

**How can a believer influence power?**
1. By voting for honest candidates
2. Through civil society and human rights organizations
3. Through prayer and intercession
4. Through personal moral example
5. Through constructive criticism and good advice

**Biblical Position on State Authority:**
*"Everyone must submit himself to the governing authorities, for there is no authority except that which God has established" (Rom. 13:1)*
This does not mean that authority is always righteous — it means that it is established for a specific purpose.

---

💡 **Conclusion**

The civic position of believers is not party politics, but commitment to justice, truth, and serving society through democratic instruments. A believer should be a voice for those who have no voice and a force for positive change in his country.

**"Rejoice with those who rejoice; mourn with those who mourn" (Rom. 12:15)**`,
    thumbnail: `https://img.youtube.com/vi/0ak_EHjpIYA/maxresdefault.jpg`,
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
    fullDescription: `✝️ **Покликаний бути лідером**

Лідерство — це одне з найважливіших покликань у Божому царстві. Але що означає бути справжнім лідером, який керується не світськими амбіціями, а Божою волею?

В нашій Біблійній Школі uebs.com.ua відбулася важлива лекція на тему **"Покликаний бути лідером"** зі спікером **Тимонішиним Антоном**, який розкрив глибину духовного лідерства.

---

📖 **Що таке справжнє лідерство?**

Справжнє лідерство — це не позиція, не титул, і не влада над людьми. Це:
• **Служіння** — лідер служить іншим
• **Вплив** — лідер впливає на людей через приклад
• **Відповідальність** — лідер несе відповідальність за команду
• **Духовна зрілість** — лідер керується Святим Духом

---

🙏 **Біблійні приклади лідерства**

**Ісус — ідеальний лідер**
*"Йдіть за Мною..." (Мт. 4:19)*

Ісус показав, що лідерство — це:
• Служіння найменшим
• Любов до людей
• Готовність жертвувати собою
• Керування в істині

**Апостол Павло як лідер**
Павло показав, що лідер має:
• Духовний авторитет (не через страх, а через Дух)
• Наставлення й виховання (не командування)
• Особистий приклад ("Робіть так, я роблю")
• Служіння іншим

---

💡 **Ключові аспекти духовного лідерства**

1️⃣ **Велике серце для людей**
Лідер повинен любити людей і піклуватися про них.

2️⃣ **Характер перед здібностями**
У Біблії характер завжди важливіший за таланти. Бог шукає людей, яким можна довіряти, а не людей, які вміють робити дивовижні речі.

3️⃣ **Бачення від Бога**
Лідер повинен мати чітке розуміння, куди Бог веде. Без бачення люди розпилюються.

4️⃣ **Готовність навчатися**
Добрий лідер ніколи не припиняє навчатися. Він слухає Бога, радиться з мудрими, вчиться на помилках.

5️⃣ **Інвестування в людей**
Лідер розвиває майбутніх лідерів. Його успіх визначається не тим, скільки він може зробити сам, а тим, як багато людей він навчив робити.

6️⃣ **Смирення**
*"Хто найбільший серед вас, буде вам слугою" (Мт. 23:11)*
Смирення — це основа духовного лідерства.

---

⚡ **Виклики лідера**

🔥 **Випробування вірою**
Лідер часто стояти в складних ситуаціях. Але Бог обіцяє: *"Я не залишу тебе і не покину тебе" (Євр. 13:5)*

😔 **Критика і опір**
Не всі підтримують лідера. Це нормально. Ісус також зазнав критики і опору.

⏰ **Втомленість і вигорання**
Довга робота без відпочинку призводить до вигорання. Лідер повинен бережти себе і знати, коли потрібно передати деякі обов'язки.

---

🏃 **Практичні поради для лідера**

✅ **Молись регулярно** — лідер залежить від Бога
✅ **Будь чесним** — люди повважають чесність
✅ **Слухай людей** — розумій їхні потреби
✅ **Роби важкі рішення, але справедливі** — не уникай відповідальності
✅ **Визнай свої помилки** — це дає людям змогу довіряти тобі
✅ **Дбай про своїх людей** — вони — твоя найбільша цінність

---

🙏 **Висновок**

Лідер, покликаний Богом, — це не людина влади, а служитель, керуючись духовними принципами, любов'ю до людей і послухом Богові. Його вплив розповсюджується не через примус, але через приклад, доброту, мудрість і вірність.

**"А Дух Святий дає нам дух не боязні, але дух сили, любові й здорового розуму" (2 Тим. 1:7)**`,
    fullDescriptionEn: `✝️ **Called to Be a Leader**

Leadership is one of the most important callings in God's kingdom. But what does it mean to be a true leader, guided not by worldly ambitions, but by God's will?

At our Bible School uebs.com.ua, there was an important lecture on the topic of **"Called to Be a Leader"** with speaker **Anton Timonishin**, who revealed the depth of spiritual leadership.

---

📖 **What is True Leadership?**

True leadership is not a position, not a title, and not power over people. It is:
• **Service** — the leader serves others
• **Influence** — the leader influences people through example
• **Responsibility** — the leader is responsible for the team
• **Spiritual maturity** — the leader is guided by the Holy Spirit

---

🙏 **Biblical Examples of Leadership**

**Jesus — The Perfect Leader**
*"Follow Me..." (Mt. 4:19)*

Jesus showed that leadership is:
• Service to the least
• Love for people
• Willingness to sacrifice himself
• Leading in truth

**Apostle Paul as a Leader**
Paul showed that a leader must have:
• Spiritual authority (not through fear, but through the Spirit)
• Teaching and education (not commanding)
• Personal example ("Do as I do")
• Service to others

---

💡 **Key Aspects of Spiritual Leadership**

1️⃣ **A Great Heart for People**
A leader must love people and care for them.

2️⃣ **Character Before Abilities**
In the Bible, character is always more important than talents. God seeks people who can be trusted, not people who can do amazing things.

3️⃣ **Vision from God**
A leader must have a clear understanding of where God is leading. Without vision, people scatter.

4️⃣ **Willingness to Learn**
A good leader never stops learning. He listens to God, consults with the wise, learns from mistakes.

5️⃣ **Investing in People**
A leader develops future leaders. His success is determined not by how much he can do himself, but by how many people he has trained to do.

6️⃣ **Humility**
*"Whoever wants to become great among you must be your servant" (Mt. 23:11)*
Humility is the foundation of spiritual leadership.

---

⚡ **Challenges of a Leader**

🔥 **Faith Testing**
A leader often stands in difficult situations. But God promises: *"I will never leave you nor forsake you" (Heb. 13:5)*

😔 **Criticism and Resistance**
Not everyone supports the leader. This is normal. Jesus also faced criticism and resistance.

⏰ **Fatigue and Burnout**
Long work without rest leads to burnout. A leader must take care of himself and know when to delegate some responsibilities.

---

🏃 **Practical Advice for a Leader**

✅ **Pray regularly** — the leader depends on God
✅ **Be honest** — people respect honesty
✅ **Listen to people** — understand their needs
✅ **Make difficult but fair decisions** — don't avoid responsibility
✅ **Confess your mistakes** — it allows people to trust you
✅ **Take care of your people** — they are your greatest value

---

🙏 **Conclusion**

A leader called by God is not a person of power, but a servant guided by spiritual principles, love for people, and obedience to God. His influence spreads not through coercion, but through example, kindness, wisdom, and faithfulness.

**"For the Spirit God gave us does not make us timid, but gives us power, love and a sound mind" (2 Tim. 1:7)**`,
    thumbnail: `https://img.youtube.com/vi/1DFuvUa-8NQ/maxresdefault.jpg`,
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
    fullDescription: `✝️ **Лідерство в епоху викликів**

Остання п'ятниця мінулого тижня для нашої духовної сім'ї **Скинія Любови-Істини** була навчальною — **БІБЛІЙНА ШКОЛА**. Разом з викладачем **Антоном Тимонішиним** ми роздумували про **#ЛІДЕРСТВО В ЕПОХУ ВИКЛИКІВ**.

Справжнє **#лідерство** не народжується в тиші кабінетів — воно формується у вогні криз, у бурях, де інші мовчать, а лідери стоять.

---

📖 **1. Мойсей: #Лідерство починається з Божого голосу, а не людських оплесків**

#Ізраїль не хотів лідера, а Мойсей не хотів вести. Але Бог сказав:

*"Я буду з тобою." (Вих. 3:12)*

**#Лідер у час викликів** — це не той, хто впевнений у собі, а той, хто впевнений у Бозі. 
**#Лідери** народжуються не від амбіцій, а від **#покликання**. Той, кого **#Бог** посилає, ніколи не йде сам.

---

📖 **2. Давид: Виклик відкриває справжніх лідерів**

Коли Саул ховався, Давид вийшов.
Голіаф заговорив — і всі замовкли, окрім одного пастуха.

*"Хто цей необрізаний, що так зневажає війська Бога Живого?" (1 Сам. 17:26)*

**Виклик — це не катастрофа.** Це сцена, на якій Бог піднімає лідерів, яких готував у таємниці. Там, де всі бачать проблему — **#лідер** бачить можливість для Божої слави. Кризи розділяють амбітних і покликаних.

---

📖 **3. Неемія: #Лідерство — це не слова, а дія під тиском**

Коли #Єрусалим лежав у руїнах, ніхто не рухався. Але Неемія сказав:

*"Встаньмо та будуємо!" (Неем. 2:18)*

І в час постійних нападів, погроз і змов, вони будували з мечем у руці (Неем. 4:17).

**#Лідер** не плаче над руїнами — він піднімає тих, хто буде будувати. **#Лідерство** — це коли ти тримаєш цеглу однією рукою, а меч — іншою.

---

📖 **4. Ісус: Вершина лідерства — служити під натиском**

У найтяжчий час, коли учні розбігалися, **#Ісус** став на коліна і умив їм ноги (Ів. 13:14-15).

І водночас Він рухався до Хреста, де здобув найбільшу перемогу.
**#Лідерство** — це не влада над людьми, а **#хрест** заради людей.
Найвища позиція — це коліна.

---

☝🏻 **Висновок**

**#Криза** — це Божий інструмент для відкриття справжніх лідерів. 
**#Лідер** не тікає від бурі — він піднімається над нею. 
Виклик не ламає лідера — він проявляє його. 
**#Лідерство** — це коли твоє **"Так, Господи"** голосніше за чужі страхи. 
**#Бог** ніколи не піднімає комфортних — Він піднімає готових померти для себе та свого.

**#вивчення_писання**`,
    fullDescriptionEn: `✝️ **Leadership in Times of Crisis**

Last Friday of last week for our spiritual family **Tabernacle of Love-Truth** was educational — **BIBLE SCHOOL**. Together with teacher **Anton Timonishin**, we reflected on **#LEADERSHIP IN TIMES OF CRISIS**.

True **#leadership** is not born in the silence of offices — it is formed in the fire of crises, in storms, where others remain silent, and leaders stand.

---

📖 **1. Moses: #Leadership Begins with God's Voice, Not Human Applause**

#Israel didn't want a leader, and Moses didn't want to lead. But God said:

*"I will be with you." (Ex. 3:12)*

**#A leader in times of crisis** — is not one who is confident in himself, but one who is confident in God. 
**#Leaders** are born not from ambitions, but from **#calling**. The one whom **#God** sends is never alone.

---

📖 **2. David: Crisis Reveals True Leaders**

When Saul hid, David came out.
Goliath spoke — and everyone fell silent, except one shepherd.

*"Who is this uncircumcised who dares defy the armies of the living God?" (1 Sam. 17:26)*

**Crisis is not a disaster.** It is the stage on which God raises up the leaders He has prepared in secret. Where everyone sees a problem — **#the leader** sees an opportunity for God's glory. Crises separate the ambitious from the called.

---

📖 **3. Nehemiah: #Leadership — It's Not Words, But Action Under Pressure**

When #Jerusalem lay in ruins, no one moved. But Nehemiah said:

*"Let us arise and build!" (Neh. 2:18)*

And in a time of constant attacks, threats and plots, they built with a sword in their hand (Neh. 4:17).

**#The leader** doesn't cry over ruins — he raises up those who will build. **#Leadership** — is when you hold a brick in one hand and a sword in the other.

---

📖 **4. Jesus: The Height of Leadership — Serving Under Pressure**

In the darkest hour, when the disciples were fleeing, **#Jesus** knelt down and washed their feet (John 13:14-15).

And at the same time, He moved toward the Cross, where He won the greatest victory.
**#Leadership** — is not power over people, but **#the cross** for people.
The highest position — is on your knees.

---

☝🏻 **Conclusion**

**#Crisis** — is God's instrument for revealing true leaders. 
**#The leader** doesn't flee from the storm — he rises above it. 
Crisis doesn't break a leader — it reveals him. 
**#Leadership** — is when your **"Yes, Lord"** is louder than others' fears. 
**#God** never raises the comfortable — He raises those ready to die for themselves and their own.

**#bible_study**`,
    thumbnail: `https://img.youtube.com/vi/w0cRCx5i3OY/maxresdefault.jpg`,
    videoUrl: "https://www.youtube.com/embed/w0cRCx5i3OY"
  }
];

// Function to get video duration from YouTube (placeholder)
const getVideoDuration = (youtubeId: string) => {
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

export default function LecturePage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const lectureId = params.id as string;
  const [isMounted, setIsMounted] = useState(false);
  const { user, userProfile } = useAuth();
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Track views and load comments when lecture changes
    trackView();
    const unsubscribe = loadComments();
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [lectureId]);
  
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

  // Increments view count for the lecture; prevents double count per user via localStorage
  const trackView = async () => {
    try {
      if (!lectureId || !database) return;
      const storageKey = `lecture_viewed_${lectureId}`;
      const viewsRef = ref(database, `lectures/${lectureId}/views`);

      // Get current value to display
      const snap = await get(viewsRef);
      const current = (snap.exists() ? Number(snap.val()) : 0) || 0;
      setViews(current);

      // Only increment once per browser
      if (typeof window !== "undefined" && !localStorage.getItem(storageKey)) {
        await set(viewsRef, increment(1));
        localStorage.setItem(storageKey, "1");
        setViews((v) => v + 1);
      }
    } catch (e) {
      // Silent fail; keep UI responsive
    }
  };

  // Subscribes to comments in real-time; returns unsubscribe function
  const loadComments = () => {
    if (!lectureId || !database) return undefined as unknown as (() => void);
    const commentsRef = ref(database, `lectures/${lectureId}/comments`);
    const unsub = onValue(commentsRef, (snapshot) => {
      if (!snapshot.exists()) {
        setComments([]);
        return;
      }
      const data = snapshot.val() || {};
      const list = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      list.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
      setComments(list);
    });
    return unsub;
  };

  const handleSubmitComment = async () => {
    if (!user) return; // UI prevents, but double-guard
    const text = newComment.trim();
    if (!text) return;
    try {
      setSubmittingComment(true);
      const commentsRef = ref(database, `lectures/${lectureId}/comments`);
      const newRef = push(commentsRef);
      const payload = {
        text,
        userId: user.uid,
        userName: user.displayName || userProfile?.displayName || "Користувач",
        userPhotoURL: (userProfile?.photoURL || user.photoURL || "") as string,
        createdAt: Date.now(),
      };
      await set(newRef, payload);
      setNewComment("");
    } catch (e) {
      // Silent fail for now
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatCommentDate = (ts: number) => {
    const now = Date.now();
    const diffMs = Math.max(0, now - ts);
    const sec = Math.floor(diffMs / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const day = Math.floor(hr / 24);

    if (language === 'uk') {
      if (sec < 60) return `${sec} с тому`;
      if (min < 60) return `${min} хв тому`;
      if (hr < 24) return `${hr} год тому`;
      return `${day} дн тому`;
    } else {
      if (sec < 60) return `${sec}s ago`;
      if (min < 60) return `${min}m ago`;
      if (hr < 24) return `${hr}h ago`;
      return `${day}d ago`;
    }
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
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span className="font-medium">Перегляди:</span>
              <span>{views}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Коментарі:</span>
              <span>{comments.length}</span>
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

          {/* Comments Section */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Коментарі <span className="text-slate-500">({comments.length})</span>
              </h2>
            </div>

            {user ? (
              <div className="mb-6">
                <div className="flex items-start gap-3">
                  {((userProfile?.photoURL || user.photoURL)) ? (
                    <img
                      src={(userProfile?.photoURL || user.photoURL) as string}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex-1">
                    <textarea
                      className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                      rows={3}
                      placeholder={language === 'uk' ? "Напишіть коментар..." : "Write a comment..."}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handleSubmitComment}
                        disabled={submittingComment || !newComment.trim()}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        {submittingComment ? (language === 'uk' ? 'Надсилання...' : 'Sending...') : (language === 'uk' ? 'Надіслати' : 'Send')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 border border-slate-200 rounded-lg bg-slate-50 text-slate-700">
                {language === 'uk' ? (
                  <span>
                    Щоб залишити коментар, будь ласка, <Link href="/login" className="text-blue-600 hover:underline">увійдіть</Link>.
                  </span>
                ) : (
                  <span>
                    To leave a comment, please <Link href="/login" className="text-blue-600 hover:underline">log in</Link>.
                  </span>
                )}
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {comments.length === 0 ? (
                <div className="text-slate-500">{language === 'uk' ? 'Ще немає коментарів.' : 'No comments yet.'}</div>
              ) : (
                comments.map((c: any) => (
                  <div key={c.id} className="flex items-start gap-3">
                    {c.userPhotoURL ? (
                      <img src={c.userPhotoURL} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium text-slate-900">{c.userName || (language === 'uk' ? 'Користувач' : 'User')}</span>
                        <span className="text-slate-500">{c.createdAt ? formatCommentDate(c.createdAt) : ''}</span>
                      </div>
                      <div className="text-slate-800 whitespace-pre-wrap">{c.text}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* Previous and Next Lectures */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Previous Lecture */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>←</span> {language === 'uk' ? 'Попередня лекція' : 'Previous Lecture'}
              </h3>
              {(() => {
                const sortedLectures = [...lectures].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                const currentIndex = sortedLectures.findIndex(l => l.id === lectureId);
                const previousLecture = currentIndex < sortedLectures.length - 1 ? sortedLectures[currentIndex + 1] : null;

                if (!previousLecture) {
                  return (
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 text-center">
                      <p className="text-slate-500 mb-2">
                        {language === 'uk' ? '📚 Нема попередніх лекцій' : '📚 No previous lectures'}
                      </p>
                      <p className="text-sm text-slate-400">
                        {language === 'uk' ? 'Це перша лекція в цьому курсі' : 'This is the first lecture in this course'}
                      </p>
                    </div>
                  );
                }

                return (
                  <Link href={`/lectures/${previousLecture.id}`}>
                    <motion.div
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 h-full cursor-pointer"
                      whileHover={{ y: -4 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 mb-3 line-clamp-2 hover:text-blue-600">
                            {language === 'uk' ? previousLecture.title : previousLecture.titleEn}
                          </h4>
                          <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {language === 'uk' ? previousLecture.speaker : previousLecture.speakerEn}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(previousLecture.date)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })()}
            </div>

            {/* Next Lecture */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                {language === 'uk' ? 'Наступна лекція' : 'Next Lecture'} <span>→</span>
              </h3>
              {(() => {
                const sortedLectures = [...lectures].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                const currentIndex = sortedLectures.findIndex(l => l.id === lectureId);
                const nextLecture = currentIndex > 0 ? sortedLectures[currentIndex - 1] : null;

                if (!nextLecture) {
                  return (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 text-center">
                      <p className="text-slate-600 font-medium mb-2">
                        {language === 'uk' ? '✨ Наступна лекція не запланована' : '✨ Next lecture is not scheduled'}
                      </p>
                      <p className="text-sm text-slate-500">
                        {language === 'uk' ? 'Слідкуйте за оновленнями! Скоро буде нова лекція.' : 'Stay tuned! A new lecture will be coming soon.'}
                      </p>
                    </div>
                  );
                }

                return (
                  <Link href={`/lectures/${nextLecture.id}`}>
                    <motion.div
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 h-full cursor-pointer"
                      whileHover={{ y: -4 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 mb-3 line-clamp-2 hover:text-blue-600">
                            {language === 'uk' ? nextLecture.title : nextLecture.titleEn}
                          </h4>
                          <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {language === 'uk' ? nextLecture.speaker : nextLecture.speakerEn}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(nextLecture.date)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })()}
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