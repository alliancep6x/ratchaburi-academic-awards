"use client";

import { useEffect, useMemo, useState } from "react";
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
import { results } from "@/data/results";
import { schools } from "@/data/schools";
import { summary } from "@/data/summary";

const stats = [
  { label: "โรงเรียนในสังกัด", value: summary.schoolCount, suffix: "โรงเรียน", icon: School },
  { label: "บุคลากรทางการศึกษา", value: summary.educationStaffCount, suffix: "คน", icon: BriefcaseBusiness },
  { label: "นักเรียนเข้าร่วม", value: summary.studentCount, suffix: "คน", icon: Users },
  { label: "ครูและผู้ประสานงาน", value: summary.coachCount, suffix: "คน", icon: UserRoundCheck },
  { label: "รอประกาศผล", value: summary.pendingResults, suffix: "รายการ", icon: Hourglass },
  { label: "วันแข่งขัน", value: summary.competitionDays, suffix: "วัน", icon: CalendarDays }
];

type RosterType = "students" | "coaches";

const rosterGroups = schools.map((school) => ({
  ...school,
  students: Array.from(
    new Set(
      results
        .filter((result) => result.school === school.name)
        .flatMap((result) => result.students)
    )
  ).sort((left, right) => left.localeCompare(right, "th")),
  coaches: Array.from(
    new Set(
      results
        .filter((result) => result.school === school.name)
        .flatMap((result) => result.coaches)
    )
  ).sort((left, right) => left.localeCompare(right, "th"))
}));

const rosterConfigs = {
  students: {
    cardLabel: "นักเรียนเข้าร่วม",
    title: "รายชื่อนักเรียน",
    count: summary.studentCount,
    searchPlaceholder: "ค้นหาชื่อนักเรียน",
    totalLabel: "นักเรียนทั้งหมด",
    emptyLabel: "ไม่พบรายชื่อนักเรียน",
    ariaLabel: "ดูรายชื่อนักเรียนแยกตามโรงเรียน",
    dialogLabel: "รายชื่อนักเรียนเข้าร่วมการแข่งขัน",
    icon: Users
  },
  coaches: {
    cardLabel: "ครูและผู้ประสานงาน",
    title: "รายชื่อครูและผู้ประสานงาน",
    count: summary.coachCount,
    searchPlaceholder: "ค้นหาชื่อครู",
    totalLabel: "ครูและผู้ประสานงานทั้งหมด",
    emptyLabel: "ไม่พบรายชื่อครู",
    ariaLabel: "ดูรายชื่อครูและผู้ประสานงานแยกตามโรงเรียน",
    dialogLabel: "รายชื่อครูและผู้ประสานงาน",
    icon: UserRoundCheck
  }
} satisfies Record<RosterType, {
  cardLabel: string;
  title: string;
  count: number;
  searchPlaceholder: string;
  totalLabel: string;
  emptyLabel: string;
  ariaLabel: string;
  dialogLabel: string;
  icon: typeof Users;
}>;

export default function SummaryStats() {
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [rosterType, setRosterType] = useState<RosterType>("students");

  return (
    <>
      <section data-section="summary-stats" className="section-shell relative z-20 py-8 sm:-mt-10 sm:py-0">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const interactiveRoster = Object.entries(rosterConfigs).find(
              ([, config]) => config.cardLabel === stat.label
            ) as [RosterType, (typeof rosterConfigs)[RosterType]] | undefined;
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

            if (interactiveRoster) {
              const [nextRosterType, rosterConfig] = interactiveRoster;
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
                    setRosterType(nextRosterType);
                    setIsRosterOpen(true);
                  }}
                  className="glass-panel cursor-pointer rounded-2xl p-4 text-left transition hover:border-gold-light/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light sm:rounded-3xl sm:p-5"
                  aria-label={rosterConfig.ariaLabel}
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

      <ParticipantRosterModal
        open={isRosterOpen}
        type={rosterType}
        onClose={() => setIsRosterOpen(false)}
      />
    </>
  );
}

function ParticipantRosterModal({
  open,
  type,
  onClose
}: {
  open: boolean;
  type: RosterType;
  onClose: () => void;
}) {
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const config = rosterConfigs[type];
  const RosterIcon = config.icon;
  const selectedGroup = rosterGroups.find((group) => group.id === selectedSchoolId);
  const selectedMembers = selectedGroup?.[type] ?? [];
  const filteredMembers = useMemo(() => {
    if (!selectedGroup) return [];
    const keyword = query.trim().toLocaleLowerCase("th");
    if (!keyword) return selectedMembers;
    return selectedMembers.filter((member) => member.toLocaleLowerCase("th").includes(keyword));
  }, [query, selectedGroup, selectedMembers]);

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
              {selectedGroup ? (
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
                  <RosterIcon className="h-5 w-5" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-bold text-white sm:text-xl">
                  {selectedGroup ? selectedGroup.shortName : `${config.title} ${config.count} คน`}
                </h2>
                <p className="mt-0.5 truncate text-xs text-white/55">
                  {selectedGroup ? selectedGroup.name : "เลือกโรงเรียน"}
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

            {selectedGroup ? (
              <>
                <div className="border-b border-white/10 p-4 sm:px-6">
                  <label className="relative block">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder={config.searchPlaceholder}
                      className="h-11 w-full rounded-xl border border-white/12 bg-white/7 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-gold-light/55"
                    />
                  </label>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-white/55">{config.totalLabel}</span>
                    <span className="font-semibold text-gold-light">{selectedMembers.length} คน</span>
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-2 sm:px-6">
                  {filteredMembers.length ? (
                    <ol className="divide-y divide-white/8">
                      {filteredMembers.map((member, index) => (
                        <li key={member} className="flex min-h-12 items-center gap-3 py-2.5 text-sm text-white/85">
                          <span className="w-8 shrink-0 text-right tabular-nums text-white/35">{index + 1}</span>
                          <span className="min-w-0 leading-6">{member}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div className="grid min-h-48 place-items-center text-sm text-white/45">{config.emptyLabel}</div>
                  )}
                </div>
              </>
            ) : (
              <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  {rosterGroups.map((group) => (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setSelectedSchoolId(group.id)}
                      className="flex w-full items-center gap-4 border-b border-white/8 px-4 py-4 text-left transition last:border-b-0 hover:bg-white/7"
                    >
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/12 font-bold text-gold-light">
                        {group.emblem}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-white">{group.shortName}</div>
                        <div className="mt-1 truncate text-xs text-white/50">{group.name}</div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-lg font-bold text-white">{group[type].length}</div>
                        <div className="text-xs text-white/45">คน</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
