"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ChevronRight, Crown, Hourglass, Megaphone, Medal, Sparkles, Star, Trophy } from "lucide-react";
import { results } from "@/data/results";
import { schools } from "@/data/schools";
import { summary } from "@/data/summary";

const sparkles = [
  ["12%", "18%", "0s"],
  ["26%", "34%", "1.1s"],
  ["42%", "16%", "2.2s"],
  ["64%", "24%", ".6s"],
  ["76%", "44%", "1.8s"],
  ["88%", "18%", "2.8s"]
];

const confetti = [
  ["18%", "26%", "0s", "rotate-12"],
  ["31%", "19%", ".6s", "-rotate-12"],
  ["53%", "27%", "1.1s", "rotate-45"],
  ["68%", "18%", ".2s", "-rotate-45"],
  ["84%", "33%", "1.4s", "rotate-12"],
  ["92%", "57%", ".8s", "-rotate-12"]
];

const floatingMedals = [
  { label: "Ratchaburi", top: "15%", right: "12%", delay: "0s", icon: Crown },
  { label: "Academic", top: "42%", right: "5%", delay: ".8s", icon: Medal },
  { label: "Awards", top: "72%", right: "15%", delay: "1.4s", icon: Star }
];

const liveCards = [
  { title: "เหรียญทอง", value: summary.goldMedals, caption: "ประกาศแล้ว", icon: Trophy, className: "text-gold-light" },
  { title: "เหรียญเงิน", value: summary.silverMedals, caption: "ประกาศแล้ว", icon: Medal, className: "text-platinum" },
  { title: "เหรียญทองแดง", value: summary.bronzeMedals, caption: "ประกาศแล้ว", icon: Medal, className: "text-[#e7a56a]" },
  { title: "รอประกาศ", value: summary.pendingResults, caption: "รายการ", icon: Hourglass, className: "text-white/72" }
];

const medalOverview = [
  { label: "ทอง", value: summary.goldMedals, className: "text-gold-light", bgClassName: "bg-gold/14 border-gold-light/28" },
  { label: "เงิน", value: summary.silverMedals, className: "text-platinum", bgClassName: "bg-white/10 border-white/16" },
  { label: "ทองแดง", value: summary.bronzeMedals, className: "text-[#e7a56a]", bgClassName: "bg-[#e7a56a]/12 border-[#e7a56a]/25" }
];

const announcedCount = summary.goldMedals + summary.silverMedals + summary.bronzeMedals + summary.otherAwards;

const schoolShortNames = new Map(schools.map((school) => [school.name, school.shortName]));

