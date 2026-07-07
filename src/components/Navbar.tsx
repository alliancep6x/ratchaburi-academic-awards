"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Menu, Sparkles, X } from "lucide-react";

const navItems = ["หน้าแรก", "ผลการแข่งขัน", "ตารางการแข่งขัน", "โรงเรียนในสังกัด", "Hall of Fame", "เกี่ยวกับเรา"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-midnight/80 backdrop-blur-2xl">
      <nav className="section-shell flex h-24 items-center justify-between gap-4">
        <a href="#" className="flex min-w-0 items-center gap-4">
          <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-gold-light/60 bg-white shadow-glow sm:h-[4.5rem] sm:w-[4.5rem]">
            <Image src="/images/education-office-logo.jpg" alt="โลโก้สำนักการศึกษา เทศบาลเมืองราชบุรี" fill sizes="72px" className="object-cover" priority />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-extrabold leading-tight text-white sm:text-xl">สำนักการศึกษา</span>
            <span className="block truncate text-sm font-semibold leading-tight text-gold-light/95 sm:text-base">เทศบาลเมืองราชบุรี</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item === "หน้าแรก" ? "home" : item}`} className="rounded-full px-4 py-2 text-sm text-white/74 transition hover:bg-white/10 hover:text-gold-light">
              {item}
            </a>
          ))}
        </div>

        <a href="#ผลการแข่งขัน" className="hidden items-center gap-2 rounded-full border border-gold-light/40 bg-gold/18 px-5 py-3 text-sm font-semibold text-gold-light shadow-glow transition hover:bg-gold/25 sm:flex">
          <Bell className="h-4 w-4" />
          ประกาศล่าสุด
        </a>

        <button type="button" aria-label="เปิดเมนู" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed left-0 top-0 z-[100] h-dvh min-h-svh w-screen overflow-y-auto bg-[#061126] p-4 lg:hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(215,170,66,.18),transparent_16rem),radial-gradient(circle_at_88%_12%,rgba(16,47,115,.55),transparent_18rem),linear-gradient(180deg,#061126_0%,#071431_55%,#050914_100%)]" />
            <div className="relative flex items-center justify-between border-b border-gold-light/15 pb-4">
              <div className="flex items-center gap-3 text-gold-light">
                <Sparkles className="h-5 w-5" />
                <span className="text-xl font-bold">เมนูเว็บไซต์</span>
              </div>
              <button type="button" aria-label="ปิดเมนู" onClick={() => setOpen(false)} className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/12 shadow-glass">
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="relative mt-6 grid gap-3">
              {navItems.map((item) => (
                <a key={item} href={`#${item === "หน้าแรก" ? "home" : item}`} onClick={() => setOpen(false)} className="rounded-2xl border border-gold-light/18 bg-[#0d1b3a] px-5 py-4 text-lg font-semibold text-white shadow-glass transition active:scale-[0.99]">
                  {item}
                </a>
              ))}
              <a href="#ผลการแข่งขัน" onClick={() => setOpen(false)} className="mt-3 rounded-2xl bg-gold px-5 py-5 text-center text-lg font-extrabold text-midnight shadow-glow">
                ประกาศล่าสุด
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
