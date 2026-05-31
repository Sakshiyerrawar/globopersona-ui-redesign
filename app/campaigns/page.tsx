"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import MainLayout from "@/components/layout/MainLayout";

import {
  Target,
  Pencil,
  Brain,
  Users,
  Mail,
  MousePointerClick,
  Search,
  Filter,
  Grid3X3,
  List,
  Plus,
  RefreshCcw,
} from "lucide-react";

const stats = [
  {
    title: "Total Campaigns",
    value: "0",
    subtitle: "All campaigns",
    icon: <Target size={18} />,
    bg: "bg-[#eef4ff]",
    iconBg: "bg-[#2563eb]",
  },

  {
    title: "Manual Campaigns",
    value: "0",
    subtitle: "User created",
    icon: <Pencil size={18} />,
    bg: "bg-[#edf8f1]",
    iconBg: "bg-[#16a34a]",
  },

  {
    title: "AI Campaigns",
    value: "0",
    subtitle: "AI personalized",
    icon: <Brain size={18} />,
    bg: "bg-[#f6efff]",
    iconBg: "bg-[#9333ea]",
  },

  {
    title: "Total Recipients",
    value: "0",
    subtitle: "Email contacts",
    icon: <Users size={18} />,
    bg: "bg-[#fbf5ea]",
    iconBg: "bg-[#ea580c]",
  },

  {
    title: "Open Rate",
    value: "0%",
    subtitle: "Unique opens",
    icon: <Mail size={18} />,
    bg: "bg-[#fff1f5]",
    iconBg: "bg-[#db2777]",
  },

  {
    title: "Click Rate",
    value: "0%",
    subtitle: "Average clicks",
    icon: <MousePointerClick size={18} />,
    bg: "bg-[#eefbff]",
    iconBg: "bg-[#0891b2]",
  },
];

export default function CampaignsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const refreshPage = () => {
    setLoading(true);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const openCreateCampaign = () => {
    router.push("/campaigns/create");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f5f6f8] p-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-[32px] font-bold text-[#111827]">
              Email Campaigns
            </h1>

            <p className="mt-1 text-[15px] text-[#6b7280]">
              Create, schedule and track your email campaigns
            </p>
          </div>

          <div className="flex items-center gap-4">

            {/* REFRESH BUTTON */}
            <button
              onClick={refreshPage}
              className="
                flex items-center gap-2
                rounded-xl
                border border-[#d1d5db]
                bg-white
                px-5 py-3
                text-[14px]
                font-medium
                text-[#374151]
                shadow-sm
                hover:bg-[#f9fafb]
                hover:shadow-md
                transition-all
              "
            >
              <RefreshCcw
                size={16}
                className={loading ? "animate-spin" : ""}
              />

              {loading ? "Refreshing..." : "Refresh"}
            </button>

            {/* NEW CAMPAIGN BUTTON */}
            <button
              onClick={openCreateCampaign}
              className="
                flex items-center gap-2
                rounded-xl
                bg-gradient-to-r
                from-[#2563eb]
                to-[#9333ea]
                px-6 py-3
                text-[14px]
                font-semibold
                text-white
                shadow-md
                hover:scale-105
                hover:shadow-2xl
                transition-all
              "
            >
              <Plus size={16} />
              New Campaign
            </button>

          </div>
        </div>

        {/* PAGE TITLE CARD */}
        <div className="flex items-center gap-3 mb-6">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#9333ea] flex items-center justify-center text-white">
            <Mail size={18} />
          </div>

          <h2 className="text-[26px] font-bold text-[#111827]">
            Email Campaigns
          </h2>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-5">

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

        {/* FILTER SECTION */}
        <div className="mt-8 bg-white rounded-2xl border border-[#e5e7eb] p-4">

          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <div className="flex-1 flex items-center h-[56px] border border-[#d1d5db] rounded-xl px-4">

              <Search size={18} className="text-[#9ca3af]" />

              <input
                type="text"
                placeholder="Search campaigns by name, description, or email list..."
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

            {/* TYPES */}
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
              All Types
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
        <div className="mt-8 bg-white rounded-2xl border border-[#e5e7eb] py-28">

          <div className="flex flex-col items-center justify-center">

            <div className="w-24 h-24 rounded-full bg-[#f3f4f6] flex items-center justify-center">

              <Mail size={42} className="text-[#9ca3af]" />

            </div>

            <h2 className="mt-8 text-[44px] font-bold text-[#111827]">
              No Campaigns Yet
            </h2>

            <p className="mt-4 text-[22px] text-[#6b7280] text-center leading-10 max-w-[700px]">
              Get started by creating your first email campaign.
              Choose between manual or AI-personalized campaigns.
            </p>

            <button
              onClick={openCreateCampaign}
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
              <Plus size={18} />
              Create Your First Campaign
            </button>

          </div>
        </div>

      </div>
    </MainLayout>
  );
}