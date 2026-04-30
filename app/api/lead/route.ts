import { NextResponse } from "next/server";
import crypto from "crypto";

function hash(value: string) {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/\D/g, "");
  // Agar 998 bilan boshlanmasa va 9 xonali bo'lsa, mamlakat kodini qo'shamiz
  if (!cleaned.startsWith("998") && cleaned.length === 9) {
    cleaned = "998" + cleaned;
  }
  return cleaned;
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
        { error: "Ma'lumotlar to'liq emas" },
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

    try {
      const tgResponse = await fetch(
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

      if (!tgResponse.ok) {
        const tgError = await tgResponse.json();
        console.error("Telegram xatolik:", tgError);
      }
    } catch (tgErr) {
      console.error("Telegram yuborishda xato:", tgErr);
    }

    // 2. Meta CAPI Lead event
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;

    if (pixelId && accessToken) {
      try {
        const userAgent = req.headers.get("user-agent") || "";
        const forwardedFor = req.headers.get("x-forwarded-for") || "";
        const clientIp = forwardedFor.split(",")[0]?.trim() || "";

        const metaResponse = await fetch(
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
                  event_source_url: pageUrl || "https://your-domain.uz",
                  user_data: {
                    fn: hash(firstName),
                    ln: hash(lastName),
                    ph: hash(normalizePhone(phone)),
                    client_user_agent: userAgent,
                    client_ip_address: clientIp,
                  },
                  custom_data: {
                    location,
                    has_license: hasLicense,
                    business: "Bekzod Prava",
                    utm_source: utm_source || "",
                    utm_medium: utm_medium || "",
                    utm_campaign: utm_campaign || "",
                    utm_content: utm_content || "",
                    utm_term: utm_term || "",
                  },
                },
              ],
              // Test paytida ochib qo'ying:
              // test_event_code: "TEST12345",
            }),
          }
        );

        const metaResult = await metaResponse.json();
        console.log("✅ Meta CAPI javobi:", JSON.stringify(metaResult, null, 2));

        if (!metaResponse.ok) {
          console.error("❌ Meta CAPI xatolik:", metaResult);
        }
      } catch (metaErr) {
        console.error("Meta CAPI yuborishda xato:", metaErr);
      }
    } else {
      console.warn("⚠️ META_PIXEL_ID yoki META_ACCESS_TOKEN topilmadi (.env.local tekshiring)");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server xatolik:", error);
    return NextResponse.json(
      { error: "Server xatolik" },
      { status: 500 }
    );
  }
}