"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { competitions, scheduleDates } from "@/data/competitions";
import { cn } from "@/lib/utils";

export default function ScheduleTabs() {
  const [selectedDate, setSelectedDate] = useState(scheduleDates[0]);
  const items = useMemo(() => competitions.filter((item) => item.date === selectedDate), [selectedDate]);

  return (
    <section id="ตารางการแข่งขัน" className="relative py-14 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-sapphire/25 via-transparent to-gold/10" />
      <div className="section-shell relative">
        <div className="mb-8">
          <p className="text-sm font-semibold text-gold-light">Competition Schedule</p>
          <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-4xl">ตารางการแข่งขัน</h2>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {scheduleDates.map((date) => (
            <button key={date} type="button" onClick={() => setSelectedDate(date)} className={cn("rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition", selectedDate === date ? "border-gold-light bg-gold text-midnight shadow-glow" : "border-white/12 bg-white/8 text-white/78 hover:border-gold-light/40 hover:text-gold-light")}>
              <CalendarDays className="mb-2 h-5 w-5" />
              {date}
            </button>
          ))}
        </div>

        <motion.div key={selectedDate} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-2xl p-4 sm:rounded-3xl sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-white sm:text-xl">{selectedDate}</h3>
            <span className="rounded-full border border-gold-light/30 bg-gold/15 px-3 py-1 text-sm text-gold-light">{items.length} รายการ</span>
          </div>
          <div className="grid gap-3">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-midnight/42 p-4 transition hover:border-gold-light/35 hover:bg-white/10">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-base font-semibold text-white">{item.event} <span className="text-gold-light">{item.level}</span></div>
                    <div className="mt-2 flex items-start gap-2 text-sm text-white/62">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                      {item.venue}
                    </div>
                  </div>
                  <span className="w-fit rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-white/70">รอประกาศผล</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
