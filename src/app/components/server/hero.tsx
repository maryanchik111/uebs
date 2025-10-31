"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const NEXT_LECTURE = new Date("2025-11-07T19:00:00"); // Set your next lecture date here

export default function Hero() {
  const [expanded, setExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = NEXT_LECTURE.getTime() - now.getTime();

      if (difference <= 0) {
        return "Лекція почалась";
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      return `${days}д ${hours}г ${minutes}хв`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    setTimeLeft(calculateTimeLeft()); // Initial calculation

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      aria-labelledby="uebs-vision"
      style={{
        padding: "3rem 1.5rem",
        background: "rgba(2, 24, 40, 1)",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 480px", minWidth: 280 }}>
            <img src="/logo-white.svg" alt="" />
            <h1
              id="uebs-vision"
              style={{
                fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)",
                lineHeight: 1.05,
                margin: 0,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#fff",
                textShadow: "0 6px 18px rgba(3,10,23,0.6)",
              }}
            >
              UEBSchool — Біблійна школа
            </h1>

            <p
              style={{
                marginTop: ".6rem",
                marginBottom: "1rem",
                color: "rgba(255,255,255,0.9)",
                fontSize: "1rem",
              }}
            >
              Духовно‑освітнє середовище, де Слово Боже, молитва та спільність
              формують зрілих служителів —
              носіїв світла, правди й благодаті. Заняття вечорами, 2 рази на
              місяць. Місто Рівне.
            </p>

            <div className="mb-2">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "rgba(255,255,255,0.05)",
                  padding: ".75rem 1rem",
                  borderRadius: 8,
                  marginTop: ".25rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: ".9rem",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  > <strong>Наступна лекція </strong> 
                    {NEXT_LECTURE.toLocaleDateString("uk-UA", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "#f79e0b",
                      fontWeight: 600,
                      marginTop: ".25rem",
                    }}
                  >
                    До початку: {timeLeft}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
              <Link
                href="/apply"
                style={{
                  display: "inline-block",
                  padding: ".65rem 1rem",
                  background: "linear-gradient(90deg,#f59e0b,#ef4444)",
                  color: "#061425",
                  fontWeight: 700,
                  borderRadius: 10,
                  boxShadow: "0 8px 24px rgba(239,68,68,0.18)",
                  transition: "transform .12s ease",
                  textDecoration: "none",
                }}
              >
                Записатися
              </Link>
              <Link
                href="/online-lecture"
                style={{
                  display: "inline-block",
                  padding: ".65rem 1rem",
                  background: "linear-gradient(90deg,#f79e0b,#ef4554)",
                  color: "#061425",
                  fontWeight: 700,
                  borderRadius: 10,
                  boxShadow: "0 8px 24px rgba(239,68,68,0.18)",
                  transition: "transform .12s ease",
                  textDecoration: "none",
                }}
              >
                Онлайн лекція
              </Link>
            </div>

            <ul
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1.25rem",
                padding: 0,
                listStyle: "none",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <li
                style={{
                  display: "flex",
                  gap: ".5rem",
                  alignItems: "center",
                  fontSize: ".95rem",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 2v20"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 7h14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Слово як основа
              </li>
              <li
                style={{
                  display: "flex",
                  gap: ".5rem",
                  alignItems: "center",
                  fontSize: ".95rem",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 3c.9 1.5 2 2.9 2 5 0 3.5-4 6-4 6s-4-2.5-4-6c0-2.1 1.1-3.5 2-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Дух Святий — наставник
              </li>
              <li
                style={{
                  display: "flex",
                  gap: ".5rem",
                  alignItems: "center",
                  fontSize: ".95rem",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10l5-3 5 3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Учень як місіонер
              </li>
            </ul>
          </div>

          <div
            className="w-full"
            style={{
              maxWidth: 512,
              minWidth: 260,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(3,10,23,0.6)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            }}
          >
            <div
              style={{
                position: "relative",
                height: 240,
                background:
                  "linear-gradient(135deg,#0ea5e9 0%, #7c3aed 100%)",
              }}
            >
              <img
                src="/24nov.jpeg"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              <div
                style={{
                  position: "absolute",
                  left: 16,
                  bottom: 16,
                  color: "#fff",
                }}
              >
                <div style={{ fontSize: ".9rem", fontWeight: 700 }}>
                  UEBSchool • Рівне
                </div>
                <div
                  style={{
                    fontSize: ".8rem",
                    opacity: 0.95,
                    marginTop: 4,
                  }}
                >
                  50 зустрічей · Вечірні заняття
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "1rem 1.1rem",
                color: "rgba(255,255,255,0.95)",
              }}
            >
              <div style={{ fontSize: ".95rem", marginBottom: ".5rem" }}>
                Формат — очний / змішаний
              </div>
              <div
                style={{
                  fontSize: ".85rem",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Програма: Основи віри, служіння, лідерство та практика.
                Підготовка для служіння в церкві й громаді.
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <article
            style={{
              background: "rgba(255,255,255,0.03)",
              padding: "1rem",
              borderRadius: 10,
            }}
          >
            <h4 style={{ margin: 0, fontSize: "1rem" }}>СЛОВО</h4>
            <p
              style={{
                marginTop: ".4rem",
                marginBottom: 0,
                color: "rgba(255,255,255,0.85)",
                fontSize: ".94rem",
              }}
            >
              Усе навчання укорінене в Святому Письмі — щоб жити й служити згідно з
              Божою волею.
            </p>
          </article>

          <article
            style={{
              background: "rgba(255,255,255,0.03)",
              padding: "1rem",
              borderRadius: 10,
            }}
          >
            <h4 style={{ margin: 0, fontSize: "1rem" }}>ДУХ</h4>
            <p
              style={{
                marginTop: ".4rem",
                marginBottom: 0,
                color: "rgba(255,255,255,0.85)",
                fontSize: ".94rem",
              }}
            >
              Напрямок практики та формування характеру через життя під
              керівництвом Духа Святого.
            </p>
          </article>

          <article
            style={{
              background: "rgba(255,255,255,0.03)",
              padding: "1rem",
              borderRadius: 10,
            }}
          >
            <h4 style={{ margin: 0, fontSize: "1rem" }}>СЛУЖІННЯ</h4>
            <p
              style={{
                marginTop: ".4rem",
                marginBottom: 0,
                color: "rgba(255,255,255,0.85)",
                fontSize: ".94rem",
              }}
            >
              Підготовка для практичного служіння в церкві, сім&apos;ї та
              громаді — служити з любов`&apos;`ю та істинністю.
            </p>
          </article>
        </div>

        <video
          src="/video.MP4"
          className="rounded-lg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
        />

        <div style={{ display: "grid", gap: "2rem" }}>
          {/* Values Container */}
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
              padding: "1.5rem",
              borderRadius: 14,
              color: "rgba(255,255,255,0.95)",
              boxShadow: "0 12px 30px rgba(3,10,23,0.45)",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "1.15rem",
                fontWeight: 700,
              }}
            >
              Цінності UEBSchool
            </h3>

            <div
              style={{
                marginTop: "1.25rem",
                display: "grid",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  padding: "1.25rem",
                  borderRadius: 12,
                }}
              >
                {/* First 3 values always visible */}
                <div style={{ display: "grid", gap: "1.25rem" }}>
                  <div>
                    <strong>1. Заява про віру</strong>
                    <div
                      style={{
                        marginTop: ".35rem",
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      Ми цінуємо та поважаємо нашу Заяву про віру, бо вона ґрунтується
                      на незмінному Слові Божому.
                      <p className="text-sm mt-2">
                        <strong>Підтвердження з Писання</strong>: 2 Тим. 3:16–17; Пс.
                        119:105; Ів. 17:17
                      </p>
                    </div>
                  </div>

                  <div style={{ fontSize: ".98rem", lineHeight: 1.45 }}>
                    <strong>2. Мораль</strong>
                    <div
                      style={{
                        marginTop: ".35rem",
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      Ми цінуємо найвищі етичні та моральні стандарти, бо віримо, що
                      Святе Письмо встановлює Божий кодекс поведінки для Його дітей.
                      <p className="text-sm">
                        <strong>Підтвердження з Писання</strong>: 1 Пет. 1:15–16; Гал.
                        5:22–23; Мих. 6:8
                      </p>
                    </div>
                  </div>

                  <div style={{ fontSize: ".98rem", lineHeight: 1.45 }}>
                    <strong>3. Святість життя</strong>
                    <div
                      style={{
                        marginTop: ".35rem",
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      Ми цінуємо людське життя, бо віримо, що воно походить від Бога.
                      <p className="text-sm">
                        <strong>Підтвердження з Писання</strong>: Бут. 1:27; Пс.
                        138:13–14; Іов 33:4
                      </p>
                    </div>
                  </div>
                </div>

                {expanded && (
                  <>
                    {/* Values 4-8 with same structure */}
                    <div>
                      <strong>4. Святість шлюбу</strong>
                      <div
                        style={{
                          marginTop: ".35rem",
                          color: "rgba(255,255,255,0.85)",
                        }}
                      >
                        Ми цінуємо інститут шлюбу, який встановив Сам Бог між чоловіком
                        і жінкою на початку творіння.
                        <p className="text-sm mt-2">
                          <strong>Підтвердження з Писання</strong>: Бут. 2:24; Мт.
                          19:4–6; Євр. 13:4
                        </p>
                      </div>
                    </div>

                    <div style={{ fontSize: ".98rem", lineHeight: 1.45 }}>
                      <strong>5. Командна робота</strong>
                      <div
                        style={{
                          marginTop: ".35rem",
                          color: "rgba(255,255,255,0.85)",
                        }}
                      >
                        Ми цінуємо спільну працю як команду, визнаючи, що тіло Христове
                        складається з багатьох членів.
                        <p className="text-sm">
                          <strong>Підтвердження з Писання</strong>: Еккл. 4:9–10; 1
                          Кор. 12:12; Фил. 2:2
                        </p>
                      </div>
                    </div>

                    <div style={{ fontSize: ".98rem", lineHeight: 1.45 }}>
                      <strong>6. Досконалість в освіті</strong>
                      <div
                        style={{
                          marginTop: ".35rem",
                          color: "rgba(255,255,255,0.85)",
                        }}
                      >
                        Ми цінуємо прагнення до досконалості в освіті, вірячи, що Бог
                        покликав нас робити все як для Нього.
                        <p className="text-sm">
                          <strong>Підтвердження з Писання</strong>: Кол. 3:23; Прип.
                          22:29; 2 Пет. 1:5–7
                        </p>
                      </div>
                    </div>

                    <div style={{ fontSize: ".98rem", lineHeight: 1.45 }}>
                      <strong>7. Взаємна повага</strong>
                      <div
                        style={{
                          marginTop: ".35rem",
                          color: "rgba(255,255,255,0.85)",
                        }}
                      >
                        Ми цінуємо кожного члена спільноти, виявляючи взаємну повагу,
                        чуйність і любов.
                        <p className="text-sm">
                          <strong>Підтвердження з Писання</strong>: Рим. 12:10; Фил.
                          2:3–4; 1 Пет. 3:8
                        </p>
                      </div>
                    </div>

                    <div style={{ fontSize: ".98rem", lineHeight: 1.45 }}>
                      <strong>8. Лідерство-служіння</strong>
                      <div
                        style={{
                          marginTop: ".35rem",
                          color: "rgba(255,255,255,0.85)",
                        }}
                      >
                        Ми цінуємо лідерство-служіння, яке Ісус Христос показав
                        власним життям.
                        <p className="text-sm">
                          <strong>Підтвердження з Писання</strong>: Мт. 20:26–28; Ів.
                          13:14–15; 1 Пет. 5:2–3
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setExpanded(!expanded)}
                className="hover:bg-white/10 transition-colors mt-4"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: ".5rem 1rem",
                  borderRadius: 8,
                  color: "rgba(255,255,255,0.9)",
                  cursor: "pointer",
                  width: "fit-content",
                  fontSize: ".9rem",
                }}
              >
                {expanded ? "Згорнути" : "Читати далі..."}
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
            padding: "1.25rem",
            borderRadius: 14,
            color: "rgba(255,255,255,0.95)",
            boxShadow: "0 12px 30px rgba(3,10,23,0.45)",
          }}
        >
          <div
            style={{
              marginTop: "1.5rem",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
              padding: "1.25rem",
              borderRadius: 14,
              color: "rgba(255,255,255,0.95)",
              boxShadow: "0 12px 30px rgba(3,10,23,0.45)",
            }}
          >
            <h3 
              style={{
                margin: 0,
                fontSize: "1.15rem",
                fontWeight: 700,
              }}
            >
              СТРУКТУРА ТА ПРИНЦИПИ НАВЧАННЯ UEBSchool
            </h3>

            <div style={{ marginTop: ".8rem", display: "grid", gap: ".6rem" }}>
              <div style={{ fontSize: ".98rem", lineHeight: 1.45 }}>
                <strong>1. Загальна концепція</strong>
                <div
                  style={{
                    marginTop: ".35rem",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  UEBSchool — це духовно‑освітня програма для формування зрілих
                  учнів Христа, укорінених у Слові Божому,
                  оснащених для служіння й впливу на покоління в дусі любові та
                  істини. Навчання не лише передає знання,
                  а й трансформує життя, розвиває характер та відкриває дію
                  благодаті Святого Духа.
                </div>
              </div>

              <div style={{ fontSize: ".98rem", lineHeight: 1.45 }}>
                <strong>2. Формат навчання</strong>
                <ul
                  style={{
                    marginTop: ".35rem",
                    marginBottom: 0,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  <li>
                    Заняття два рази на місяць (через тиждень), вечірній час —
                    19:00 (п’ятниця).
                  </li>
                  <li>Формат: очний або змішаний (онлайн/офлайн).</li>
                  <li>
                    Структура дозволяє поєднувати служіння, роботу та сім&apos;ю з
                    регулярним духовним і академічним зростанням.
                  </li>
                </ul>

                <div
                  style={{
                    marginTop: ".45rem",
                    fontSize: ".9rem",
                    color: "rgba(255,255,255,0.78)",
                  }}
                >
                  Біблійне підґрунтя: Пс. 1:2–3; 2 Тим. 2:15
                </div>
              </div>

              <div style={{ fontSize: ".98rem", lineHeight: 1.45 }}>
                <strong>3. Мета навчання</strong>
                <div
                  style={{
                    marginTop: ".35rem",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  Виховати покоління лідерів, які: знають Слово Божe й
                  застосовують його, мають характер Христа,
                  готові служити в Церкві, суспільстві й світі, несуть світло
                  Євангелії з мудрістю та любов’ю.
                </div>
              </div>
            </div>
          </div>

          {/* -- Додано: Повна програма (I — VII) з "читати далі" -- */}
          <div
            style={{
              marginTop: "1.25rem",
              background: "rgba(255,255,255,0.02)",
              padding: "1rem",
              borderRadius: 12,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  Повна програма — 50 зустрічей
                </h3>
                <p
                  style={{
                    marginTop: ".4rem",
                    marginBottom: ".8rem",
                    color: "rgba(255,255,255,0.86)",
                  }}
                >
                  Формат: 50 зустрічей по 2 години. Кожна зустріч: тема, біблійний
                  текст, практична дискусія, молитва та застосування.
                </p>
              </div>

              <div>
                <button
                  onClick={() => setExpanded((s) => !s)}
                  aria-expanded={expanded}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff",
                    padding: ".45rem .8rem",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {expanded ? "Згорнути" : "Читати далі"}
                </button>
              </div>
            </div>

            <div
              style={{
                overflow: "hidden",
                transition: "max-height 320ms ease, opacity 220ms ease",
                maxHeight: expanded ? 6000 : 0,
                opacity: expanded ? 1 : 0,
                marginTop: expanded ? ".8rem" : 0,
              }}
              aria-hidden={!expanded}
            >
              <div style={{ display: "grid", gap: ".75rem", paddingTop: ".6rem" }}>
                <section
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    padding: ".8rem",
                    borderRadius: 10,
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: "1rem" }}>
                    I. ОСНОВИ ВІРИ ТА СПАСІННЯ (1–10)
                  </h4>
                  <ol
                    style={{
                      marginTop: ".5rem",
                      color: "rgba(255,255,255,0.88)",
                    }}
                  >
                    <li>
                      Вступ до Біблії — натхнення, авторитет і непомильність (2 Тим.
                      3:16–17).
                    </li>
                    <li>Бог у трьох Особах — Трійця (Матв. 28:19).</li>
                    <li>
                      Бог-Творець і образ Божий у людині (Бут. 1:26–27).
                    </li>
                    <li>Гріхопадіння і його наслідки (Бут. 3; Рим. 3:23).</li>
                    <li>
                      Спасіння через Христа — план викуплення (Ів. 3:16; Еф. 2:8–9).
                    </li>
                    <li>Покаяння, віра і нове народження (Ів. 3:3; Дії 2:38).</li>
                    <li>
                      Хрещення водою і Духом Святим (Матв. 28:19; Дії 1:8).
                    </li>
                    <li>
                      Освячення — процес уподібнення Христу (1 Сол. 4:3).
                    </li>
                    <li>
                      Благодать і закон — старий і новий завіт (Рим. 6:14; Євр. 8:6–
                      13).
                    </li>
                    <li>
                      Християнин і впевненість у спасінні (1 Ів. 5:11–13).
                    </li>
                  </ol>
                </section>

                <section
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    padding: ".8rem",
                    borderRadius: 10,
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: "1rem" }}>
                    II. БІБЛІЙНЕ ДОСЛІДЖЕННЯ (11–20)
                  </h4>
                  <ol
                    style={{
                      marginTop: ".5rem",
                      color: "rgba(255,255,255,0.88)",
                    }}
                  >
                    <li>Структура Біблії: Старий і Новий Завіт.</li>
                    <li>П’ятикнижжя Мойсеєве — закон і благодать.</li>
                    <li>
                      Пророки і месіанські передвістя (Іс. 53; Мих. 5:2).
                    </li>
                    <li>Євангелія — життя і вчення Ісуса.</li>
                    <li>Дії апостолів — народження Церкви.</li>
                    <li>Послання Павла — благодать у дії.</li>
                    <li>
                      Послання Якова, Петра, Івана, Юди — практичне християнство.
                    </li>
                    <li>Об’явлення Івана — вічність і Царство Боже.</li>
                    <li>Біблійна географія і історія спасіння.</li>
                    <li>
                      Як досліджувати Біблію самостійно (Єр. 15:16; 2 Тим. 2:15).
                    </li>
                  </ol>
                </section>

                <section
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    padding: ".8rem",
                    borderRadius: 10,
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: "1rem" }}>
                    III. ДУХОВНЕ ФОРМУВАННЯ І ХАРАКТЕР (21–30)
                  </h4>
                  <ol
                    style={{
                      marginTop: ".5rem",
                      color: "rgba(255,255,255,0.88)",
                    }}
                  >
                    <li>
                      Учнівство — поклик до наслідування Христа (Матв. 4:19).
                    </li>
                    <li>Молитва як дихання духу (Матв. 6:9–13).</li>
                    <li>Піст і духовна дисципліна.</li>
                    <li>
                      Святість у повсякденному житті (1 Пет. 1:15–16).
                    </li>
                    <li>Плід Духа Святого (Гал. 5:22–25).</li>
                    <li>
                      Христоподібний характер (Фил. 2:5–8).
                    </li>
                    <li>
                      Перемога над гріхом і спокусами (1 Кор. 10:13).
                    </li>
                    <li>Віра, надія і любов (1 Кор. 13).</li>
                    <li>
                      Прощення і внутрішнє зцілення (Матв. 18:21–35).
                    </li>
                    <li>
                      Розпізнавання духовних атак і захист вірою (Еф. 6:10–18).
                    </li>
                  </ol>
                </section>

                <section
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    padding: ".8rem",
                    borderRadius: 10,
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: "1rem" }}>
                    IV. СЛУЖІННЯ І ЛІДЕРСТВО (31–38)
                  </h4>
                  <ol
                    style={{
                      marginTop: ".5rem",
                      color: "rgba(255,255,255,0.88)",
                    }}
                  >
                    <li>
                      Покликання — Божий план для мого життя (Єр. 1:5).
                    </li>
                    <li>
                      Дари Духа Святого (1 Кор. 12; Рим. 12:6–8).
                    </li>
                    <li>
                      Лідерство-служіння (Ів. 13:14–15).
                    </li>
                    <li>
                      Проповідництво і сила Слова (2 Тим. 4:2).
                    </li>
                    <li>
                      Євангелізація — серце Божої місії (Матв. 28:19–20).
                    </li>
                    <li>
                      Навчання і наставництво (2 Тим. 2:2).
                    </li>
                    <li>
                      Командна робота і єдність (Еф. 4:3–13).
                    </li>
                    <li>
                      Практика служіння: молитва, поклоніння, взаємопідтримка (Кол.
                      3:16–17).
                    </li>
                  </ol>
                </section>

                <section
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    padding: ".8rem",
                    borderRadius: 10,
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: "1rem" }}>
                    V. СІМ’Я І ХРИСТИЯНСЬКЕ ЖИТТЯ (39–43)
                  </h4>
                  <ol
                    style={{
                      marginTop: ".5rem",
                      color: "rgba(255,255,255,0.88)",
                    }}
                  >
                    <li>Божий задум для шлюбу (Бут. 2:24).</li>
                    <li>Роль чоловіка і дружини (Еф. 5:22–33).</li>
                    <li>Виховання дітей у Господі (Еф. 6:4).</li>
                    <li>Мораль і чистота у XXI столітті.</li>
                    <li>
                      Домашня церква — сім’я як духовна спільнота (Іс.Нав. 24:15).
                    </li>
                  </ol>
                </section>

                <section
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    padding: ".8rem",
                    borderRadius: 10,
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: "1rem" }}>
                    VI. ЦЕРКВА І СУСПІЛЬСТВО (44–47)
                  </h4>
                  <ol
                    style={{
                      marginTop: ".5rem",
                      color: "rgba(255,255,255,0.88)",
                    }}
                  >
                    <li>Церква як тіло Христове (1 Кор. 12:27).</li>
                    <li>Єдність у різноманітті (Ів. 17:21).</li>
                    <li>
                      Християнин у суспільстві: сіль і світло (Матв. 5:13–16).
                    </li>
                    <li>
                      Християнська етика, відповідальність і вплив на культуру (Рим.
                      12:1–2).
                    </li>
                  </ol>
                </section>

                <section
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    padding: ".8rem",
                    borderRadius: 10,
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: "1rem" }}>
                    VII. ПРОРОЧЕ СЛОВО І МАЙБУТНЄ (48–50)
                  </h4>
                  <ol
                    style={{
                      marginTop: ".5rem",
                      color: "rgba(255,255,255,0.88)",
                    }}
                  >
                    <li>
                      Ознаки часу і духовне розпізнання подій (Матв. 24).
                    </li>
                    <li>
                      Другий прихід Христа і воскресіння мертвих (1 Сол. 4:16–17).
                    </li>
                    <li>
                      Нове небо, нова земля і вічне Царство Божє (Об. 21:1–5).
                    </li>
                  </ol>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-bold text-center text-[48px] mb-2">Фотогалерея</p>

          <p className="text-center mb-1">Перший урок - 24 листопада 2025</p>
          <img src="/24nov.jpeg" className="rounded-xl" alt="" />
        </div>
      </div>
    </section>
  );
}