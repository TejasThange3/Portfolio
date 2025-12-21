import BentoGrid from "@/components/home/BentoGrid";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <div className="w-full min-h-screen pb-20">
        <BentoGrid />
      </div>
    </>
  );
}
