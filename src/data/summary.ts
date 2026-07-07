import { competitions } from "./competitions";
import { results } from "./results";
import { schools } from "./schools";

export const summary = {
  schoolCount: schools.length,
  competitionCount: competitions.length,
  goldMedals: results.filter((result) => result.medal === "ทอง").length,
  silverMedals: results.filter((result) => result.medal === "เงิน").length,
  bronzeMedals: results.filter((result) => result.medal === "ทองแดง").length,
  otherAwards: results.filter((result) => result.medal === "อื่น ๆ").length
};