const announcementItems = results.map((result) => {
  const isPending = result.medal === "รอผล";
  return {
    id: result.id,
    event: result.event,
    school: schoolShortNames.get(result.school) ?? result.school,
    level: result.level,
    status: isPending ? "รอประกาศผล" : result.award,
    badge: isPending ? "WAIT" : result.medal
  };
});

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-24 lg:min-h-[100svh]">
      <Image src="/images/hero-awards-ratchaburi.png" alt="ฉากประกาศรางวัลเมืองราชบุรีพร้อมถ้วยรางวัลทอง" fill priority className="object-cover object-[58%_center] opacity-80 lg:object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/78 to-midnight lg:from-midnight/55 lg:via-midnight/68" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(247,223,155,.2),transparent_18rem)] lg:bg-[radial-gradient(circle_at_70%_22%,rgba(247,223,155,.26),transparent_24rem)]" />
      <div className="pointer-events-none absolute inset-x-0 top-24 h-44 bg-[linear-gradient(100deg,transparent_0%,rgba(247,223,155,.16)_34%,transparent_62%)] opacity-70 mix-blend-screen" />
      <div className="stage-light left-[9%] -rotate-12" />
      <div className="stage-light right-[8%] rotate-12 delay-700" />
      <div className="gold-ribbon ribbon-one" />
      <div className="gold-ribbon ribbon-two" />
      <div className="pointer-events-none absolute -right-20 top-28 hidden h-[34rem] w-[34rem] rounded-full border border-gold-light/15 lg:block" />
      <div className="pointer-events-none absolute right-10 top-36 hidden h-[24rem] w-[24rem] rounded-full border border-white/10 lg:block" />
      <div className="sparkle-field">
        {sparkles.map(([left, top, delay]) => (
          <span key={`${left}-${top}`} style={{ left, top, animationDelay: delay }} />
        ))}
      </div>
      <div className="confetti-field">
        {confetti.map(([left, top, delay, rotate]) => (
          <span key={`${left}-${top}`} className={rotate} style={{ left, top, animationDelay: delay }} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {floatingMedals.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              animate={{ y: [0, -16, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 5.8, delay: Number.parseFloat(item.delay), repeat: Infinity, ease: "easeInOut" }}
              className="absolute grid h-14 w-14 place-items-center rounded-full border border-gold-light/35 bg-midnight/55 text-gold-light shadow-glow backdrop-blur-xl"
              style={{ top: item.top, right: item.right }}
            >
              <Icon className="h-7 w-7" />
            </motion.div>
          );
        })}
      </div>

      <div className="section-shell relative z-10 grid min-h-[calc(100svh-6rem)] items-center gap-8 py-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-10 lg:py-12">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="w-full min-w-0 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-light/35 bg-white/10 px-4 py-2 text-xs font-medium text-gold-light backdrop-blur-xl sm:text-sm">
            <Trophy className="h-4 w-4" />
            ท่าโขลงวิชาการ 2569
          </div>
          <h1 className="text-balance text-[2.45rem] font-extrabold leading-[1.12] text-white sm:text-5xl lg:text-7xl">
            ประกาศผลการแข่งขัน
            <span className="gold-text block">ทักษะทางวิชาการ</span>
            <span className="mt-1 block text-[1.85rem] leading-tight text-gold-light sm:text-4xl lg:text-5xl">“ท่าโขลงวิชาการ”</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-platinum/88 sm:text-xl sm:leading-8">
            ตัวแทนสถานศึกษาในสังกัดเทศบาลเมืองราชบุรี
            <span className="block">ระดับภาคกลาง ประจำปี 2569</span>
            <span className="block font-semibold text-gold-light">สำนักการศึกษา เทศบาลเมืองราชบุรี</span>
          </p>
          <div className="mt-5 overflow-hidden rounded-full border border-gold-light/25 bg-midnight/55 px-3 py-2 backdrop-blur-xl">
            <div
              className="marquee-track flex w-max items-center gap-6 text-sm font-semibold text-white/76"
              style={{ animationDuration: `${Math.max(90, announcementItems.length * 2.5)}s` }}
            >
              {[...announcementItems, ...announcementItems].map((item, index) => (
                <span key={`${item.id}-${index}`} className="inline-flex items-center gap-2">
                  <Megaphone className="h-4 w-4 text-gold-light" />
                  {item.event}
                  <span className="text-white/45">{item.school} • {item.level}</span>
                  <span className="text-gold-light">{item.status}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="mt-5 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {liveCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.12 + index * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border border-gold-light/20 bg-white/10 p-4 backdrop-blur-xl"
                >
                  <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gold/15 blur-2xl" />
                  <Icon className={`relative h-5 w-5 ${card.className}`} />
                  <div className="relative mt-3 text-2xl font-extrabold text-white">{card.value.toLocaleString("th-TH")}</div>
                  <div className="relative mt-1 text-xs font-semibold text-gold-light">{card.title}</div>
                  <div className="relative mt-2 text-[11px] leading-4 text-white/55">{card.caption}</div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-6 flex flex-col gap-3 text-sm text-white/84 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
              <CalendarDays className="h-4 w-4 text-gold-light" />
              20 - 23 กรกฎาคม 2569
            </span>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
              <Medal className="h-4 w-4 text-gold-light" />
              Hall of Fame ระดับภาคกลาง
            </span>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-gold-light" />
              เวทีประกาศผลแบบมีชีวิต
            </span>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#ผลการแข่งขัน" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-base font-bold text-midnight shadow-glow transition hover:scale-[1.02]">
              ดูผลการแข่งขัน
              <ChevronRight className="h-5 w-5" />
            </a>
            <a href="#ตารางการแข่งขัน" className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-light/40 bg-white/10 px-7 py-4 text-base font-semibold text-gold-light backdrop-blur-xl transition hover:bg-white/15">
              ตารางการแข่งขัน
            </a>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3 lg:hidden">
            {medalOverview.map((medal) => (
              <div key={medal.label} className="rounded-2xl border border-gold-light/20 bg-midnight/45 p-3 text-center backdrop-blur-xl">
                <Sparkles className={`mx-auto h-5 w-5 ${medal.className}`} />
                <div className="mt-2 text-xs font-medium text-white/78">{medal.label} {medal.value.toLocaleString("th-TH")}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.92, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="glass-panel relative mx-auto hidden w-full max-w-md overflow-hidden rounded-[2rem] p-5 lg:ml-auto lg:block">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gold/30 blur-3xl" />
          <div className="shine-strip" />
          <div className="relative rounded-[1.5rem] border border-gold-light/25 bg-midnight/50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-gold-light">สรุปเหรียญล่าสุด</div>
                <div className="mt-2 text-2xl font-extrabold leading-tight text-white">เทศบาลเมืองราชบุรี</div>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-full bg-gold text-midnight shadow-glow">
                <Trophy className="h-8 w-8" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {medalOverview.map((medal) => (
                <div key={medal.label} className={`rounded-2xl border p-4 text-center ${medal.bgClassName}`}>
                  <Medal className={`mx-auto h-6 w-6 ${medal.className}`} />
                  <div className="mt-3 text-4xl font-extrabold leading-none text-white">{medal.value.toLocaleString("th-TH")}</div>
                  <div className={`mt-2 text-sm font-bold ${medal.className}`}>{medal.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/8 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white/50">ประกาศผลแล้ว</div>
                  <div className="mt-1 text-2xl font-extrabold text-white">{announcedCount.toLocaleString("th-TH")} / {results.length.toLocaleString("th-TH")}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-white/50">รอประกาศ</div>
                  <div className="mt-1 text-2xl font-extrabold text-gold-light">{summary.pendingResults.toLocaleString("th-TH")}</div>
                </div>
              </div>
            </div>

            <AnnouncementCarousel />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AnnouncementCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || prefersReducedMotion || announcementItems.length <= 3) return;

    const timer = window.setInterval(() => {
      setStartIndex((current) => (current + 1) % announcementItems.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const visibleItems = Array.from(
    { length: Math.min(3, announcementItems.length) },
    (_, offset) => announcementItems[(startIndex + offset) % announcementItems.length]
  );

  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between px-1 text-[11px] text-white/45">
        <span>รายการแข่งขันทั้งหมด</span>
        <span className="tabular-nums">
          {Math.min(startIndex + 1, announcementItems.length).toLocaleString("th-TH")} / {announcementItems.length.toLocaleString("th-TH")}
        </span>
      </div>
      <div
        className="grid gap-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        aria-label="รายการแข่งขันที่เลื่อนอัตโนมัติ"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {visibleItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="group relative min-h-[6.5rem] overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-4 transition hover:border-gold-light/40"
            >
              <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute right-4 top-4 rounded-full border border-gold-light/30 bg-gold/15 px-2 py-1 text-[10px] font-bold text-gold-light">
                {item.badge}
              </div>
              <div className="flex items-center gap-3 pr-14">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold-light/25 bg-midnight/65 text-gold-light">
                  <Medal className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-white" title={item.event}>{item.event}</div>
                  <div className="mt-1 truncate text-[11px] text-white/45">{item.school} • {item.level}</div>
                  <div className="mt-1 truncate text-xs text-white/60">{item.status}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
