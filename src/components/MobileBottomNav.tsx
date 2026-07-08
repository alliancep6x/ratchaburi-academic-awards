"use client";

import { CalendarDays, Home, Medal, School, Trophy } from "lucide-react";

const items = [
  { label: "หน้าแรก", href: "#home", icon: Home },
  { label: "ผลแข่งขัน", href: "#ผลการแข่งขัน", icon: Medal },
  { label: "ตาราง", href: "#ตารางการแข่งขัน", icon: CalendarDays },
  { label: "โรงเรียน", href: "#โรงเรียนในสังกัด", icon: School },
  { label: "Hall", href: "#Hall of Fame", icon: Trophy }
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 rounded-3xl border border-gold-light/25 bg-midnight/88 px-2 py-2 shadow-glass backdrop-blur-2xl lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <a key={item.href} href={item.href} className="group relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-semibold text-white/62 transition active:scale-95">
              {index === 0 ? <span className="absolute top-1 h-1 w-5 rounded-full bg-gold shadow-glow" /> : null}
              <Icon className="h-5 w-5 text-gold-light transition group-hover:scale-110" />
              <span className="truncate">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
