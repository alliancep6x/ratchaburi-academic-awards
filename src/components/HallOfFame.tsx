"use client";

import { motion } from "framer-motion";
import { Crown, Medal, Sparkles, Star, Trophy } from "lucide-react";

const highlights = [
  { label: "รางวัลชนะเลิศ", value: "Champion", icon: Trophy },
  { label: "เหรียญทอง", value: "Gold Medal", icon: Medal },
  { label: "ตัวแทนระดับประเทศ", value: "National Stage", icon: Crown },
  { label: "รางวัลยอดเยี่ยม", value: "Excellence", icon: Star }
];

export default function HallOfFame() {
  return (
    <section id="Hall of Fame" className="relative py-20">
      <div className="absolute inset-x-0 top-20 h-64 bg-[radial-gradient(circle_at_50%_20%,rgba(215,170,66,.25),transparent_34rem)]" />
      <div className="section-shell relative">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel overflow-hidden rounded-[2rem] p-6 sm:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(247,223,155,.12),transparent)]" />
          <div className="relative grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-light/35 bg-gold/15 px-4 py-2 text-gold-light">
                <Crown className="h-5 w-5" />
                Hall of Fame
              </div>
              <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl">
                เวทีเกียรติยศ
                <span className="gold-text block">แห่งความสำเร็จ</span>
              </h2>
              <p className="mt-5 leading-8 text-white/68">รวมผลงานเด่นจากนักเรียน ครู และโรงเรียนในสังกัดเทศบาลเมืองราชบุรี ที่สร้างชื่อเสียงในการแข่งขันทักษะทางวิชาการระดับภาคกลาง</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="relative overflow-hidden rounded-3xl border border-gold-light/25 bg-midnight/55 p-6">
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/20 blur-2xl" />
                    <Icon className="relative h-9 w-9 text-gold-light" />
                    <p className="relative mt-5 text-sm text-white/58">{item.value}</p>
                    <h3 className="relative mt-1 text-xl font-bold text-white">{item.label}</h3>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="relative mt-10 rounded-3xl border border-gold-light/20 bg-gradient-to-r from-gold/25 via-white/8 to-sapphire/25 p-5 text-center">
            <Sparkles className="mx-auto h-8 w-8 text-gold-light" />
            <p className="mt-3 text-lg font-semibold text-white">ยกย่องทุกความพยายาม ทุกความสามารถ และทุกความภาคภูมิใจของชาวราชบุรี</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
