"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { DashboardProvider } from "@/shared/context/DashboardContext";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import type { DashboardConfig } from "./types";

/** Sidebar + header app shell. The window never scrolls: sidebar and header stay put and
    `<main>` is the scroll container for every page. `data-dashboard` switches brand colours.
    Below the `lg` breakpoint the sidebar is hidden and opens as a slide-in menu. */
export const DashboardShell = ({ config, children }: { config: DashboardConfig; children: ReactNode }) => {
  const pathname = usePathname();
  // Full-bleed pages (e.g. the inbox) fill the content area edge to edge and manage their own scrolling.
  const fullBleed = pathname?.endsWith("/inbox");
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the user moves to another page.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
  <DashboardProvider theme={config.theme} viewer={config.viewer} basePath={config.basePath}>
    <div data-dashboard={config.id} className="flex h-screen overflow-hidden bg-canvas font-sans text-ink">
      <Sidebar config={config} open={menuOpen} onClose={() => setMenuOpen(false)}/>
      <div className="flex-1 min-w-0 min-h-0 flex flex-col">
        <TopBar config={config} onMenuClick={() => setMenuOpen(true)}/>
        <main className={`flex-1 min-h-0 flex flex-col ${fullBleed ? "overflow-hidden" : "overflow-y-auto pt-5 px-4 pb-10 sm:pt-6 sm:px-6 lg:pt-7 lg:px-8 lg:pb-15"}`}>
          {children}
        </main>
      </div>
    </div>
  </DashboardProvider>
  );
};
