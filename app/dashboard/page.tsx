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
  Play,
  Pause,
  Trash2,
  Download,
  Mail,
  List,
  Grid3X3,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useData } from "@/components/shared/DataProvider";

const baseStats = [
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
  const router = useRouter();
  const { metrics, campaigns, updateCampaign, deleteCampaign } = useData();
  const [selectedRange, setSelectedRange] = useState("Last 7 days");
  
  // Recent Campaigns state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "Create Campaign":
        router.push("/campaigns/create");
        break;
      case "Import Contacts":
      case "Segment Lists":
        router.push("/lists");
        break;
      case "Email Accounts":
        router.push("/email-accounts");
        break;
      case "View Analytics":
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case "Browse Templates":
        alert("Templates coming soon!");
        break;
    }
  };

  const handleExport = () => {
    // Mock CSV Export
    const csvContent = "data:text/csv;charset=utf-8,Campaign Name,Subject,Status\n" 
      + campaigns.map(c => `${c.campaignName},${c.subject},${c.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "recent_campaigns.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) || c.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).slice(0, 5); // Just show "Recent" 5 for the dashboard view

  // Simulated logic to lightly affect metrics based on date range for demo purposes
  const multiplier = selectedRange === "Today" ? 0.1 : selectedRange === "Last 7 days" ? 0.5 : selectedRange === "Last 30 days" ? 1 : 1.5;

  const stats = [
    {
      ...baseStats[0],
      value: Math.floor(metrics.totalCampaigns * multiplier).toString(),
    },
    {
      ...baseStats[1],
      value: Math.floor(metrics.totalRecipients * multiplier).toLocaleString(),
    },
    {
      ...baseStats[2],
      value: (metrics.avgOpenRate * (multiplier > 1 ? 1 : multiplier)).toFixed(1) + "%",
    },
    {
      ...baseStats[3],
      value: (metrics.avgClickRate * (multiplier > 1 ? 1 : multiplier)).toFixed(1) + "%",
    },
    {
      ...baseStats[4],
      value: Math.floor(metrics.emailsDelivered * multiplier).toLocaleString(),
    },
    {
      ...baseStats[5],
      value: metrics.bounceRate.toFixed(1) + "%",
    },
  ];

  const refreshDashboard = () => {
    window.location.reload();
  };

  return (

    <MainLayout>
      <div className="flex-1 bg-[#f8f9fb] px-4 pb-10 pt-[2px]">

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

              <option value="Today">Today</option>
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last 90 days">Last 90 days</option>

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
              onClick={() => handleQuickAction(item.title)}
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

        {/* RECENT CAMPAIGNS HEADER */}
        <div className="mt-8 mb-5 flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Recent Campaigns
          </h2>

          <div className="flex items-center gap-3">
            {/* SEARCH */}
            <div className="flex items-center h-[42px] border border-[#d1d5db] bg-white rounded-xl px-3 shadow-sm w-[240px]">
              <Search size={16} className="text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-2 w-full outline-none bg-transparent text-[14px] text-[#111827] placeholder:text-[#9ca3af]"
              />
            </div>

            {/* FILTER */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-[42px] rounded-xl border border-[#d1d5db] bg-white px-4 text-[14px] font-medium text-[#374151] shadow-sm outline-none transition"
            >
              <option>All Status</option>
              <option>Draft</option>
              <option>Scheduled</option>
              <option>Running</option>
              <option>Paused</option>
              <option>Completed</option>
            </select>

            {/* EXPORT BUTTON */}
            <button
              onClick={handleExport}
              className="flex h-[42px] items-center gap-2 rounded-xl border border-[#d1d5db] bg-white px-4 text-[14px] font-medium text-[#374151] shadow-sm hover:bg-[#f9fafb] transition"
            >
              <Download size={16} />
              Export
            </button>

            {/* NEW CAMPAIGN */}
            <button
              onClick={() => router.push("/campaigns/create")}
              className="flex h-[42px] items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#9333ea] px-5 text-[14px] font-semibold text-white shadow-md hover:scale-[1.02] transition"
            >
              <Sparkles size={16} />
              New Campaign
            </button>
          </div>
        </div>

        {/* RECENT CAMPAIGNS CONTENT */}
        {campaigns.length === 0 ? (
          <div className="bg-white rounded-[20px] border border-[#e5e7eb] py-20 flex flex-col items-center justify-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#f3f4f6] flex items-center justify-center">
              <Mail size={36} className="text-[#9ca3af]" />
            </div>
            <h3 className="mt-6 text-[28px] font-bold text-[#111827]">
              No campaigns yet
            </h3>
            <p className="mt-3 text-[16px] text-[#6b7280] text-center max-w-[500px]">
              Create your first campaign to start engaging with your audience.
            </p>
            <button
              onClick={() => router.push("/campaigns/create")}
              className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#9333ea] px-6 py-3 text-[15px] font-semibold text-white shadow-md hover:opacity-90 transition"
            >
              <Sparkles size={18} />
              Create Campaign
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-[20px] border border-[#e5e7eb] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-[#e5e7eb] bg-[#f9fafb] text-[13px] font-medium text-[#6b7280] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Campaign Name</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Open Rate</th>
                    <th className="px-6 py-4">Click Rate</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e7eb]">
                  {filteredCampaigns.map(campaign => (
                    <tr key={campaign.id} className="hover:bg-[#f9fafb] transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#111827]">{campaign.campaignName}</p>
                        <p className="text-[12px] text-[#6b7280] mt-1">{new Date(campaign.createdAt).toLocaleDateString()}</p>
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#374151]">
                        {campaign.subject}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${
                          campaign.status === 'Running' ? 'bg-[#dcfce7] text-[#166534] dark:bg-green-900/30 dark:text-green-400' :
                          campaign.status === 'Paused' ? 'bg-[#fef9c3] text-[#854d0e] dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-[#f3f4f6] text-[#374151] dark:bg-slate-800 dark:text-gray-300'
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[14px] font-medium text-[#111827] dark:text-white">
                        {campaign.openRate}%
                      </td>
                      <td className="px-6 py-4 text-[14px] font-medium text-[#111827] dark:text-white">
                        {campaign.clickRate}%
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {campaign.status === 'Running' ? (
                            <button 
                              onClick={() => updateCampaign(campaign.id, { status: 'Paused' })}
                              className="p-2 text-[#d97706] hover:bg-[#fffbeb] dark:hover:bg-yellow-900/20 rounded-lg transition"
                              title="Pause Campaign"
                            >
                              <Pause size={16} />
                            </button>
                          ) : (
                            <button 
                              onClick={() => updateCampaign(campaign.id, { status: 'Running' })}
                              className="p-2 text-[#059669] hover:bg-[#ecfdf5] dark:hover:bg-green-900/20 rounded-lg transition"
                              title="Start Campaign"
                            >
                              <Play size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteCampaign(campaign.id)}
                            className="p-2 text-[#ef4444] hover:bg-[#fef2f2] dark:hover:bg-red-900/20 rounded-lg transition"
                            title="Delete Campaign"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredCampaigns.length === 0 && (
                <div className="p-8 text-center text-[#6b7280] dark:text-gray-400">
                  No matching campaigns found.
                </div>
              )}
            </div>
          </div>
        )}

      </div>

    </MainLayout>
  );
}