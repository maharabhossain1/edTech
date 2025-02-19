"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

const SettingsSidebarNav = ({
  className,
  items,
  ...props
}: SidebarNavProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2",
        className
      )}
      {...props}
      data-test="settings-sidebar-nav"
    >
      {items.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "hover:bg-muted bg-neutral-100 font-semibold"
              : "hover:bg-transparent hover:underline",
            "justify-start rounded-lg text-base"
          )}
          data-test={item.dataTest}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default SettingsSidebarNav;
