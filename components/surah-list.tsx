import { Surah } from "@/lib/types/surah";
import Link from "next/link";
import SurahNameIconComponent from "./ui/surah-name-icon-component";

interface SurahListProps {
  surahs: Surah[];
}

export function SurahList({ surahs }: SurahListProps) {
  return (
    <div className="grid gap-4 grid-cols-3">
      {surahs.map(surah => (
        <Link key={surah.number} href={`/surahs/${surah.number}`}>
          <div className="p-4 bg-neutral cursor-pointer rounded-xl border border-neutral-300 hover:shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-indigo-100 flex items-center justify-center w-9 h-9">
                  <p className="text-xl text-indigo-700 font-semibold">
                    {surah.number}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary">{surah.name}</h3>
                  <p className="text-xs text-neutral-600">
                    {surah.englishNameTranslation}
                  </p>
                </div>
              </div>
              <SurahNameIconComponent
                surahNumber={surah.number}
                className="h-[50px] w-[108px] text-neutral-900"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
