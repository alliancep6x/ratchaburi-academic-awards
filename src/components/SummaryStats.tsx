"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, CalendarDays, Hourglass, School, Sparkles, UserRoundCheck, Users } from "lucide-react";
import { summary } from "@/data/summary";

const stats = [
  { label: "โรงเรียนในสังกัด", value: summary.schoolCount, suffix: "โรงเรียน", icon: School },
  { label: "บุคลากรทางการศึกษา", value: summary.educationStaffCount, suffix: "คน", icon: BriefcaseBusiness },
  { label: "นักเรียนเข้าร่วม", value: summary.studentCount, suffix: "คน", icon: Users },
  { label: "ครูและผู้ประสานงาน", value: summary.coachCount, suffix: "คน", icon: UserRoundCheck },
  { label: "รอประกาศผล", value: summary.pendingResults, suffix: "รายการ", icon: Hourglass },
  { label: "วันแข่งขัน", value: summary.competitionDays, suffix: "วัน", icon: CalendarDays }
];

export default function SummaryStats() {
  return (
    <section data-section="summary-stats" className="section-shell relative z-20 py-8 sm:-mt-10 sm:py-0">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="glass-panel rounded-2xl p-4 sm:rounded-3xl sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <Icon className="h-5 w-5 text-gold-light sm:h-6 sm:w-6" />
                <Sparkles className="h-4 w-4 text-white/35" />
              </div>
              <div className="mt-4 text-2xl font-extrabold text-white sm:mt-5 sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-white/58">{stat.suffix}</div>
              <div className="mt-3 text-xs font-medium leading-5 text-gold-light sm:text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
