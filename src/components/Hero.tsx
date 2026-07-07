"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, ChevronRight, Medal, Trophy } from "lucide-react";

const sparkles = [
  ["12%", "18%", "0s"],
  ["26%", "34%", "1.1s"],
  ["42%", "16%", "2.2s"],
  ["64%", "24%", ".6s"],
  ["76%", "44%", "1.8s"],
  ["88%", "18%", "2.8s"]
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-20 lg:min-h-[100svh] lg:pt-24">
      <Image src="/images/hero-awards.png" alt="ฉากประกาศรางวัลเมืองราชบุรีพร้อมถ้วยรางวัลทอง" fill priority className="object-cover object-[58%_center] opacity-80 lg:object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/78 to-midnight lg:from-midnight/55 lg:via-midnight/68" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(247,223,155,.2),transparent_18rem)] lg:bg-[radial-gradient(circle_at_70%_22%,rgba(247,223,155,.26),transparent_24rem)]" />
      <div className="sparkle-field">
        {sparkles.map(([left, top, delay]) => (
          <span key={`${left}-${top}`} style={{ left, top, animationDelay: delay }} />
        ))}
      </div>

      <div className="section-shell relative z-10 grid min-h-[calc(100svh-5rem)] items-center gap-8 py-10 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1.05fr_.95fr] lg:gap-10 lg:py-12">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-light/35 bg-white/10 px-4 py-2 text-xs font-medium text-gold-light backdrop-blur-xl sm:text-sm">
            <Trophy className="h-4 w-4" />
            Award Dashboard 2569
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
            {["ถ้วยทอง", "ดาวเด่น", "ตัวแทน"].map((label) => (
              <div key={label} className="rounded-2xl border border-gold-light/20 bg-midnight/45 p-3 text-center backdrop-blur-xl">
                <Trophy className="mx-auto h-5 w-5 text-gold-light" />
                <div className="mt-2 text-xs font-medium text-white/78">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.92, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="glass-panel relative mx-auto hidden w-full max-w-md overflow-hidden rounded-[2rem] p-6 lg:ml-auto lg:block">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative rounded-[1.5rem] border border-gold-light/25 bg-midnight/50 p-5">
            <div className="text-sm text-gold-light">เวทีเกียรติยศ</div>
            <div className="mt-3 text-3xl font-extrabold text-white">Central Region Academic Awards</div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {["ถ้วยทอง", "ดาวเด่น", "ยอดเยี่ยม", "ตัวแทน"].map((label) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
                  <Trophy className="mx-auto h-7 w-7 text-gold-light" />
                  <div className="mt-2 text-sm text-white/82">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
