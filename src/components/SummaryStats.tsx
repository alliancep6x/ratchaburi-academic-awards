"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  Hourglass,
  School,
  Search,
  Sparkles,
  UserRoundCheck,
  Users,
  X
} from "lucide-react";
import { results, type Result } from "@/data/results";
import { schools } from "@/data/schools";
import { summary } from "@/data/summary";

type DetailType = "schools" | "students" | "coaches" | "pending";

type SummaryStat = {
  label: string;
  value: number;
  suffix: string;
  icon: typeof School;
  detailType?: DetailType;
};

const stats: SummaryStat[] = [
  { label: "โรงเรียนในสังกัด", value: summary.schoolCount, suffix: "โรงเรียน", icon: School, detailType: "schools" },
  { label: "บุคลากรทางการศึกษา", value: summary.educationStaffCount, suffix: "คน", icon: BriefcaseBusiness },
  { label: "นักเรียนเข้าร่วม", value: summary.studentCount, suffix: "คน", icon: Users, detailType: "students" },
  { label: "ครูและผู้ประสานงาน", value: summary.coachCount, suffix: "คน", icon: UserRoundCheck, detailType: "coaches" },
  { label: "รอประกาศผล", value: summary.pendingResults, suffix: "รายการ", icon: Hourglass, detailType: "pending" },
  { label: "วันแข่งขัน", value: summary.competitionDays, suffix: "วัน", icon: CalendarDays }
];

const uniqueThaiNames = (names: string[]) =>
  Array.from(new Set(names)).sort((left, right) => left.localeCompare(right, "th"));

const summaryGroups = schools.map((school) => {
  const schoolResults = results.filter((result) => result.school === school.name);

  return {
    ...school,
    results: schoolResults,
    pendingResults: schoolResults.filter((result) => result.medal === "รอผล"),
    students: uniqueThaiNames(schoolResults.flatMap((result) => result.students)),
    coaches: uniqueThaiNames(schoolResults.flatMap((result) => result.coaches))
  };
});

const detailConfigs = {
  schools: {
    title: "โรงเรียนในสังกัด",
    count: summary.schoolCount,
    suffix: "โรงเรียน",
    ariaLabel: "ดูข้อมูลโรงเรียนในสังกัด",
    dialogLabel: "ข้อมูลโรงเรียนในสังกัด",
    icon: School
  },
  students: {
    title: "รายชื่อนักเรียน",
    count: summary.studentCount,
    suffix: "คน",
    ariaLabel: "ดูรายชื่อนักเรียนแยกตามโรงเรียน",
    dialogLabel: "รายชื่อนักเรียนเข้าร่วมการแข่งขัน",
    icon: Users
  },
  coaches: {
    title: "รายชื่อครูและผู้ประสานงาน",
    count: summary.coachCount,
    suffix: "คน",
    ariaLabel: "ดูรายชื่อครูและผู้ประสานงานแยกตามโรงเรียน",
    dialogLabel: "รายชื่อครูและผู้ประสานงาน",
    icon: UserRoundCheck
  },
  pending: {
    title: "รายการรอประกาศผล",
    count: summary.pendingResults,
    suffix: "รายการ",
    ariaLabel: "ดูรายการแข่งขันที่รอประกาศผล",
    dialogLabel: "รายการแข่งขันที่รอประกาศผล",
    icon: Hourglass
  }
} satisfies Record<DetailType, {
  title: string;
  count: number;
  suffix: string;
  ariaLabel: string;
  dialogLabel: string;
  icon: typeof School;
}>;

export default function SummaryStats() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailType, setDetailType] = useState<DetailType>("students");

  return (
    <>
      <section data-section="summary-stats" className="section-shell relative z-20 py-8 sm:-mt-10 sm:py-0">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const content = (
              <>
                <div className="flex items-center justify-between gap-3">
                  <Icon className="h-5 w-5 text-gold-light sm:h-6 sm:w-6" />
                  <Sparkles className="h-4 w-4 text-white/35" />
                </div>
                <div className="mt-4 text-2xl font-extrabold text-white sm:mt-5 sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs text-white/58">{stat.suffix}</div>
                <div className="mt-3 text-xs font-medium leading-5 text-gold-light sm:text-sm">{stat.label}</div>
              </>
            );

            if (stat.detailType) {
              const config = detailConfigs[stat.detailType];
              return (
                <motion.button
                  key={stat.label}
                  type="button"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -3 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => {
                    setDetailType(stat.detailType!);
                    setIsDetailOpen(true);
                  }}
                  className="glass-panel cursor-pointer rounded-2xl p-4 text-left transition hover:border-gold-light/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light sm:rounded-3xl sm:p-5"
                  aria-label={config.ariaLabel}
                >
                  {content}
                </motion.button>
              );
            }

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="glass-panel rounded-2xl p-4 sm:rounded-3xl sm:p-5"
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </section>

      <SummaryDetailModal
        open={isDetailOpen}
        type={detailType}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
}

