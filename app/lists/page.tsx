"use client";

import { useState } from "react";
import Link from "next/link";

import MainLayout from "@/components/layout/MainLayout";

import {
  Database,
  Users,
  TrendingUp,
  Star,
  Mail,
  Search,
  Filter,
  Grid3X3,
  List,
  Upload,
  RefreshCcw,
  CheckCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Lists",
    value: "0",
    subtitle: "Active",
    icon: <Database size={18} />,
    bg: "bg-[#eef4ff]",
    iconBg: "bg-[#2563eb]",
  },

  {
    title: "Total Contacts",
    value: "0",
    subtitle: "Valid",
    icon: <Users size={18} />,
    bg: "bg-[#edf8f1]",
    iconBg: "bg-[#16a34a]",
  },

  {
    title: "This Month",
    value: "+0",
    subtitle: "New",
    icon: <TrendingUp size={18} />,
    bg: "bg-[#f6efff]",
    iconBg: "bg-[#9333ea]",
  },

  {
    title: "Avg. Quality",
    value: "0%",
    subtitle: "Score",
    icon: <Star size={18} />,
    bg: "bg-[#fbf5ea]",
    iconBg: "bg-[#f59e0b]",
  },

  {
    title: "Open Rate",
    value: "0%",
    subtitle: "Avg",
    icon: <Mail size={18} />,
    bg: "bg-[#fff1f5]",
    iconBg: "bg-[#f43f5e]",
  },

  {
    title: "Click Rate",
    value: "0%",
    subtitle: "Avg",
    icon: <Database size={18} />,
    bg: "bg-[#eefbff]",
    iconBg: "bg-[#06b6d4]",
  },
];

