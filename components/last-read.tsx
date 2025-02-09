import { LastRead } from "@/lib/types/surah";
import { Badge } from "./ui/badge";

interface LastReadSectionProps {
  verses: LastRead[];
}

export function LastReadSection({ verses }: LastReadSectionProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-neutral-900">Last Read</p>
      <div className="space-x-2 ">
        {verses.map(verse => (
          <Badge
            key={`${verse.surah}-${verse.verse}`}
            variant="outline"
            className="px-4 py-1.5 border border-neutral-300 rounded-lg bg-neutral font-semibold hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-200 cursor-pointer"
          >
            {verse.surah} {verse.verse}
          </Badge>
        ))}
      </div>
    </div>
  );
}
