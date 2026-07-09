import { competitions } from "./competitions";
import { results } from "./results";
import { schools } from "./schools";

const uniqueCoaches = new Set(results.flatMap((result) => result.coaches));
const uniqueStudents = new Set(results.flatMap((result) => result.students));

export const summary = {
  schoolCount: schools.length,
  competitionCount: competitions.length,
  studentCount: uniqueStudents.size,
  coachCount: uniqueCoaches.size,
  pendingResults: results.filter((result) => result.medal === "รอผล").length,
  competitionDays: new Set(competitions.map((competition) => competition.date)).size,
  goldMedals: results.filter((result) => result.medal === "ทอง").length,
  silverMedals: results.filter((result) => result.medal === "เงิน").length,
  bronzeMedals: results.filter((result) => result.medal === "ทองแดง").length,
  otherAwards: results.filter((result) => result.medal === "อื่น ๆ").length
};
