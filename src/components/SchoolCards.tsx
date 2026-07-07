"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { schools } from "@/data/schools";

export default function SchoolCards() {
  return (
    <section id="โรงเรียนในสังกัด" className="section-shell py-14 sm:py-20">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-gold-light">Municipal Schools</p>
          <h2 className="mt-2 text-2xl font-extrabold leading-tight text-white sm:text-4xl">5 โรงเรียนในสังกัดเทศบาลเมืองราชบุรี</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-white/64">พื้นที่รวมผลงานและเส้นทางการแข่งขันของโรงเรียนในสังกัด พร้อมเข้าสู่ผลการแข่งขันรายโรงเรียน</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {schools.map((school, index) => (
          <motion.article key={school.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} whileHover={{ y: -8 }} className="glass-panel group overflow-hidden rounded-2xl sm:rounded-3xl">
            <div className="relative h-40 overflow-hidden" style={{ background: school.image }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,.35),transparent_9rem)]" />
              <div className="absolute left-4 top-4 grid h-14 w-14 place-items-center rounded-2xl border border-white/25 bg-midnight/45 text-lg font-extrabold text-gold-light backdrop-blur-md">
                {school.emblem}
              </div>
              <ShieldCheck className="absolute bottom-4 right-4 h-9 w-9 text-white/70" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-gold-light">{school.shortName}</p>
              <h3 className="mt-2 text-base font-bold leading-7 text-white sm:min-h-20 sm:text-lg">{school.name}</h3>
              <a href="#ผลการแข่งขัน" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold-light/35 bg-gold/15 px-4 py-3 text-sm font-semibold text-gold-light transition group-hover:bg-gold group-hover:text-midnight">
                ดูผลการแข่งขัน
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
