import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer id="เกี่ยวกับเรา" className="border-t border-white/10 bg-midnight/80 py-12">
      <div className="section-shell grid gap-8 md:grid-cols-[1.3fr_.7fr]">
        <div>
          <h2 className="text-2xl font-extrabold text-white">สำนักการศึกษา เทศบาลเมืองราชบุรี</h2>
          <p className="mt-3 max-w-2xl leading-8 text-white/62">ระบบประกาศผลการแข่งขันทักษะทางวิชาการ ระดับภาคกลาง ประจำปี 2569</p>
        </div>
        <div className="grid gap-3 text-sm text-white/68">
          <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-gold-light" /> เทศบาลเมืองราชบุรี</p>
          <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold-light" /> 0xx-xxx-xxxx</p>
          <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold-light" /> education@example.go.th</p>
        </div>
      </div>
    </footer>
  );
}
