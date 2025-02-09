import { LastReadSection } from "@/components/last-read";
import { QuickLinks } from "@/components/quick-links";
import { SurahList } from "@/components/surah-list";
import { lastReadVerses, quickLinks, surahs } from "@/data/surah";

export default function SurahPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Surah List</h1>
      <div className="px-6 py-4 border border-neutral-300 bg-neutral rounded-2xl space-y-6 max-w-3xl">
        <LastReadSection verses={lastReadVerses} />
        <QuickLinks links={quickLinks} />
      </div>

      <SurahList surahs={surahs} />
    </div>
  );
}
