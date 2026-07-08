"use client";

import { motion } from "framer-motion";
import { Award, Crown, Medal, Sparkles, Star, Trophy } from "lucide-react";

const awardSlots = [
  {
    title: "ชนะเลิศ",
    subtitle: "รอประกาศผล",
    detail: "การ์ดนี้จะแสดงผลงานอันดับสูงสุดหลังประกาศผล",
    icon: Trophy,
    className: "lg:scale-105 lg:-translate-y-3 border-gold-light/45 bg-gold/18"
  },
  {
    title: "เหรียญทอง",
    subtitle: "รอประกาศผล",
    detail: "รวมรายการที่ได้รับระดับเหรียญทอง",
    icon: Medal,
    className: "border-white/12 bg-white/8"
  },
  {
    title: "ผลงานเด่น",
    subtitle: "รอประกาศผล",
    detail: "พื้นที่สำหรับผลงานที่สร้างความภาคภูมิใจ",
    icon: Star,
    className: "border-white/12 bg-white/8"
  }
];

const updates = ["ฮูลาฮูปประกอบเพลง", "กล่าวสุนทรพจน์", "โครงงานวิทยาศาสตร์"];

export default function HallOfFame() {
  return (
    <section id="Hall of Fame" className="relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-10 h-80 bg-[radial-gradient(circle_at_50%_20%,rgba(215,170,66,.24),transparent_34rem)]" />
      <div className="spotlight-beam left-[16%] -rotate-12" />
      <div className="spotlight-beam right-[16%] rotate-12 delay-1000" />

      <div className="section-shell relative">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-light/30 bg-gold/12 px-4 py-2 text-sm font-bold text-gold-light">
              <Crown className="h-4 w-4" />
              Hall of Fame
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              เวทีเกียรติยศ
              <span className="gold-text block">รอประกาศผู้ได้รับรางวัล</span>
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/64">
              เมื่อประกาศผลแล้ว ส่วนนี้จะแสดงผู้ชนะและผลงานเด่นแบบอ่านง่าย เห็นรางวัลสำคัญได้ทันที
            </p>
          </div>
          <div className="w-fit rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white/70">
            20 - 23 กรกฎาคม 2569
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.18fr_1fr] lg:items-end">
          {awardSlots.map((slot, index) => {
            const Icon = slot.icon;
            return (
              <motion.article
                key={slot.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`award-card relative overflow-hidden rounded-3xl border p-6 text-center shadow-glass backdrop-blur-xl ${slot.className}`}
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/22 blur-2xl" />
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/80 to-transparent" />
                <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold-light/35 bg-midnight/60 text-gold-light shadow-glow">
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="relative mt-5 text-2xl font-extrabold text-white">{slot.title}</h3>
                <div className="relative mt-3 inline-flex items-center gap-2 rounded-full border border-gold-light/25 bg-midnight/45 px-4 py-2 text-sm font-bold text-gold-light">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-light opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-light" />
                  </span>
                  {slot.subtitle}
                </div>
                <p className="relative mt-4 text-sm leading-6 text-white/62">{slot.detail}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/8 p-5 sm:p-6">
            <div className="absolute -left-16 -top-16 h-36 w-36 rounded-full bg-sapphire/45 blur-3xl" />
            <div className="relative flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-gold-light" />
              <h3 className="text-xl font-extrabold text-white">รายการที่เตรียมขึ้น Hall of Fame</h3>
            </div>
            <div className="relative mt-5 grid gap-3 md:grid-cols-3">
              {updates.map((item) => (
                <div key={item} className="rounded-2xl border border-gold-light/16 bg-midnight/45 p-4">
                  <Award className="h-6 w-6 text-gold-light" />
                  <div className="mt-3 text-sm font-bold text-white">{item}</div>
                  <div className="mt-2 text-xs text-white/50">รอประกาศผล</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gold-light/22 bg-gradient-to-br from-gold/24 via-white/8 to-sapphire/18 p-6 text-center">
            <Trophy className="mx-auto h-10 w-10 text-gold-light" />
            <div className="mt-4 text-3xl font-extrabold text-white">เร็ว ๆ นี้</div>
            <p className="mt-3 text-sm leading-6 text-white/64">
              เมื่อมีผลจริง พี่สามารถอัปเดตรายชื่อผู้ชนะ คะแนน และรูปภาพให้ขึ้นหน้านี้ได้ทันที
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
