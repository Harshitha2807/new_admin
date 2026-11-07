"use client";

import type { ReactNode } from "react";
import { useViewer } from "@/shared/context/DashboardContext";

export interface PageHeaderProps {
  title: ReactNode;
  sub?: ReactNode;
  action?: ReactNode;
}

export const PageHeader = ({ title, sub, action }: PageHeaderProps) => {
  const viewer = useViewer();
  return (
    <div className="flex flex-wrap justify-between items-end gap-3 mb-5 sm:mb-6">
      <div>
        <div className="text-[13px] text-ink-3 font-semibold mb-1">Hello {viewer.name.split(" ")[0]}!</div>
        <h1 className="text-[24px] sm:text-[28px] font-extrabold text-ink m-0 tracking-[-1px] leading-[1.1]">{title}</h1>
        {sub && <div className="text-[13.5px] text-ink-3 mt-1.5 tracking-[-0.1px]">{sub}</div>}
      </div>
      {action}
    </div>
  );
};
