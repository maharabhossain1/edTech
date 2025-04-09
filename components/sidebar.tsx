"use client";
import {
  BookOpen,
  Home,
  Book,
  Layout,
  Calendar,
  Settings,
  Menu,
  X,
  Users,
  GraduationCap,
  FileText,
  BarChart2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRole } from "@/contexts/RoleContext";

// Student navigation items
const studentNavItems = [
  { icon: Home, text: "Dashboard", href: "/" },
  { icon: Book, text: "Surahs", href: "/surahs" },
  { icon: Layout, text: "Activities", href: "/activities" },
  { icon: Calendar, text: "Assignments", href: "/assignments" },
  { icon: Settings, text: "Settings", href: "/settings/quran" },
];

// Teacher navigation items
const teacherNavItems = [
  { icon: Home, text: "Dashboard", href: "/teacher/dashboard" },
  { icon: Users, text: "Students", href: "/teacher/students" },
  { icon: FileText, text: "Assignments", href: "/teacher/assignments" },
  { icon: Layout, text: "Activities", href: "/teacher/activities" },
  { icon: BarChart2, text: "Reports", href: "/teacher/reports" },
  { icon: Settings, text: "Settings", href: "/settings/account" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isTeacher } = useRole();

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Function to determine if a nav item is active
  const isNavItemActive = useCallback(
    href => {
      return pathname === href || (pathname.startsWith(href) && href !== "/");
    },
    [pathname]
  );

  // Select the appropriate navigation items based on role
  const navItems = isTeacher ? teacherNavItems : studentNavItems;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      {/* Hamburger Menu - Fixed position on mobile only */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-neutral-200 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Container - Full height for mobile menu button placement */}
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <div className="flex items-center gap-2 ml-0 lg:ml-0">
              <BookOpen className="h-8 w-8 text-neutral-900" />
              <div>
                <h1 className="text-xl font-bold text-neutral-900">
                  My Companion
                </h1>
                <p className="text-xs text-indigo-600 font-medium">
                  {isTeacher ? "Teacher Mode" : "Student Mode"}
                </p>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-4">
              {navItems.map((item, index) => {
                const active = isNavItemActive(item.href);
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-neutral-100 transition-colors ${
                        active
                          ? "bg-neutral-100 text-neutral-900 font-semibold"
                          : ""
                      }`}
                      onClick={closeSidebar}
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
      </aside>
    </>
  );
}
