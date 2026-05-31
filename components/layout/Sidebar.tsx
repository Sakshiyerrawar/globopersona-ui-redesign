"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Mail,
  Send,
  Flame,
  Bot,
  Inbox,
  CalendarDays,
  Library,
  GitBranch,
  Globe,
} from "lucide-react";

import { FaLinkedinIn } from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Email Lists",
    icon: Users,
    path: "/lists",
  },
  {
    name: "Email Accounts",
    icon: Mail,
    path: "/email-accounts",
  },
  {
    name: "Email Campaign",
    icon: Send,
    path: "/campaigns",
  },
  {
    name: "Email Warmup",
    icon: Flame,
    path: "#",
  },
  {
    name: "AI Automation",
    icon: Bot,
    path: "#",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    path: "#",
  },
  {
    name: "Inbox",
    icon: Inbox,
    path: "#",
  },
  {
    name: "Scheduled Event",
    icon: CalendarDays,
    path: "#",
  },
  {
    name: "Template Library",
    icon: Library,
    path: "#",
  },
  {
    name: "Pipeline",
    icon: GitBranch,
    path: "#",
  },
  {
    name: "Integrations",
    icon: Globe,
    path: "#",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[270px] border-r border-[#e5e7eb] bg-white flex flex-col">

      {/* LOGO */}
      <div className="h-[78px] border-b border-[#e5e7eb] flex items-center px-6">

        <div className="flex items-center gap-3">

          <img
            src="/360airo-logo.png"
            alt="360Airo"
            className="h-11 w-11 object-contain"
          />

          <h1 className="text-[20px] font-bold text-[#111827]">
            360Airo
          </h1>

        </div>

      </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[17px] font-medium transition-all duration-200
              ${
                active
                  ? "bg-[#eef4ff] text-[#2563eb]"
                  : "text-[#111827] hover:bg-[#f3f4f6]"
              }`}
            >
              <Icon size={21} />

              <span>{item.name}</span>

              {(item.name === "Email Warmup" ||
                item.name === "AI Automation" ||
                item.name === "LinkedIn") && (
                <span className="ml-auto text-[15px] text-[#f59e0b]">
                  👑
                </span>
              )}
            </Link>
          );
        })}

      </div>

      {/* BOTTOM CARD */}
      <div className="m-4 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-[15px] font-semibold text-[#111827]">
              Free
            </p>

            <p className="mt-1 text-[13px] text-gray-500">
              Getting started
            </p>
          </div>

          <p className="text-[14px] font-medium text-gray-500">
            $0/mo
          </p>

        </div>

        <div className="mt-4 flex gap-3">

          <button className="flex-1 rounded-lg bg-[#f3f4f6] py-2 text-[13px] font-medium text-[#111827]">
            View Plan
          </button>

          <button className="flex-1 rounded-lg bg-[#2563eb] py-2 text-[13px] font-medium text-white">
            Upgrade ↗
          </button>

        </div>

      </div>

    </aside>
  );
}