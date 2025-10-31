import { NextPage } from "next";

type Lecture = {
  id: string;
  title: string;
  date: string; // ISO
  link?: string;
};

const PREVIOUS_LECTURES: Lecture[] = [
  {
    id: "lecture-01",
    title: "'ХАРАКТЕР БОГА' ЄВАНГЕЛІСТ- МУЗИКАНТ ~ ОЛЕГ НАЗАРЧУК",
    date: "2025-10-24", // ISO формат
    link: "https://youtube.com/watch?v=d1fM8Fl52qc&t=4984s", // твоє посилання на запис
  }
];


function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

const OnlineLecturePage: NextPage = () => {
  // Встанови тут посилання або через NEXT_PUBLIC_LECTURE_LINK
  const LECTURE_LINK = process.env.NEXT_PUBLIC_LECTURE_LINK ?? ""; // приклад: "https://zoom.example/lecture"

  return (
    <div className="px-2">
      <main style={{ padding: "1rem", maxWidth: 900, margin: "0 auto", color: "#061425", background: "rgba(255,255,255,0.9)", borderRadius: 12, marginTop: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <img src="/logo-black.svg" alt="" />
      <h1 style={{ margin: 0, fontSize: "1.6rem" }}>Онлайн лекція</h1>
      <p style={{ marginTop: ".6rem", color: "rgba(0,0,0,0.7)" }}>
        Тут зʼявлятиметься посилання на онлайн-лекцію.
      </p>

      <div style={{ marginTop: "1.25rem" }}>
        {LECTURE_LINK ? (
          <a
            href={LECTURE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: ".6rem 1rem",
              background: "linear-gradient(90deg,#f59e0b,#ef4444)",
              color: "#061425",
              fontWeight: 700,
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Перейти на лекцію
          </a>
        ) : (
          <div
            style={{
              padding: ".75rem 1rem",
              borderRadius: 8,
              background: "rgba(0,0,0,0.04)",
              color: "rgba(0,0,0,0.6)",
            }}
          >
            Посилання зʼявиться згодом.
          </div>
        )}
      </div>

      <section aria-labelledby="previous-lectures" style={{ marginTop: "2rem" }}>
        <h2 id="previous-lectures" style={{ fontSize: "1.1rem", margin: "0 0 .6rem 0" }}>Попередні лекції</h2>

        {PREVIOUS_LECTURES.length === 0 ? (
          <div style={{ color: "rgba(0,0,0,0.6)" }}>Записів поки що немає.</div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: ".6rem" }}>
            {PREVIOUS_LECTURES.map((lec) => (
              <li
                key={lec.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: ".65rem",
                  borderRadius: 8,
                  background: "rgba(0,0,0,0.03)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{lec.title}</div>
                  <div style={{ fontSize: ".9rem", color: "rgba(0,0,0,0.6)" }}>{formatDate(lec.date)}</div>
                </div>

                <div>
                  {lec.link ? (
                    <a
                      href={lec.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: ".45rem .7rem",
                        borderRadius: 6,
                        background: "linear-gradient(90deg,#60a5fa,#7c3aed)",
                        color: "#fff",
                        textDecoration: "none",
                        fontWeight: 700,
                      }}
                    >
                      Переглянути
                    </a>
                  ) : (
                    <span style={{ color: "rgba(0,0,0,0.6)", fontSize: ".95rem" }}>Запис зʼявиться згодом</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
    </div>
  );
};

export default OnlineLecturePage;