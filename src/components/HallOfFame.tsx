"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Crown, Landmark, Medal, Sparkles, Star, Trophy } from "lucide-react";

const highlights = [
  { label: "รางวัลชนะเลิศ", value: "Champion", icon: Trophy },
  { label: "เหรียญทอง", value: "Gold Medal", icon: Medal },
  { label: "ตัวแทนระดับประเทศ", value: "National Stage", icon: Crown },
  { label: "รางวัลยอดเยี่ยม", value: "Excellence", icon: Star }
];

export default function HallOfFame() {
  return (
    <section id="Hall of Fame" className="relative overflow-hidden py-20">
      <div className="absolute inset-x-0 top-20 h-64 bg-[radial-gradient(circle_at_50%_20%,rgba(215,170,66,.25),transparent_34rem)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[linear-gradient(90deg,transparent,rgba(247,223,155,.08),transparent)]" />
      <div className="section-shell relative">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
          <Image src="/images/ratchaburi/wat-mahathat.jpg" alt="วัดมหาธาตุวรวิหาร จังหวัดราชบุรี" fill sizes="100vw" className="object-cover opacity-18" />
          <div className="absolute inset-0 bg-gradient-to-br from-midnight via-midnight/86 to-midnight/70" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(247,223,155,.16),transparent)]" />
          <div className="absolute left-1/2 top-0 h-64 w-40 -translate-x-1/2 bg-gold-light/20 blur-3xl" />
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
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm font-semibold text-white/78">
                <Landmark className="h-4 w-4 text-gold-light" />
                เชื่อมความภูมิใจของนักเรียนเข้ากับอัตลักษณ์เมืองราชบุรี
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="group relative overflow-hidden rounded-3xl border border-gold-light/25 bg-midnight/62 p-6 transition hover:-translate-y-1 hover:border-gold-light/55">
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/20 blur-2xl" />
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                    <Icon className="relative h-9 w-9 text-gold-light" />
                    <p className="relative mt-5 text-sm text-white/58">{item.value}</p>
                    <h3 className="relative mt-1 text-xl font-bold text-white">{item.label}</h3>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="relative mt-10 grid gap-4 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/8">
              <Image src="/images/ratchaburi/river-sculpture.jpg" alt="ประติมากรรมริมแม่น้ำแม่กลอง จังหวัดราชบุรี" width={720} height={420} className="h-52 w-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/85 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <div className="text-sm font-semibold text-gold-light">Ratchaburi Landmark</div>
                <div className="text-xl font-extrabold text-white">เมืองแห่งศิลปะ วัฒนธรรม และความสามารถ</div>
              </div>
            </div>
            <div className="rounded-3xl border border-gold-light/20 bg-gradient-to-r from-gold/25 via-white/8 to-sapphire/25 p-6 text-center lg:text-left">
              <Sparkles className="mx-auto h-8 w-8 text-gold-light lg:mx-0" />
              <p className="mt-3 text-lg font-semibold leading-8 text-white">ยกย่องทุกความพยายาม ทุกความสามารถ และทุกความภาคภูมิใจของชาวราชบุรี</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
