"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Logo } from "@/shared/ui";
import { RoleSwitcher } from "./RoleSwitcher";
import type { DashboardConfig } from "./types";

const hrefFor = (basePath: string, slug: string) => (slug === "home" ? basePath : `${basePath}/${slug}`);

const ITEM = "w-full flex items-center gap-2.75 py-2.25 px-3 mb-0.5 rounded-[9px] text-[13px] text-left no-underline transition-colors";

type SidebarProps = { config: DashboardConfig; open: boolean; onClose: () => void };

/** Preline-style sidebar: logo, role switcher, primary nav and footer nav.
    On large screens (lg and up) it is always visible. On smaller screens it is hidden
    off-screen and slides in when `open` is true, with a dark backdrop behind it. */
export const Sidebar = ({ config, open, onClose }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <>
    {/* Backdrop: only on small screens while the menu is open. Tapping it closes the menu. */}
    <div
      aria-hidden="true"
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-40 bg-[rgba(15,23,42,0.5)] transition-opacity lg:hidden",
        open ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    />
    <aside
      className={cn(
        "w-62 shrink-0 h-full flex flex-col bg-paper border-e border-border",
        "fixed inset-y-0 start-0 z-50 transition-transform duration-200 lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="py-4.5 px-5 border-b border-border flex items-center justify-between">
        <Logo size={config.logo.size} label={config.logo.label} accentLabel={config.logo.accentLabel}/>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="lg:hidden size-8 flex items-center justify-center rounded-lg bg-canvas text-ink-2 hover:bg-accent-mist"
        >
          <X size={16}/>
        </button>
      </div>

      <RoleSwitcher active={config.id} note={config.switcherNote}/>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.4px] uppercase px-2.5 pt-1 pb-2">Menu</div>
        {config.nav.map(item => {
          const Icon = item.icon;
          const href = hrefFor(config.basePath, item.slug);
          const on = pathname === href;
          return (
            <Link
              key={item.slug}
              href={href}
              aria-current={on ? "page" : undefined}
              className={cn(ITEM, on ? "bg-accent text-white font-bold" : "bg-transparent text-ink-2 font-medium hover:bg-accent-mist")}
            >
              <Icon size={16} className="shrink-0"/>
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={cn(
                  "text-white text-[10px] font-extrabold py-px px-1.5 rounded-full min-w-4.5 text-center",
                  on ? "bg-white/25" : "bg-a",
                )}>{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="pt-2 px-2 pb-3 border-t border-border">
        {config.bottomNav.map(item => {
          const Icon = item.icon;
          const content = <><Icon size={16}/><span className="flex-1">{item.label}</span></>;
          if (!item.slug) {
            return (
              <button key={item.label} type="button" className={cn(ITEM, "bg-transparent border-0 text-ink-2 font-medium hover:bg-accent-mist")}>
                {content}
              </button>
            );
          }
          const href = hrefFor(config.basePath, item.slug);
          const on = pathname === href;
          return (
            <Link
              key={item.slug}
              href={href}
              aria-current={on ? "page" : undefined}
              className={cn(ITEM, "text-ink-2 hover:bg-accent-mist", on ? "bg-accent-mist font-bold" : "bg-transparent font-medium")}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </aside>
    </>
  );
};
