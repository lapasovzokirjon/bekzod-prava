import { NextResponse } from "next/server";
import crypto from "crypto";


function hash(value: string) {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

   const {
  firstName,
  lastName,
  phone,
  location,
  hasLicense,
  eventId,

  utm_source,
  utm_medium,
  utm_campaign,
  utm_content,
  utm_term,
  pageUrl,
  createdAt,
} = body;

    if (!firstName || !lastName || !phone || !location || !hasLicense) {
      return NextResponse.json(
        { error: "Ma’lumotlar to‘liq emas" },
        { status: 400 }
      );
    }

    // 1. Telegramga lead yuborish
 const telegramText = `
🚘 Yangi lead: Bekzod Prava

👤 Ism: ${firstName}
👤 Familya: ${lastName}
📞 Telefon: ${phone}
📍 Lokatsiya: ${location}
📄 Guvohnoma: ${hasLicense}

🕒 Sana: ${createdAt}

📊 UTM:
utm_source: ${utm_source || "-"}
utm_medium: ${utm_medium || "-"}
utm_campaign: ${utm_campaign || "-"}
utm_content: ${utm_content || "-"}
utm_term: ${utm_term || "-"}
`;
    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramText,
        }),
      }
    );

    // 2. Meta CAPI Lead event
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;

    if (pixelId && accessToken) {
      await fetch(
        `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [
              {
                event_name: "Lead",
                event_time: Math.floor(Date.now() / 1000),
                event_id: eventId,
                action_source: "website",
                event_source_url: "https://your-domain.uz",
                user_data: {
                  fn: hash(firstName),
                  ln: hash(lastName),
                  ph: hash(phone.replace(/\D/g, "")),
                },
              custom_data: {
  location,
  has_license: hasLicense,
  business: "Bekzod Prava",

  utm_source,
  utm_medium,
  utm_campaign,
  utm_content,
  utm_term,
},
              },
            ],
          }),
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Server xatolik" },
      { status: 500 }
    );
  }
}