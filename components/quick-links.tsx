import { Badge } from "@/components/ui/badge";
import { QuickLink } from "@/lib/types/surah";
import Link from "next/link";

interface QuickLinksProps {
  links: QuickLink[];
}

export function QuickLinks({ links }: QuickLinksProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-neutral-900">Quick Links</p>
      <div className="space-x-2">
        {links.map(link => (
          <Link key={link.name} href={link.href}>
            <Badge
              variant="outline"
              className="px-4 py-1.5 border border-neutral-300 rounded-lg bg-neutral font-semibold hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-200"
            >
              {link.name}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
