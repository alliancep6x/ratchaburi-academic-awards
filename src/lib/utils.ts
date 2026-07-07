import type { Medal } from "@/data/results";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function medalClass(medal: Medal) {
  switch (medal) {
    case "ทอง":
      return "border-yellow-200/50 bg-yellow-300/20 text-yellow-100";
    case "เงิน":
      return "border-slate-100/50 bg-slate-200/18 text-slate-50";
    case "ทองแดง":
      return "border-orange-200/50 bg-orange-400/20 text-orange-100";
    case "รอผล":
      return "border-gold-light/40 bg-gold/15 text-gold-light";
    default:
      return "border-white/30 bg-white/10 text-white";
  }
}
