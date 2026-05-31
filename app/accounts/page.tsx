"use client";

import MainLayout from "@/components/layout/MainLayout";

import {
  Mail,
  CheckCircle2,
  Activity,
  Settings,
  RefreshCcw,
  Plus,
  ShoppingCart,
} from "lucide-react";

const stats = [
  {
    title: "Active Accounts",
    value: "0",
    subtitle: "of 0 total",
    icon: <CheckCircle2 size={18} />,
    bg: "bg-[#eefcf5]",
    iconBg: "bg-[#22c55e]",
    titleColor: "text-[#15803d]",
  },

  {
    title: "Daily Limit",
    value: "0",
    subtitle: "emails per day",
    icon: <Mail size={18} />,
    bg: "bg-[#eef7ff]",
    iconBg: "bg-[#0ea5e9]",
    titleColor: "text-[#2563eb]",
  },

  {
    title: "Sent Today",
    value: "0",
    subtitle: "across all accounts",
    icon: <Activity size={18} />,
    bg: "bg-[#faf5ff]",
    iconBg: "bg-[#d946ef]",
    titleColor: "text-[#9333ea]",
  },

  {
    title: "Utilization",
    value: "0%",
    subtitle: "of daily capacity",
    icon: <Settings size={18} />,
    bg: "bg-[#fff7ed]",
    iconBg: "bg-[#f97316]",
    titleColor: "text-[#ea580c]",
  },
];

export default function AccountsPage() {
  return (
    <MainLayout>

      <div className="min-h-screen bg-[#f5f6f8] p-6">

        {/* PAGE TITLE */}
        <div className="mb-6">

          <h1 className="text-[38px] font-bold text-[#111827]">
            Email Accounts
          </h1>

          <p className="mt-2 text-[16px] text-[#6b7280]">
            Configure your sending accounts and domains
          </p>

        </div>

        {/* ACTION BUTTONS */}
        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-[22px] font-semibold text-[#111827]">
            Email Configuration
          </h2>

          <div className="flex items-center gap-4">

            <button className="flex h-12 items-center gap-2 rounded-2xl border border-[#d1d5db] bg-white px-6 text-[15px] font-medium text-[#374151] shadow-sm">
              <RefreshCcw size={16} />
              Refresh
            </button>

            <button className="flex h-12 items-center gap-2 rounded-2xl bg-[#f97316] px-6 text-[15px] font-medium text-white shadow-sm">
              <ShoppingCart size={16} />
              Get Professional Email
            </button>

            <button className="flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#9333ea] px-6 text-[15px] font-medium text-white shadow-sm">
              <Plus size={16} />
              Add Email Account
            </button>

          </div>

        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-4 gap-5">

          {stats.map((item) => (
            <div
              key={item.title}
              className={`${item.bg} rounded-3xl border border-[#dbe3ea] p-6 shadow-sm`}
            >

              <div className="mb-5 flex items-start justify-between">

                <div>
                  <p className={`text-[15px] font-medium ${item.titleColor}`}>
                    {item.title}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${item.iconBg}`}
                >
                  {item.icon}
                </div>

              </div>

              <h3 className="text-[42px] font-bold text-[#111827]">
                {item.value}
              </h3>

              <p className="mt-3 text-[15px] text-[#6b7280]">
                {item.subtitle}
              </p>

            </div>
          ))}
        </div>

        {/* EMAIL ACCOUNTS BOX */}
        <div className="mt-7 overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm">

          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-[#eef2f7] bg-[#f8fafc] px-7 py-6">

            <div>
              <h2 className="text-[28px] font-semibold text-[#111827]">
                Email Accounts
              </h2>

              <p className="mt-1 text-[15px] text-[#6b7280]">
                Manage your configured email accounts
              </p>
            </div>

            <span className="rounded-full bg-[#dbeafe] px-4 py-1 text-[14px] font-medium text-[#2563eb]">
              0 accounts
            </span>

          </div>

          {/* EMPTY STATE */}
          <div className="flex flex-col items-center justify-center py-28">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#f3f4f6]">
              <Mail size={48} className="text-[#9ca3af]" />
            </div>

            <h3 className="mt-8 text-[38px] font-semibold text-[#111827]">
              No email accounts configured
            </h3>

            <p className="mt-4 text-[18px] text-[#6b7280]">
              Add your first email account to start sending campaigns.
            </p>

            <button className="mt-8 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#9333ea] px-8 py-4 text-[17px] font-medium text-white shadow-sm">
              <Plus size={18} />
              Add Your First Account
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}