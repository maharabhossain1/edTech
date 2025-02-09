"use client";

import { BookOpen, Home, Book, Layout, Calendar, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: Home, text: "Dashboard", href: "/" },
  { icon: Book, text: "Surahs", href: "/surah" },
  { icon: Layout, text: "Activities", href: "/activities" },
  { icon: Calendar, text: "Assignments", href: "/assignments" },
  { icon: Settings, text: "Settings", href: "#" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-neutral border-r border-neutral-300 transition-all duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-neutral-900" />
            <h1 className="text-xl font-bold text-neutral-900">My Companion</h1>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-4">
            {navItems.map((item, index) => {
              const isActive =
                pathname === item.href ||
                (pathname.startsWith(item.href) && item.href !== "/");

              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-neutral-100 transition-colors ${
                      isActive
                        ? "bg-neutral-100 text-neutral-900 font-semibold"
                        : ""
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
