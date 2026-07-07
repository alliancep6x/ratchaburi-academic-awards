import Footer from "@/components/Footer";
import HallOfFame from "@/components/HallOfFame";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ResultsTable from "@/components/ResultsTable";
import ScheduleTabs from "@/components/ScheduleTabs";
import SchoolCards from "@/components/SchoolCards";
import SummaryStats from "@/components/SummaryStats";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <SummaryStats />
      <SchoolCards />
      <ScheduleTabs />
      <ResultsTable />
      <HallOfFame />
      <Footer />
    </main>
  );
}
