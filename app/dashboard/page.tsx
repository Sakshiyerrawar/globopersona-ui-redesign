"use client";

import { useState } from "react";

import MainLayout from "@/components/layout/MainLayout";

import {
  Rocket,
  Users,
  Eye,
  MousePointerClick,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  UserPlus,
  BarChart3,
  FileText,
  Filter,
  Activity,
  RefreshCcw,
} from "lucide-react";

const stats = [
  {
    title: "Total Campaigns",
    value: "0",
    subtitle: "Active & completed",
    icon: <Rocket size={18} />,
    bg: "bg-[#eef4ff]",
    iconBg: "bg-[#2563eb]",
    change: "↗ 0",
    changeColor: "text-[#059669]",
  },

  {
    title: "Total Recipients",
    value: "0",
    subtitle: "Reached contacts",
    icon: <Users size={18} />,
    bg: "bg-[#f8efff]",
    iconBg: "bg-[#9333ea]",
    change: "↗ 0",
    changeColor: "text-[#059669]",
  },

  {
    title: "Avg Open Rate",
    value: "0.0%",
    subtitle: "Email engagement",
    icon: <Eye size={18} />,
    bg: "bg-[#eefcf5]",
    iconBg: "bg-[#059669]",
    change: "↘ -1.2%",
    changeColor: "text-[#ef4444]",
  },

  {
    title: "Avg Click Rate",
    value: "0.0%",
    subtitle: "Link interactions",
    icon: <MousePointerClick size={18} />,
    bg: "bg-[#fff9eb]",
    iconBg: "bg-[#d97706]",
    change: "↘ -0.3%",
    changeColor: "text-[#ef4444]",
  },

  {
    title: "Emails Delivered",
    value: "0",
    subtitle: "Successfully sent",
    icon: <CheckCircle2 size={18} />,
    bg: "bg-[#eefcf5]",
    iconBg: "bg-[#16a34a]",
    change: "↗ 0",
    changeColor: "text-[#059669]",
  },

  {
    title: "Bounce Rate",
    value: "0.0%",
    subtitle: "Failed deliveries",
    icon: <TrendingDown size={18} />,
    bg: "bg-[#fff5f5]",
    iconBg: "bg-[#ef4444]",
    change: "↗ -0.5%",
    changeColor: "text-[#059669]",
  },
];

const quickActions = [
  {
    title: "Create Campaign",
    desc: "Design stunning email campaigns",
    icon: <Sparkles size={18} />,
    bg: "bg-[#eef4ff]",
    iconBg: "bg-[#2563eb]",
    badge: "Popular",
  },

  {
    title: "Import Contacts",
    desc: "Add new subscribers easily",
    icon: <UserPlus size={18} />,
    bg: "bg-[#f8efff]",
    iconBg: "bg-[#9333ea]",
  },

  {
    title: "View Analytics",
    desc: "Track performance metrics",
    icon: <BarChart3 size={18} />,
    bg: "bg-[#eefcf5]",
    iconBg: "bg-[#059669]",
  },

  {
    title: "Browse Templates",
    desc: "Professional email templates",
    icon: <FileText size={18} />,
    bg: "bg-[#fff9eb]",
    iconBg: "bg-[#d97706]",
    badge: "New",
  },

  {
    title: "Segment Lists",
    desc: "Target specific audiences",
    icon: <Filter size={18} />,
    bg: "bg-[#eef4ff]",
    iconBg: "bg-[#4f46e5]",
  },

  {
    title: "Email Accounts",
    desc: "Manage sender accounts",
    icon: <Activity size={18} />,
    bg: "bg-[#fff1f5]",
    iconBg: "bg-[#db2777]",
    badge: "Pro",
  },
];

export default function DashboardPage() {

  const [selectedRange, setSelectedRange] = useState("Last 7 days");

  const refreshDashboard = () => {
    window.location.reload();
  };

  return (

    <MainLayout>

      <div className="min-h-screen bg-[#f8f9fb] px-4 pb-5 pt-[2px]">

        {/* HEADER */}
        <div className="mb-3 flex items-center justify-between">

          <h2 className="text-[18px] font-semibold text-[#111827]">
            Performance Overview
          </h2>

          <div className="flex items-center gap-3">

            {/* DROPDOWN */}
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="h-[48px] rounded-2xl border border-[#d9dee7] bg-white px-5 pr-10 text-[15px] font-medium text-[#111827] shadow-sm outline-none transition"
            >

              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>

            </select>

            {/* REFRESH BUTTON */}
            <button
              onClick={refreshDashboard}
              className="flex h-[48px] w-[48px] items-center justify-center rounded-2xl border border-[#d9dee7] bg-white text-[#6b7280] shadow-sm transition-all duration-300 hover:bg-[#f3f4f6] hover:rotate-180"
            >

              <RefreshCcw size={18} />

            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">

          {stats.map((item) => (

            <div
              key={item.title}
              className={`${item.bg} rounded-[20px] border border-[#e5e7eb] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#d1d5db] hover:scale-[1.01] cursor-pointer`}
            >

              <div className="mb-5 flex items-start justify-between">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${item.iconBg}`}
                >
                  {item.icon}
                </div>

                <p className={`text-[14px] font-semibold ${item.changeColor}`}>
                  {item.change}
                </p>

              </div>

              <h3 className="text-[15px] font-medium text-[#374151]">
                {item.title}
              </h3>

              <p className="mt-2 text-[18px] font-bold text-[#111827]">
                {item.value}
              </p>

              <p className="mt-2 text-[13px] text-[#6b7280]">
                {item.subtitle}
              </p>

              <div className="mt-4 h-[6px] rounded-full bg-white/70"></div>

            </div>

          ))}

        </div>

        {/* QUICK ACTIONS */}
        <h2 className="mb-4 mt-5 text-[18px] font-semibold text-[#111827]">
          Quick Actions
        </h2>

        <div className="grid grid-cols-3 gap-4">

          {quickActions.map((item) => (

            <div
              key={item.title}
              className={`${item.bg} rounded-[20px] border border-[#e5e7eb] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#d1d5db] hover:scale-[1.01] cursor-pointer`}
            >

              <div className="mb-5 flex items-start justify-between">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${item.iconBg}`}
                >
                  {item.icon}
                </div>

                {item.badge && (

                  <span className="rounded-full bg-white px-3 py-1 text-[12px] font-medium text-[#2563eb] shadow-sm">
                    {item.badge}
                  </span>

                )}

              </div>

              <h3 className="text-[16px] font-semibold text-[#111827]">
                {item.title}
              </h3>

              <p className="mt-2 text-[14px] leading-6 text-[#6b7280]">
                {item.desc}
              </p>

              <button className="mt-4 text-[14px] font-medium text-[#6b7280] transition hover:text-[#111827]">
                Get started ↗
              </button>

            </div>

          ))}

        </div>

      </div>

    </MainLayout>

  );
}