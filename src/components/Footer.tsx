import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer id="เกี่ยวกับเรา" className="border-t border-white/10 bg-midnight/80 py-12">
      <div className="section-shell grid gap-8 md:grid-cols-[1.3fr_.7fr]">
        <div>
          <h2 className="text-2xl font-extrabold text-white">สำนักการศึกษา เทศบาลเมืองราชบุรี</h2>
          <p className="mt-3 max-w-2xl leading-8 text-white/62">
            ระบบประกาศผลการแข่งขันทักษะทางวิชาการ เฉพาะสังกัดสำนักการศึกษา เทศบาลเมืองราชบุรี
          </p>
        </div>
        <div className="grid gap-3 text-sm text-white/68">
          <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-gold-light" /> สำนักการศึกษา เทศบาลเมืองราชบุรี</p>
          <a className="flex items-center gap-3 transition hover:text-gold-light" href="tel:0814495659">
            <Phone className="h-4 w-4 text-gold-light" /> 081-449-5659
          </a>
          <a className="flex items-center gap-3 transition hover:text-gold-light" href="mailto:alliancepx@icloud.com">
            <Mail className="h-4 w-4 text-gold-light" /> alliancepx@icloud.com
          </a>
        </div>
      </div>
    </footer>
  );
}
