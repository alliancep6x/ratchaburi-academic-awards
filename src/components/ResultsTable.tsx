"use client";

import { Fragment, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, ImageIcon, Search, SlidersHorizontal } from "lucide-react";
import { results, type Medal } from "@/data/results";
import { scheduleDates } from "@/data/competitions";
import { schools } from "@/data/schools";
import { cn, medalClass } from "@/lib/utils";

const levels = ["ทั้งหมด", "อนุบาล", "ป.1-3", "ป.4-6", "ป.1-6", "ม.1-3", "ม.4-6", "ม.1-6", "ครู", "-"];
const medals = ["ทั้งหมด", "รอผล", "ทอง", "เงิน", "ทองแดง", "อื่น ๆ"];

export default function ResultsTable() {
  const [date, setDate] = useState("ทั้งหมด");
  const [school, setSchool] = useState("ทั้งหมด");
  const [level, setLevel] = useState("ทั้งหมด");
  const [medal, setMedal] = useState("ทั้งหมด");
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredResults = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return results.filter((result) => {
      const matchDate = date === "ทั้งหมด" || result.date === date;
      const matchSchool = school === "ทั้งหมด" || result.school === school;
      const matchLevel = level === "ทั้งหมด" || result.level === level;
      const matchMedal = medal === "ทั้งหมด" || result.medal === medal;
      const matchQuery = !keyword || `${result.event} ${result.school} ${result.award} ${result.note} ${result.students.join(" ")} ${result.coaches.join(" ")} ${result.venue}`.toLowerCase().includes(keyword);
      return matchDate && matchSchool && matchLevel && matchMedal && matchQuery;
    });
  }, [date, school, level, medal, query]);

  return (
    <section id="ผลการแข่งขัน" className="section-shell py-14 sm:py-20">
      <div className="mb-8">
        <p className="text-sm font-semibold text-gold-light">Latest Results</p>
        <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-4xl">ผลการแข่งขันล่าสุด</h2>
      </div>

      <div className="glass-panel rounded-2xl p-4 sm:rounded-3xl sm:p-6">
        <div className="mb-6 flex items-center gap-2 text-gold-light">
          <SlidersHorizontal className="h-5 w-5" />
          <span className="font-semibold">ตัวกรองผลการแข่งขัน</span>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.1fr_1.5fr_1fr_1fr_1.6fr]">
          <Select label="วันที่" value={date} onChange={setDate} options={["ทั้งหมด", ...scheduleDates]} />
          <Select label="โรงเรียน" value={school} onChange={setSchool} options={["ทั้งหมด", ...schools.map((item) => item.name)]} />
          <Select label="ระดับชั้น" value={level} onChange={setLevel} options={levels} />
          <Select label="รางวัล" value={medal} onChange={setMedal} options={medals} />
          <label className="block">
            <span className="mb-2 block text-xs text-white/58">ค้นหารายการแข่งขัน</span>
            <span className="flex items-center gap-2 rounded-2xl border border-white/12 bg-midnight/50 px-4 py-3">
              <Search className="h-4 w-4 text-gold-light" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="พิมพ์ชื่อรายการหรือหมายเหตุ" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35" />
            </span>
          </label>
        </div>

        <div className="mt-7 hidden overflow-hidden rounded-2xl border border-white/10 lg:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-white/10 text-gold-light">
              <tr>
                {["วันที่", "รายการแข่งขัน", "ระดับ", "โรงเรียน", "รางวัล", "เหรียญ", "คะแนน", "รายละเอียด"].map((head) => (
                  <th key={head} className="px-4 py-4 font-semibold">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {filteredResults.map((result) => (
                <Fragment key={result.id}>
                  <tr className="bg-midnight/35 transition hover:bg-white/8">
                    <td className="px-4 py-4 text-white/68">{result.date}</td>
                    <td className="px-4 py-4 font-semibold text-white">{result.event}</td>
                    <td className="px-4 py-4 text-white/72">{result.level}</td>
                    <td className="px-4 py-4 text-white/72">{result.school}</td>
                    <td className="px-4 py-4 text-gold-light">{result.award}</td>
                    <td className="px-4 py-4"><MedalBadge medal={result.medal} /></td>
                    <td className="px-4 py-4 font-bold text-white">{result.score ?? "-"}</td>
                    <td className="px-4 py-4">
                      <button type="button" onClick={() => setExpandedId(expandedId === result.id ? null : result.id)} className="inline-flex items-center gap-2 rounded-full border border-gold-light/30 bg-gold/12 px-3 py-2 text-xs font-semibold text-gold-light transition hover:bg-gold hover:text-midnight">
                        {expandedId === result.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        ดูเพิ่มเติม
                      </button>
                    </td>
                  </tr>
                  {expandedId === result.id ? (
                    <tr className="bg-midnight/55">
                      <td colSpan={8} className="px-4 py-4">
                        <ResultDetails result={result} />
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-7 grid gap-4 lg:hidden">
          {filteredResults.map((result) => (
            <article key={result.id} className="rounded-2xl border border-white/10 bg-midnight/45 p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-white/55">{result.date}</p>
                  <h3 className="mt-1 text-lg font-bold text-white">{result.event}</h3>
                </div>
                <MedalBadge medal={result.medal} />
              </div>
              <div className="grid gap-2 text-sm text-white/70">
                <p><span className="text-gold-light">ระดับ:</span> {result.level}</p>
                <p><span className="text-gold-light">โรงเรียน:</span> {result.school}</p>
                <p><span className="text-gold-light">รางวัล:</span> {result.award}</p>
                <p><span className="text-gold-light">คะแนน:</span> {result.score ?? "-"}</p>
                <p><span className="text-gold-light">หมายเหตุ:</span> {result.note}</p>
              </div>
              <button type="button" onClick={() => setExpandedId(expandedId === result.id ? null : result.id)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold-light/30 bg-gold/12 px-4 py-3 text-sm font-semibold text-gold-light">
                {expandedId === result.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                ดูรายชื่อนักเรียนและครู
              </button>
              {expandedId === result.id ? <div className="mt-4"><ResultDetails result={result} /></div> : null}
            </article>
          ))}
        </div>

        {filteredResults.length === 0 ? <div className="mt-7 rounded-2xl border border-white/10 bg-white/8 p-8 text-center text-white/68">ไม่พบผลการแข่งขันตามตัวกรองที่เลือก</div> : null}
      </div>
    </section>
  );
}

function ResultDetails({ result }: { result: (typeof results)[number] }) {
  return (
    <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/8 p-4 text-sm text-white/72 md:grid-cols-4">
      <DetailBlock title="รายชื่อนักเรียน" lines={result.students.length ? result.students : ["ไม่มีข้อมูล"]} />
      <DetailBlock title="ครูผู้ฝึกสอน" lines={result.coaches.length ? result.coaches : ["ไม่มีข้อมูล"]} />
      <DetailBlock title="สถานที่แข่งขัน" lines={[result.venue]} />
      <div>
        <div className="mb-2 font-semibold text-gold-light">รูปภาพ</div>
        {result.image ? (
          <div className="aspect-video rounded-2xl border border-white/10 bg-cover bg-center" style={{ backgroundImage: `url(${result.image})` }} />
        ) : (
          <div className="flex min-h-24 items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-midnight/45 text-white/45">
            <ImageIcon className="h-4 w-4" />
            ยังไม่มีรูปภาพ
          </div>
        )}
      </div>
    </div>
  );
}

function DetailBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div>
      <div className="mb-2 font-semibold text-gold-light">{title}</div>
      <div className="grid gap-1">
        {lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-white/58">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-2xl border border-white/12 bg-midnight/70 px-4 py-3 text-sm text-white outline-none transition focus:border-gold-light/60">
        {options.map((option) => (
          <option key={option} value={option} className="bg-midnight text-white">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function MedalBadge({ medal }: { medal: Medal }) {
  return <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-bold", medalClass(medal))}>{medal}</span>;
}