function SummaryDetailModal({
  open,
  type,
  onClose
}: {
  open: boolean;
  type: DetailType;
  onClose: () => void;
}) {
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const config = detailConfigs[type];
  const DetailIcon = config.icon;
  const selectedGroup = summaryGroups.find((group) => group.id === selectedSchoolId);
  const memberType = type === "students" || type === "coaches" ? type : null;
  const selectedMembers = selectedGroup && memberType ? selectedGroup[memberType] : [];
  const keyword = query.trim().toLocaleLowerCase("th");
  const filteredMembers = keyword
    ? selectedMembers.filter((member) => member.toLocaleLowerCase("th").includes(keyword))
    : selectedMembers;
  const selectedPendingResults = selectedGroup?.pendingResults ?? [];
  const filteredPendingResults = keyword
    ? selectedPendingResults.filter((result) =>
        [result.event, result.level, result.date, result.venue]
          .some((value) => value.toLocaleLowerCase("th").includes(keyword))
      )
    : selectedPendingResults;

  useEffect(() => {
    if (!open) {
      setSelectedSchoolId(null);
      setQuery("");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, open]);

  const showBackButton = type !== "schools" && Boolean(selectedGroup);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={config.dialogLabel}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-[#101d31] shadow-2xl sm:max-h-[84vh] sm:max-w-3xl sm:rounded-3xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4 sm:px-6">
              {showBackButton ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSchoolId(null);
                    setQuery("");
                  }}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10"
                  aria-label="กลับไปเลือกโรงเรียน"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              ) : (
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-light">
                  <DetailIcon className="h-5 w-5" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-bold text-white sm:text-xl">
                  {selectedGroup && type !== "schools"
                    ? selectedGroup.shortName
                    : `${config.title} ${config.count} ${config.suffix}`}
                </h2>
                <p className="mt-0.5 truncate text-xs text-white/55">
                  {selectedGroup && type !== "schools"
                    ? selectedGroup.name
                    : type === "schools" ? "ข้อมูลภาพรวมแต่ละโรงเรียน" : "เลือกโรงเรียน"}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10"
                aria-label="ปิดหน้าต่าง"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {type === "schools" ? (
              <SchoolOverview />
            ) : selectedGroup ? (
              type === "pending" ? (
                <PendingResultList
                  query={query}
                  onQueryChange={setQuery}
                  total={selectedPendingResults.length}
                  results={filteredPendingResults}
                />
              ) : (
                <MemberList
                  type={type}
                  query={query}
                  onQueryChange={setQuery}
                  total={selectedMembers.length}
                  members={filteredMembers}
                />
              )
            ) : (
              <SchoolChooser type={type} onSelect={setSelectedSchoolId} />
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SchoolOverview() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="overflow-hidden rounded-2xl border border-white/10">
        {summaryGroups.map((group) => (
          <div key={group.id} className="border-b border-white/8 px-4 py-4 last:border-b-0 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/12 font-bold text-gold-light">
                {group.emblem}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-white">{group.shortName}</div>
                <div className="mt-0.5 truncate text-xs text-white/50">{group.name}</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 divide-x divide-white/10 rounded-xl bg-white/5 py-2.5 text-center">
              <div>
                <div className="font-bold text-white">{group.students.length}</div>
                <div className="mt-0.5 text-[11px] text-white/45">นักเรียน</div>
              </div>
              <div>
                <div className="font-bold text-white">{group.coaches.length}</div>
                <div className="mt-0.5 text-[11px] text-white/45">ครู</div>
              </div>
              <div>
                <div className="font-bold text-white">{group.results.length}</div>
                <div className="mt-0.5 text-[11px] text-white/45">รายการ</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchoolChooser({
  type,
  onSelect
}: {
  type: Exclude<DetailType, "schools">;
  onSelect: (schoolId: string) => void;
}) {
  const getCount = (group: (typeof summaryGroups)[number]) => {
    if (type === "students") return group.students.length;
    if (type === "coaches") return group.coaches.length;
    return group.pendingResults.length;
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="overflow-hidden rounded-2xl border border-white/10">
        {summaryGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => onSelect(group.id)}
            className="flex w-full items-center gap-4 border-b border-white/8 px-4 py-4 text-left transition last:border-b-0 hover:bg-white/7"
            aria-label={`เลือก${group.shortName}`}
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/12 font-bold text-gold-light">
              {group.emblem}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-white">{group.shortName}</div>
              <div className="mt-1 truncate text-xs text-white/50">{group.name}</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-lg font-bold text-white">{getCount(group)}</div>
              <div className="text-xs text-white/45">{type === "pending" ? "รายการ" : "คน"}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MemberList({
  type,
  query,
  onQueryChange,
  total,
  members
}: {
  type: "students" | "coaches";
  query: string;
  onQueryChange: (query: string) => void;
  total: number;
  members: string[];
}) {
  const isStudent = type === "students";

  return (
    <>
      <SearchPanel
        query={query}
        onQueryChange={onQueryChange}
        placeholder={isStudent ? "ค้นหาชื่อนักเรียน" : "ค้นหาชื่อครู"}
        totalLabel={isStudent ? "นักเรียนทั้งหมด" : "ครูและผู้ประสานงานทั้งหมด"}
        total={`${total} คน`}
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-2 sm:px-6">
        {members.length ? (
          <ol className="divide-y divide-white/8">
            {members.map((member, index) => (
              <li key={member} className="flex min-h-12 items-center gap-3 py-2.5 text-sm text-white/85">
                <span className="w-8 shrink-0 text-right tabular-nums text-white/35">{index + 1}</span>
                <span className="min-w-0 leading-6">{member}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="grid min-h-48 place-items-center text-sm text-white/45">
            {isStudent ? "ไม่พบรายชื่อนักเรียน" : "ไม่พบรายชื่อครู"}
          </div>
        )}
      </div>
    </>
  );
}

function PendingResultList({
  query,
  onQueryChange,
  total,
  results: pendingResults
}: {
  query: string;
  onQueryChange: (query: string) => void;
  total: number;
  results: Result[];
}) {
  return (
    <>
      <SearchPanel
        query={query}
        onQueryChange={onQueryChange}
        placeholder="ค้นหาชื่อรายการ ระดับชั้น หรือสถานที่"
        totalLabel="รายการที่รอประกาศผล"
        total={`${total} รายการ`}
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-2 sm:px-6">
        {pendingResults.length ? (
          <ol className="divide-y divide-white/8">
            {pendingResults.map((result, index) => (
              <li key={result.id} className="flex gap-3 py-3.5">
                <span className="w-8 shrink-0 pt-0.5 text-right text-sm tabular-nums text-white/35">{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium leading-6 text-white/90">{result.event}</div>
                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/50">
                    <span>{result.level}</span>
                    <span>{result.date}</span>
                  </div>
                  <div className="mt-1 truncate text-xs text-white/38">{result.venue}</div>
                </div>
                <span className="h-fit shrink-0 rounded-full border border-gold-light/25 bg-gold/10 px-2 py-1 text-[10px] font-semibold text-gold-light">
                  รอผล
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="grid min-h-48 place-items-center text-sm text-white/45">ไม่พบรายการแข่งขัน</div>
        )}
      </div>
    </>
  );
}

function SearchPanel({
  query,
  onQueryChange,
  placeholder,
  totalLabel,
  total
}: {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder: string;
  totalLabel: string;
  total: string;
}) {
  return (
    <div className="border-b border-white/10 p-4 sm:px-6">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-white/12 bg-white/7 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-gold-light/55"
        />
      </label>
      <div className="mt-3 flex items-center justify-between gap-3 text-xs">
        <span className="text-white/55">{totalLabel}</span>
        <span className="shrink-0 font-semibold text-gold-light">{total}</span>
      </div>
    </div>
  );
}
