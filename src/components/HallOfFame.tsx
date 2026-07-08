"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ClipboardCheck, Medal, Trophy } from "lucide-react";
import { results } from "@/data/results";
import { schools } from "@/data/schools";

const medalLabels = [
  { key: "ทอง", shortLabel: "ทอง", className: "text-gold-light" },
  { key: "เงิน", shortLabel: "เงิน", className: "text-platinum" },
  { key: "ทองแดง", shortLabel: "ทองแดง", className: "text-[#e7a56a]" }
] as const;

const medalSummary = medalLabels.map((medal) => ({
  ...medal,
  count: results.filter((result) => result.medal === medal.key).length
}));

const totalMedals = medalSummary.reduce((total, medal) => total + medal.count, 0);
const announcedCount = results.filter((result) => result.medal !== "รอผล").length;
const pendingCount = results.length - announcedCount;

const schoolRows = schools.map((school) => {
  const schoolResults = results.filter((result) => result.school === school.name);
  const medalCounts = {
    gold: schoolResults.filter((result) => result.medal === "ทอง").length,
    silver: schoolResults.filter((result) => result.medal === "เงิน").length,
    bronze: schoolResults.filter((result) => result.medal === "ทองแดง").length
  };

  return {
    ...school,
    ...medalCounts,
    total: medalCounts.gold + medalCounts.silver + medalCounts.bronze
  };
});

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
              <Trophy className="h-4 w-4" />
              Hall of Fame
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              สรุปเหรียญรางวัล
              <span className="gold-text block">เทศบาลเมืองราชบุรี</span>
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/64">
              รวมเหรียญของโรงเรียนในสังกัดเทศบาลเมืองราชบุรี แยกตามโรงเรียนและประเภทเหรียญ เพื่อให้ดูภาพรวมได้เร็วที่สุด
            </p>
          </div>
          <div className="w-fit rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white/70">
            ประกาศผลแล้ว {announcedCount.toLocaleString("th-TH")} จาก {results.length.toLocaleString("th-TH")} รายการ
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <motion.article initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl border border-gold-light/25 bg-gradient-to-br from-gold/24 via-white/10 to-sapphire/18 p-6 shadow-glass backdrop-blur-xl sm:p-8">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gold/25 blur-3xl" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-light/28 bg-midnight/45 px-4 py-2 text-sm font-bold text-gold-light">
                  <Award className="h-4 w-4" />
                  เหรียญรวมทั้งหมด
                </div>
                <h3 className="mt-5 text-5xl font-extrabold leading-none text-white sm:text-7xl">{totalMedals.toLocaleString("th-TH")}</h3>
                <p className="mt-3 text-base font-semibold text-white/72">เหรียญที่เทศบาลเมืองราชบุรีคว้ามาได้ตอนนี้</p>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:min-w-72">
                {medalSummary.map((medal) => (
                  <div key={medal.key} className="rounded-2xl border border-white/12 bg-midnight/45 p-4 text-center">
                    <Medal className={`mx-auto h-7 w-7 ${medal.className}`} />
                    <div className="mt-3 text-3xl font-extrabold text-white">{medal.count.toLocaleString("th-TH")}</div>
                    <div className={`mt-1 text-xs font-bold ${medal.className}`}>{medal.shortLabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }} className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-glass backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-7 w-7 text-gold-light" />
              <h3 className="text-xl font-extrabold text-white">สถานะประกาศผล</h3>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-gold-light/18 bg-midnight/45 p-4">
                <div className="text-3xl font-extrabold text-white">{announcedCount.toLocaleString("th-TH")}</div>
                <div className="mt-1 text-sm font-semibold text-gold-light">ประกาศแล้ว</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-midnight/45 p-4">
                <div className="text-3xl font-extrabold text-white">{pendingCount.toLocaleString("th-TH")}</div>
                <div className="mt-1 text-sm font-semibold text-white/60">รอผล</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/58">
              เมื่อป๋องส่งผลรายการต่อไปมา ตารางเหรียญจะนับรวมให้อัตโนมัติทั้งภาพรวมและรายโรงเรียน
            </p>
          </motion.article>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-midnight/50 shadow-glass backdrop-blur-xl">
          <div className="overflow-x-auto">
            <div className="min-w-[44rem]">
              <div className="grid grid-cols-[1.65fr_repeat(4,minmax(4.5rem,.65fr))] gap-2 border-b border-white/10 bg-white/8 px-4 py-3 text-xs font-bold text-white/60 sm:px-5">
                <div>โรงเรียน</div>
                <div className="text-center text-gold-light">ทอง</div>
                <div className="text-center text-platinum">เงิน</div>
                <div className="text-center text-[#e7a56a]">ทองแดง</div>
                <div className="text-center text-white">รวม</div>
              </div>

              <div className="divide-y divide-white/8">
                {schoolRows.map((school, index) => (
                  <motion.div
                    key={school.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="grid grid-cols-[1.65fr_repeat(4,minmax(4.5rem,.65fr))] items-center gap-2 px-4 py-4 sm:px-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gold-light/35 bg-white">
                        {school.logo ? <Image src={school.logo} alt={`โลโก้${school.name}`} fill sizes="48px" className="object-contain p-1" /> : null}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-extrabold text-white sm:text-base">{school.shortName}</div>
                        <div className="truncate text-xs text-white/48">{school.name}</div>
                      </div>
                    </div>
                    <div className="text-center text-lg font-extrabold text-gold-light">{school.gold}</div>
                    <div className="text-center text-lg font-extrabold text-platinum">{school.silver}</div>
                    <div className="text-center text-lg font-extrabold text-[#e7a56a]">{school.bronze}</div>
                    <div className="text-center text-xl font-extrabold text-white">{school.total}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-gold-light/16 bg-gold/10 px-5 py-4 text-sm leading-6 text-white/68">
          ตารางนี้นับเฉพาะรายการที่ประกาศผลเป็นเหรียญทอง เหรียญเงิน หรือเหรียญทองแดงแล้ว รายการที่ยังเป็น “รอผล” จะยังไม่นับรวมในยอดเหรียญ
        </div>
      </div>
    </section>
  );
}