export default function EmailListsPage() {
  const [loading, setLoading] = useState(false);

  const refreshPage = () => {
    setLoading(true);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f5f6f8] p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-[30px] font-bold text-[#111827]">
              Email Lists
            </h1>

            <p className="text-[#6b7280] mt-1">
              Manage and organise your contact lists
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* REFRESH */}
            <button
              onClick={refreshPage}
              className="
                h-[48px]
                px-5
                rounded-xl
                border
                border-[#d1d5db]
                bg-white
                flex
                items-center
                gap-2
                text-[#374151]
                hover:bg-[#f9fafb]
                transition-all
              "
            >
              <RefreshCcw
                size={16}
                className={loading ? "animate-spin" : ""}
              />

              {loading ? "Refreshing..." : "Refresh"}
            </button>

            {/* UPLOAD */}
            <Link href="/email-list/upload">

  <button
    className="
      h-[48px]
      px-6
      rounded-xl
      text-white
      font-semibold
      bg-gradient-to-r
      from-[#2563eb]
      to-[#9333ea]
      flex
      items-center
      gap-2
      hover:scale-105
      hover:shadow-xl
      transition-all
    "
  >
    <Upload size={16} />
    Upload
  </button>

</Link>

          </div>
        </div>

        {/* TABS + BUTTONS */}
        <div className="mt-6 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <button
              className="
                h-[44px]
                px-5
                rounded-xl
                bg-white
                border
                border-[#d1d5db]
                font-medium
                text-[#111827]
              "
            >
              Lists
            </button>

            <button
              className="
                h-[44px]
                px-5
                rounded-xl
                bg-[#f3f4f6]
                text-[#6b7280]
                font-medium
              "
            >
              Contacts
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-5 mt-5">

          {stats.map((card, index) => (
            <div
              key={index}
              className={`
                ${card.bg}
                rounded-2xl
                p-5
                border
                border-[#e5e7eb]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                cursor-pointer
              `}
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[14px] text-[#6b7280]">
                    {card.title}
                  </p>

                  <h2 className="text-[34px] font-bold mt-2 text-[#111827]">
                    {card.value}
                  </h2>

                  <p className="text-[13px] text-[#9ca3af] mt-2">
                    {card.subtitle}
                  </p>

                </div>

                <div
                  className={`
                    w-12
                    h-12
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-white
                    ${card.iconBg}
                  `}
                >
                  {card.icon}
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* SEARCH SECTION */}
        <div className="mt-6 bg-white rounded-2xl border border-[#e5e7eb] p-4">

          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <div className="flex-1 flex items-center h-[56px] border border-[#d1d5db] rounded-xl px-4">

              <Search size={18} className="text-[#9ca3af]" />

              <input
                type="text"
                placeholder="Search lists by name, description, or tags..."
                className="
                  ml-3
                  w-full
                  outline-none
                  bg-transparent
                  text-[15px]
                  placeholder:text-[#9ca3af]
                "
              />

            </div>

            {/* STATUS */}
            <button
              className="
                h-[56px]
                px-5
                rounded-xl
                border
                border-[#d1d5db]
                bg-white
                text-[#374151]
              "
            >
              All Status
            </button>

            {/* FILTER */}
            <button
              className="
                h-[56px]
                px-5
                rounded-xl
                border
                border-[#d1d5db]
                bg-white
                flex
                items-center
                gap-2
                text-[#374151]
              "
            >
              <Filter size={16} />
              Filters
            </button>

            {/* GRID LIST */}
            <div className="flex items-center rounded-xl border border-[#d1d5db] overflow-hidden">

              <button
                className="
                  h-[56px]
                  px-5
                  bg-[#eff6ff]
                  text-[#2563eb]
                  flex
                  items-center
                  gap-2
                "
              >
                <Grid3X3 size={16} />
                Grid
              </button>

              <button
                className="
                  h-[56px]
                  px-5
                  bg-white
                  text-[#6b7280]
                  flex
                  items-center
                  gap-2
                "
              >
                <List size={16} />
                List
              </button>

            </div>

          </div>
        </div>

        {/* EMPTY STATE */}
        <div className="mt-6 bg-white rounded-2xl border border-[#e5e7eb] py-24">

          <div className="flex flex-col items-center justify-center">

            <div className="w-20 h-20 rounded-full bg-[#eef2ff] flex items-center justify-center">

              <Database size={40} className="text-[#2563eb]" />

            </div>

            <h2 className="mt-6 text-[42px] font-bold text-[#111827]">
              No Email Lists Found
            </h2>

            <p className="mt-3 text-[20px] text-[#6b7280] text-center max-w-[700px] leading-9">
              Upload your first CSV file and begin building
              connections with your audience.
            </p>

            <button
              className="
                mt-8
                flex
                items-center
                gap-2
                px-8
                py-4
                rounded-2xl
                text-white
                font-semibold
                text-[17px]
                bg-gradient-to-r
                from-[#2563eb]
                to-[#9333ea]
                hover:scale-105
                hover:shadow-2xl
                transition-all
              "
            >
              <Upload size={18} />
              Upload Your First List
            </button>

          </div>
        </div>

        {/* UNSUBSCRIBED USERS */}
        <div className="mt-6 bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">

          <div className="h-2 bg-gradient-to-r from-[#ef4444] via-[#f97316] to-[#ec4899]" />

          <div className="p-5 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-[#fff1f2] flex items-center justify-center">

                <Users size={20} className="text-[#f97316]" />

              </div>

              <div>

                <h3 className="text-[24px] font-bold text-[#111827]">
                  Unsubscribed Users
                </h3>

                <p className="text-[#6b7280] mt-1">
                  Contacts who replied with unsubscribe / not-interested messages
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <div className="flex items-center h-[48px] border border-[#d1d5db] rounded-xl px-4">

                <Search size={16} className="text-[#9ca3af]" />

                <input
                  type="text"
                  placeholder="Search..."
                  className="
                    ml-2
                    outline-none
                    bg-transparent
                    text-sm
                  "
                />

              </div>

              <button
                className="
                  h-[48px]
                  px-5
                  rounded-xl
                  border
                  border-[#d1d5db]
                  bg-white
                  flex
                  items-center
                  gap-2
                  text-[#374151]
                "
              >
                <RefreshCcw size={16} />
                Refresh
              </button>

            </div>

          </div>

          {/* EMPTY */}
          <div className="py-20 flex flex-col items-center justify-center">

            <div className="w-20 h-20 rounded-full bg-[#ecfdf5] flex items-center justify-center">

              <CheckCircle
                size={40}
                className="text-[#22c55e]"
              />

            </div>

            <h3 className="text-[32px] font-bold text-[#111827] mt-6">
              No unsubscribed users
            </h3>

            <p className="text-[#6b7280] mt-3">
              No unsubscribe replies detected yet
            </p>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}