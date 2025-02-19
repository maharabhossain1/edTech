import type React from "react";
import SettingsSidebarNav from "@/components/settings-sidebar";

const sidebarNavItems = [
  {
    title: "Quran Preference",
    href: "/settings/quran",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Password Reset",
    href: "/settings/password-reset",
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="pb-6" data-test="settings-page">
      <h1 className="text-3xl font-bold" data-test="settings-title">
        Settings
      </h1>
      <div className="mt-6 rounded-2xl border border-neutral-300 bg-neutral p-6 shadow">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-6 lg:space-y-0">
          <aside className="lg:w-1/5" data-test="settings-sidebar">
            <SettingsSidebarNav items={sidebarNavItems} />
          </aside>
          <div className="max-w-[536px] flex-1" data-test="settings-content">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
