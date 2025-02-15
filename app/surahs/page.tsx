import { SurahList } from "@/components/surah-list";
import { surahs } from "@/data/surah";

export default function SurahPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Surah List</h1>

      <SurahList surahs={surahs} />
    </div>
  );
}
