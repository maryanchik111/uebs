import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const message = `
Нова заявка з сайту:
ПІБ: ${body.fullName}
Email: ${body.email}
Телефон: ${body.phone}
Місто: ${body.city}
Формат: ${body.format}
Мотивація: ${body.note || "-"}
`;

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      }
    );

    if (!telegramRes.ok) throw new Error("Telegram API error");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
