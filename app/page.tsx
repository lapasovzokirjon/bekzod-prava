"use client";

import { useState } from "react";
import {
  User,
  Phone,
  MapPin,
  FilePenLine,
  Send,
  Lock,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formEl = e.currentTarget; // 🔥 FIX (error ketadi)

  setLoading(true);
  setSuccess(false);

  const form = new FormData(formEl);
  const eventId = crypto.randomUUID();

  const urlParams = new URLSearchParams(window.location.search);

  const data = {
    firstName: form.get("firstName"),
    lastName: form.get("lastName"),
    phone: form.get("phone"),
    location: form.get("location"),
    hasLicense: form.get("hasLicense"),
    eventId,

    // 🔥 UTM lar
    utm_source: urlParams.get("utm_source") || "",
    utm_medium: urlParams.get("utm_medium") || "",
    utm_campaign: urlParams.get("utm_campaign") || "",
    utm_content: urlParams.get("utm_content") || "",
    utm_term: urlParams.get("utm_term") || "",

    // 🔥 Qo‘shimcha
    pageUrl: window.location.href,
    createdAt: new Date().toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
    }),
  };

  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    // @ts-ignore
    if (typeof window !== "undefined" && window.fbq) {
      // @ts-ignore
      window.fbq("track", "Lead", {}, { eventID: eventId });
    }

    setSuccess(true);
    formEl.reset(); // 🔥 shu fix errorni yo‘q qiladi
  }

  setLoading(false);
}
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-[#071326] shadow-2xl">
        {/* HERO */}
        <div className="relative min-h-[360px] px-7 pt-8 pb-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#061326]/90 via-[#071326]/80 to-[#071326]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071326] via-[#071326]/70 to-transparent" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-3xl font-black shadow-lg shadow-blue-700/30">
                B
              </div>

              <div>
                <p className="text-xl font-black leading-5 tracking-wide">
                  BEKZOD
                </p>
                <p className="text-sm font-bold tracking-[0.35em] text-blue-400">
                  PRAVA
                </p>
              </div>
            </div>

            <a
              href="tel:+998901234567"
              className="grid h-14 w-14 place-items-center rounded-full bg-blue-600 shadow-xl shadow-blue-600/40"
            >
              <Phone size={26} />
            </a>
          </div>

          <div className="relative z-10 mt-24">
            <h1 className="text-[44px] font-black leading-[0.98] tracking-[-0.04em]">
              
              <span className="block bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                Prava nazariy imtihoniga tayyorlov kursi
              </span>
            </h1>

            <p className="mt-6 max-w-[330px] text-[20px] leading-8 text-slate-200">
              Prava nazariy imtihonidan bir urinishda o'tish uchun so'rovnomani to'ldiring!
            </p>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="relative -mt-12 rounded-t-[38px] bg-white px-7 pt-8 pb-8 text-slate-950 shadow-2xl">
          <div className="mb-7 flex items-center gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-blue-50 text-blue-600">
              <FilePenLine size={34} />
            </div>

            <div>
              <h2 className="text-[28px] font-black tracking-[-0.03em]">
                Ro‘yxatdan o‘tish
              </h2>
              <p className="mt-1 text-[16px] leading-6 text-slate-500">
                Ma’lumotlaringizni to‘ldiring, biz siz bilan tez orada
                bog‘lanamiz!
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputBox icon={<User />} name="firstName" placeholder="Ism" />

            <InputBox icon={<User />} name="lastName" placeholder="Familya" />

            <InputBox
              icon={<Phone />}
              name="phone"
              placeholder="Telefon raqam"
              subPlaceholder="+998 90 123 45 67"
              type="tel"
            />

            <InputBox
              icon={<MapPin />}
              name="location"
              placeholder="Yashash joyi"
              subPlaceholder="Shahar yoki tuman nomi"
            />

            <div className="pt-2">
              <p className="mb-4 text-[18px] font-extrabold">
                Sizda avtomaktab guvohnomasi bormi?
              </p>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex h-[70px] cursor-pointer items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 text-[22px] font-bold transition active:scale-[0.98]">
                  <input
                    type="radio"
                    name="hasLicense"
                    value="Ha"
                    required
                    className="h-5 w-5 accent-blue-600"
                  />
                  Ha
                </label>

                <label className="flex h-[70px] cursor-pointer items-center gap-3 rounded-2xl border border-red-200 bg-red-50/60 px-4 text-[22px] font-bold transition active:scale-[0.98]">
                  <input
                    type="radio"
                    name="hasLicense"
                    value="Yo‘q"
                    required
                    className="h-5 w-5 accent-blue-600"
                  />
                  Yo‘q
                </label>
              </div>
            </div>

            <button
              disabled={loading}
              className="mt-6 flex h-[64px] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 text-[22px] font-black text-white shadow-xl shadow-blue-600/30 transition active:scale-[0.98] disabled:opacity-60"
            >
              <Send size={26} />
              {loading ? "Yuborilmoqda..." : "Ro‘yxatdan o‘tish"}
            </button>

            {success && (
              <div className="flex items-center justify-center gap-2 rounded-2xl bg-green-50 py-3 text-green-600 font-bold">
                <CheckCircle2 size={20} />
                Arizangiz qabul qilindi!
              </div>
            )}

            <p className="flex items-center justify-center gap-2 pt-2 text-center text-sm font-medium text-slate-400">
              <Lock size={16} />
              Sizning ma’lumotlaringiz maxfiy saqlanadi
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

function InputBox({
  icon,
  name,
  placeholder,
  subPlaceholder,
  type = "text",
}: {
  icon: React.ReactNode;
  name: string;
  placeholder: string;
  subPlaceholder?: string;
  type?: string;
}) {
  return (
    <label className="flex min-h-[72px] items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
      <div className="text-slate-400">{icon}</div>

      <div className="w-full">
        <input
          name={name}
          required
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-[18px] font-semibold text-slate-900 outline-none placeholder:text-slate-500"
        />

        {subPlaceholder && (
          <p className="mt-1 text-[16px] font-medium text-slate-400">
            {subPlaceholder}
          </p>
        )}
      </div>
    </label>
  );
}