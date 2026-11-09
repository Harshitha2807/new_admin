"use client";

import { Send } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { greenTheme as T } from "@/shared/theme";
import { Btn, Card, PageHeader } from "@/shared/ui";
import { PAYROLL_SUMMARY } from "../data/management";

/* ══════════════════════════════════════════════════════════════════════
   §09 · PAYROLL (kept lean)
   ══════════════════════════════════════════════════════════════════════ */

export const PayrollRun = () => (
  <div>
    <PageHeader
      title="Payroll"
      sub="October 2026 · Diwali bonus run active"
      action={<Btn variant="primary" icon={Send}>Submit to finance</Btn>}
    />

    <Card padding={0} className="text-white border-0 mb-5 overflow-hidden" style={{ background: `linear-gradient(135deg, ${T.gDeep} 0%, ${T.gDark} 100%)` }}>
      <div className="py-5 px-5 sm:py-6 sm:px-7 grid grid-cols-3 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-4 sm:gap-7 items-center">
        <div className="col-span-3 md:col-span-1">
          <div className="text-[11px] text-a tracking-[2px] uppercase font-extrabold mb-1.5">Active cycle · Diwali included</div>
          <div className="text-[24px] sm:text-[30px] font-extrabold tracking-[-0.8px]">October 2026</div>
          <div className="text-[13px] opacity-85 mt-1.5">Cutoff <strong className="text-a">26 Oct</strong> · Pay date <strong className="text-a">31 Oct</strong></div>
        </div>
        <div>
          <div className="text-[10.5px] tracking-[1.5px] uppercase opacity-75 font-extrabold">Eligible</div>
          <div className="text-[16px] sm:text-[24px] whitespace-nowrap font-extrabold mt-1 font-mono">128</div>
        </div>
        <div>
          <div className="text-[10.5px] tracking-[1.5px] uppercase opacity-75 font-extrabold">Gross</div>
          <div className="text-[16px] sm:text-[24px] whitespace-nowrap font-extrabold mt-1 font-mono">₹ 4.22 Cr</div>
        </div>
        <div>
          <div className="text-[10.5px] tracking-[1.5px] uppercase opacity-75 font-extrabold">Diwali bonus</div>
          <div className="text-[16px] sm:text-[24px] whitespace-nowrap font-extrabold mt-1 text-a font-mono">₹ 1.42 Cr</div>
        </div>
      </div>
    </Card>

    <Card padding={22}>
      <div className="text-[15px] font-bold text-ink tracking-[-0.3px] mb-3.5">6-month payroll trend</div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={PAYROLL_SUMMARY.trend}>
          <CartesianGrid strokeDasharray="2 4" stroke={T.border} vertical={false}/>
          <XAxis dataKey="m" axisLine={false} tickLine={false} style={{ fontSize: 11, fill: T.ink3 }}/>
          <YAxis axisLine={false} tickLine={false} style={{ fontSize: 11, fill: T.ink3 }} tickFormatter={v => `${(v/10000000).toFixed(1)}Cr`}/>
          <Tooltip contentStyle={{ background: T.ink, border: "none", borderRadius: 8, fontSize: 12, color: "#fff" }} formatter={v => `₹ ${v.toLocaleString("en-IN")}`}/>
          <Bar dataKey="v" fill={T.g} radius={[8, 8, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  </div>
);
