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
  Award,
  Shield,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 12);
    let formatted = "+998 ";
    const rest = digits.startsWith("998") ? digits.slice(3) : digits;
    if (rest.length > 0) formatted += rest.slice(0, 2);
    if (rest.length > 2) formatted += " " + rest.slice(2, 5);
    if (rest.length > 5) formatted += " " + rest.slice(5, 7);
    if (rest.length > 7) formatted += " " + rest.slice(7, 9);
    return formatted;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;

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
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_content: urlParams.get("utm_content") || "",
      utm_term: urlParams.get("utm_term") || "",
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
      formEl.reset();
      setPhoneValue("");
      setTimeout(() => setSuccess(false), 5000);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white antialiased">
      <section className="relative mx-auto min-h-screen w-full max-w-[460px] overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#071326] to-[#020617] shadow-[0_0_80px_rgba(59,130,246,0.15)]">
        <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-blue-600/30 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 top-60 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />

        <div className="relative px-6 pt-7 pb-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#071326]/60 to-[#071326]" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-blue-500 blur-md opacity-50" />
                <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-2xl font-black shadow-xl ring-1 ring-white/20">
                  B
                </div>
              </div>
              <div>
                <p className="text-[19px] font-black leading-5 tracking-tight">
                  BEKZOD
                </p>
                <p className="text-[11px] font-bold tracking-[0.4em] text-blue-400">
                  PRAVA
                </p>
              </div>
            </div>

            
              <a href="tel:+998901234567"
              className="group relative flex items-center gap-2 rounded-full bg-white/5 px-4 py-3 backdrop-blur-md ring-1 ring-white/10 transition hover:bg-white/10 active:scale-95"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <Phone size={16} className="text-blue-300" />
              <span className="text-[13px] font-bold tracking-wide">
                Bog&apos;lanish
              </span>
            </a>
          </div>

          <div className="relative z-10 mt-6 flex flex-wrap gap-2">
            {/* <div className="flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1.5 ring-1 ring-blue-400/30 backdrop-blur-sm">
              <Award size={13} className="text-blue-300" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                Litsenziyalangan
              </span>
            </div> */}
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 ring-1 ring-emerald-400/30 backdrop-blur-sm">
              <Shield size={13} className="text-emerald-300" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                5000+ talaba
              </span>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <h1 className="text-[42px] font-black leading-[0.98] tracking-[-0.04em]">
              <span className="block text-white">Prava nazariy</span>
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                imtihoniga
              </span>
              <span className="block text-white">tayyorlov</span>
            </h1>

            <p className="mt-5 max-w-[360px] text-[16px] leading-[1.55] text-slate-300">
              Bir urinishda imtihondan o&apos;ting.{" "}
              <span className="font-bold text-white">Bepul konsultatsiya</span>{" "}
              uchun ma&apos;lumotlaringizni qoldiring.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-white/[0.04] px-3 py-3 ring-1 ring-white/10 backdrop-blur-sm">
                <p className="text-[20px] font-black text-white leading-none">
                  90<span className="text-blue-400">%</span>
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  O&apos;tish darajasi
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] px-3 py-3 ring-1 ring-white/10 backdrop-blur-sm">
                <p className="text-[20px] font-black text-white leading-none">
                  5000<span className="text-blue-400">+</span>
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Bitiruvchi
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] px-3 py-3 ring-1 ring-white/10 backdrop-blur-sm">
                <p className="text-[20px] font-black text-white leading-none">
                  10<span className="text-blue-400">+</span>
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Yil tajriba
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative -mt-10 rounded-t-[36px] bg-gradient-to-b from-white to-slate-50 px-6 pt-7 pb-8 text-slate-950 shadow-[0_-20px_60px_-15px_rgba(59,130,246,0.4)]">
          <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-slate-200" />

          <div className="mb-6 flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-blue-400 blur-md opacity-30" />
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg">
                <FilePenLine size={26} strokeWidth={2.5} />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-[24px] font-black leading-tight tracking-[-0.02em]">
                  Ro&apos;yxatdan o&apos;tish
                </h2>
                <Zap size={18} className="text-amber-500 fill-amber-500" />
              </div>
              <p className="mt-1 text-[14px] leading-[1.4] text-slate-600">
                Formani to&apos;ldiring —{" "}
                <span className="font-bold text-blue-600">tez orada mutaxassislarimiz</span>{" "}
                siz bilan bog'lanishadi!
              </p>
            </div>
          </div>

          <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            <p className="text-[12.5px] font-semibold text-amber-900">
              Bugun ro&apos;yxatdan va bugun o'qishni boshlang {" "}
              <span className="font-black">20% chegirma</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <InputBox
              icon={<User size={20} strokeWidth={2.2} />}
              name="firstName"
              placeholder="Ismingiz"
              autoComplete="given-name"
            />

            <InputBox
              icon={<User size={20} strokeWidth={2.2} />}
              name="lastName"
              placeholder="Familyangiz"
              autoComplete="family-name"
            />

            <InputBox
              icon={<Phone size={20} strokeWidth={2.2} />}
              name="phone"
              placeholder="+998 90 123 45 67"
              type="tel"
              autoComplete="tel"
              value={phoneValue}
              onChange={(e) => setPhoneValue(formatPhone(e.target.value))}
              inputMode="tel"
            />

            <InputBox
              icon={<MapPin size={20} strokeWidth={2.2} />}
              name="location"
              placeholder="Yashash joyingiz"
              autoComplete="address-level2"
            />

            <div className="pt-3">
              <p className="mb-3 text-[15px] font-bold text-slate-800">
                Avtomaktab guvohnomangiz bormi?
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                <RadioOption
                  name="hasLicense"
                  value="Ha"
                  label="Ha"
                  variant="success"
                />
                <RadioOption
                  name="hasLicense"
                  value="Yoq"
                  label="Yoq"
                  variant="danger"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="group relative mt-5 flex h-[58px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-[17px] font-black text-white shadow-[0_10px_30px_-5px_rgba(59,130,246,0.5)] transition-all active:scale-[0.98] disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Yuborilmoqda...</span>
                </>
              ) : (
                <>
                  <Send size={20} strokeWidth={2.5} />
                  <span className="tracking-tight">
                    Bepul ro&apos;yxatdan o&apos;tish
                  </span>
                </>
              )}
            </button>

            {success && (
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 py-3.5 text-emerald-700">
                <CheckCircle2 size={20} strokeWidth={2.5} />
                <span className="text-[15px] font-bold">
                  Arizangiz qabul qilindi!
                </span>
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 pt-2">
              <Lock size={13} className="text-slate-400" />
              <p className="text-[12px] font-medium text-slate-500">
                Ma&apos;lumotlaringiz xavfsiz va maxfiy
              </p>
            </div>
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
  type = "text",
  autoComplete,
  value,
  onChange,
  inputMode,
}: {
  icon: React.ReactNode;
  name: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputMode?: "text" | "tel" | "email" | "numeric";
}) {
  return (
    <label className="group flex h-[58px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all focus-within:border-blue-500 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.12)] hover:border-slate-300">
      <div className="text-slate-400 transition-colors group-focus-within:text-blue-600">
        {icon}
      </div>
      <input
        name={name}
        required
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        inputMode={inputMode}
        className="w-full bg-transparent text-[16px] font-semibold text-slate-900 outline-none placeholder:font-medium placeholder:text-slate-400"
      />
    </label>
  );
}

function RadioOption({
  name,
  value,
  label,
  variant,
}: {
  name: string;
  value: string;
  label: string;
  variant: "success" | "danger";
}) {
  const styles =
    variant === "success"
      ? "border-slate-200 bg-white has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50"
      : "border-slate-200 bg-white has-[:checked]:border-rose-500 has-[:checked]:bg-rose-50";

  return (
    <label
      className={`relative flex h-[58px] cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 px-4 text-[17px] font-bold transition-all active:scale-[0.97] ${styles}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        required
        className="peer sr-only"
      />
      <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-slate-300 transition-all peer-checked:border-blue-500 peer-checked:bg-blue-500">
        <span className="h-1.5 w-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100" />
      </span>
      <span className="text-slate-800">{label}</span>
    </label>
  );
}