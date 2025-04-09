import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { AutoBreadcrumb } from "@/components/auto-breadcrumb";
import {
  amiri,
  bismillah,
  ibm_plex_sans_arabic,
  kfgqpc_hafs,
  kitab,
  lateef,
  me_quran,
  plus_jakarta_sans,
  qalam,
} from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { RoleProvider } from "@/contexts/RoleContext";

export const metadata: Metadata = {
  title: "My Quran Companion",
  description: "A personalized Quran companion application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = [
    plus_jakarta_sans.variable,
    ibm_plex_sans_arabic.variable,
    lateef.variable,
    qalam.variable,
    me_quran.variable,
    amiri.variable,
    kfgqpc_hafs.variable,
    kitab.variable,
    bismillah.variable,
  ].join(" ");

  return (
    <html lang="en" suppressHydrationWarning className={`${fontClasses}`}>
      <body suppressHydrationWarning className="antialiased">
        <RoleProvider>
          <div className="min-h-screen flex bg-neutral-50 text-neutral-900 font-plus_jakarta_sans">
            {/* Sidebar component */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 w-full lg:ml-64 transition-all duration-300">
              <Header />
              <main className="min-h-[calc(100vh-64px)] mt-16 relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full py-6">
                  <AutoBreadcrumb />
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster />
        </RoleProvider>
      </body>
    </html>
  );
}
