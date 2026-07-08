"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, ChevronRight, Landmark, Medal, Sparkles, Trophy } from "lucide-react";

const sparkles = [
  ["12%", "18%", "0s"],
  ["26%", "34%", "1.1s"],
  ["42%", "16%", "2.2s"],
  ["64%", "24%", ".6s"],
  ["76%", "44%", "1.8s"],
  ["88%", "18%", "2.8s"]
];

const floatingMedals = [
  { label: "Ratchaburi", top: "18%", right: "12%", delay: "0s" },
  { label: "Academic", top: "42%", right: "5%", delay: ".8s" },
  { label: "Awards", top: "72%", right: "15%", delay: "1.4s" }
];

const ratchaburiScenes = [
  { title: "หอศิลป์ร่วมสมัย", caption: "แรงบันดาลใจริมแม่น้ำแม่กลอง", image: "/images/ratchaburi/river-sculpture.jpg" },
  { title: "วัดมหาธาตุวรวิหาร", caption: "รากวัฒนธรรมเมืองราชบุรี", image: "/images/ratchaburi/wat-mahathat.jpg" }
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-24 lg:min-h-[100svh]">
      <Image src="/images/hero-awards.png" alt="ฉากประกาศรางวัลเมืองราชบุรีพร้อมถ้วยรางวัลทอง" fill priority className="object-cover object-[58%_center] opacity-80 lg:object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/78 to-midnight lg:from-midnight/55 lg:via-midnight/68" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(247,223,155,.2),transparent_18rem)] lg:bg-[radial-gradient(circle_at_70%_22%,rgba(247,223,155,.26),transparent_24rem)]" />
      <div className="pointer-events-none absolute inset-x-0 top-24 h-44 bg-[linear-gradient(100deg,transparent_0%,rgba(247,223,155,.16)_34%,transparent_62%)] opacity-70 mix-blend-screen" />
      <div className="pointer-events-none absolute -right-20 top-28 hidden h-[34rem] w-[34rem] rounded-full border border-gold-light/15 lg:block" />
      <div className="pointer-events-none absolute right-10 top-36 hidden h-[24rem] w-[24rem] rounded-full border border-white/10 lg:block" />
      <div className="sparkle-field">
        {sparkles.map(([left, top, delay]) => (
          <span key={`${left}-${top}`} style={{ left, top, animationDelay: delay }} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {floatingMedals.map((item) => (
          <motion.div
            key={item.label}
            animate={{ y: [0, -16, 0], rotate: [-4, 4, -4] }}
            transition={{ duration: 5.8, delay: Number.parseFloat(item.delay), repeat: Infinity, ease: "easeInOut" }}
            className="absolute grid h-14 w-14 place-items-center rounded-full border border-gold-light/35 bg-midnight/55 text-gold-light shadow-glow backdrop-blur-xl"
            style={{ top: item.top, right: item.right }}
          >
            <Medal className="h-7 w-7" />
          </motion.div>
        ))}
      </div>

      <div className="section-shell relative z-10 grid min-h-[calc(100svh-6rem)] items-center gap-8 py-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-10 lg:py-12">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-light/35 bg-white/10 px-4 py-2 text-xs font-medium text-gold-light backdrop-blur-xl sm:text-sm">
            <Trophy className="h-4 w-4" />
            Ratchaburi Academic Awards 2569
          </div>
          <h1 className="text-balance text-[2.45rem] font-extrabold leading-[1.12] text-white sm:text-5xl lg:text-7xl">
            ประกาศผลการแข่งขัน
            <span className="gold-text block">ทักษะทางวิชาการ</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-platinum/88 sm:text-xl sm:leading-8">
            ระดับภาคกลาง ประจำปี 2569
            <span className="block font-semibold text-gold-light">สำนักการศึกษา เทศบาลเมืองราชบุรี</span>
          </p>
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
              <Landmark className="h-4 w-4 text-gold-light" />
              กลิ่นอายเมืองราชบุรี
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
            {["เมืองราชบุรี", "เวทีเกียรติยศ", "รอผลสด"].map((label) => (
              <div key={label} className="rounded-2xl border border-gold-light/20 bg-midnight/45 p-3 text-center backdrop-blur-xl">
                <Sparkles className="mx-auto h-5 w-5 text-gold-light" />
                <div className="mt-2 text-xs font-medium text-white/78">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.92, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="glass-panel relative mx-auto hidden w-full max-w-md overflow-hidden rounded-[2rem] p-5 lg:ml-auto lg:block">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative rounded-[1.5rem] border border-gold-light/25 bg-midnight/50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm text-gold-light">Ratchaburi Stage</div>
                <div className="mt-2 text-2xl font-extrabold leading-tight text-white">เวทีประกาศผลแห่งเมืองราชบุรี</div>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-full bg-gold text-midnight shadow-glow">
                <Trophy className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {ratchaburiScenes.map((scene) => (
                <div key={scene.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                  <Image src={scene.image} alt={scene.title} width={520} height={240} className="h-28 w-full object-cover opacity-72 transition duration-500 group-hover:scale-105 group-hover:opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="text-base font-bold text-white">{scene.title}</div>
                    <div className="text-xs text-gold-light/90">{scene.caption}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
