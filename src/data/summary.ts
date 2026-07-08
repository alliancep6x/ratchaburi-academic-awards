import { competitions } from "./competitions";
import { results } from "./results";
import { schools } from "./schools";

const uniqueCoaches = new Set(results.flatMap((result) => result.coaches));

export const summary = {
  schoolCount: schools.length,
  competitionCount: competitions.length,
  studentCount: results.reduce((total, result) => total + result.students.length, 0),
  coachCount: uniqueCoaches.size,
  pendingResults: results.filter((result) => result.medal === "รอผล").length,
  competitionDays: new Set(competitions.map((competition) => competition.date)).size,
  goldMedals: results.filter((result) => result.medal === "ทอง").length,
  silverMedals: results.filter((result) => result.medal === "เงิน").length,
  bronzeMedals: results.filter((result) => result.medal === "ทองแดง").length,
  otherAwards: results.filter((result) => result.medal === "อื่น ๆ").length
};
