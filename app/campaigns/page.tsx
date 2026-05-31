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
  ChevronDown,
  Filter,
  Grid3X3,
  List,
  Plus,
  RefreshCcw,
  Play,
  Pause,
  Trash2,
  Database
} from "lucide-react";
import { useData } from "@/components/shared/DataProvider";

const stats = [
  {
    title: "Total Campaigns",
    value: "0",
    subtitle: "All campaigns",
    icon: <Target size={18} />,
    iconBg: "bg-[#2563eb]",
  },
  {
    title: "Manual Campaigns",
    value: "0",
    subtitle: "User created",
    icon: <Pencil size={18} />,
    iconBg: "bg-[#16a34a]",
  },
  {
    title: "AI Campaigns",
    value: "0",
    subtitle: "AI personalized",
    icon: <Brain size={18} />,
    iconBg: "bg-[#9333ea]",
  },
  {
    title: "Total Recipients",
    value: "0",
    subtitle: "Email contacts",
    icon: <Users size={18} />,
    iconBg: "bg-[#ea580c]",
  },
  {
    title: "Open Rate",
    value: "0%",
    subtitle: "Unique opens",
    icon: <Mail size={18} />,
    iconBg: "bg-[#db2777]",
  },
  {
    title: "Click Rate",
    value: "0%",
    subtitle: "Average clicks",
    icon: <MousePointerClick size={18} />,
    iconBg: "bg-[#0891b2]",
  },
];

export default function CampaignsPage() {
  const router = useRouter();
  const { campaigns, emailLists, updateCampaign, deleteCampaign } = useData();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const refreshPage = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const openCreateCampaign = () => {
    router.push("/campaigns/create");
  };

  const filteredCampaigns = campaigns.filter(c => 
    c.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (c.subject && c.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeCampaigns = campaigns.filter(c => c.status !== "Draft");
  const totalRecipients = activeCampaigns.reduce((sum, c) => sum + c.recipients, 0);
  const avgOpenRate = activeCampaigns.length > 0 
    ? activeCampaigns.reduce((sum, c) => sum + c.openRate, 0) / activeCampaigns.length 
    : 0;
  const avgClickRate = activeCampaigns.length > 0 
    ? activeCampaigns.reduce((sum, c) => sum + c.clickRate, 0) / activeCampaigns.length 
    : 0;

  const dynamicStats = [
    { ...stats[0], value: campaigns.length.toString() },
    { ...stats[1], value: campaigns.filter(c => c.type !== "AI").length.toString() }, 
    { ...stats[2], value: campaigns.filter(c => c.type === "AI").length.toString() },
    { ...stats[3], value: totalRecipients.toLocaleString() },
    { ...stats[4], value: `${avgOpenRate.toFixed(0)}%` },
    { ...stats[5], value: `${avgClickRate.toFixed(0)}%` },
  ];

  return (
    <MainLayout>
      <div className="flex-1 bg-white p-6 md:p-8 min-h-screen">

        {/* HEADER ROW */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] flex items-center justify-center text-white">
              <Target size={20} />
            </div>
            <h2 className="text-[20px] font-bold text-[#111827] tracking-tight">
              Email Campaigns
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshPage}
              className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-[10px] text-[14px] font-medium text-[#374151] shadow-sm hover:bg-gray-50 transition-colors"
            >
              <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              onClick={openCreateCampaign}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-[10px] text-[14px] font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
            >
              <Plus size={18} />
              New Campaign
            </button>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {dynamicStats.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#e5e7eb] p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-medium text-[#6b7280] mb-1">
                    {card.title}
                  </p>
                  <h3 className="text-[28px] font-bold text-[#111827] leading-none mb-1">
                    {card.value}
                  </h3>
                  <p className="text-[12px] text-[#9ca3af]">
                    {card.subtitle}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${card.iconBg}`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FILTER ROW */}
        <div className="flex flex-col md:flex-row items-center gap-3 mb-8">
          {/* SEARCH */}
          <div className="flex-1 flex items-center h-[42px] border border-[#e5e7eb] rounded-lg px-3 hover:border-[#d1d5db] transition-colors focus-within:border-[#6366f1] focus-within:ring-1 focus-within:ring-[#6366f1]">
            <Search size={16} className="text-[#9ca3af]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search campaigns by name, description, or email list..."
              className="ml-2 w-full outline-none bg-transparent text-[14px] placeholder:text-[#9ca3af]"
            />
          </div>

          {/* STATUS */}
          <button className="h-[42px] px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#374151] text-[14px] flex items-center justify-between min-w-[130px] hover:bg-gray-50 transition-colors">
            All Status
            <ChevronDown size={16} className="text-[#9ca3af]" />
          </button>

          {/* TYPES */}
          <button className="h-[42px] px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#374151] text-[14px] flex items-center justify-between min-w-[130px] hover:bg-gray-50 transition-colors">
            All Types
            <ChevronDown size={16} className="text-[#9ca3af]" />
          </button>

          {/* FILTER */}
          <button className="h-[42px] px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#374151] text-[14px] flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            Filters
          </button>

          {/* GRID LIST TOGGLE */}
          <div className="flex items-center rounded-lg border border-[#e5e7eb] overflow-hidden">
            <button className="h-[42px] px-4 bg-[#eff6ff] text-[#3b82f6] flex items-center gap-2 text-[14px] font-medium">
              <Grid3X3 size={16} />
              Grid
            </button>
            <button className="h-[42px] px-4 bg-white text-[#6b7280] flex items-center gap-2 text-[14px] hover:bg-gray-50 transition-colors">
              <List size={16} />
              List
            </button>
          </div>
        </div>

        {/* CAMPAIGNS CONTENT (EMPTY STATES & TABLE) */}
        <div className="border border-[#e5e7eb] rounded-2xl overflow-hidden min-h-[400px] flex flex-col">
          {emailLists.length === 0 ? (
            <div className="flex-1 bg-white py-24 flex flex-col items-center justify-center">
              <div className="w-[72px] h-[72px] rounded-full bg-[#fef3c7] flex items-center justify-center mb-6">
                <Database size={32} className="text-[#d97706]" />
              </div>
              <h2 className="text-[24px] font-bold text-[#111827] mb-2">
                No Email Lists Available
              </h2>
              <p className="text-[15px] text-[#6b7280] text-center mb-8 max-w-md">
                You need to upload an email list before you can launch an email campaign.
              </p>
              <button
                onClick={() => router.push("/lists")}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium text-[14px] bg-[#f59e0b] hover:bg-[#d97706] transition-colors shadow-sm"
              >
                <Database size={16} />
                Go to Email Lists
              </button>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="flex-1 bg-white py-24 flex flex-col items-center justify-center">
              <div className="w-[72px] h-[72px] rounded-full bg-[#f3f4f6] flex items-center justify-center mb-6 border border-[#e5e7eb]">
                <Mail size={32} className="text-[#9ca3af]" />
              </div>
              <h2 className="text-[24px] font-bold text-[#111827] mb-2">
                No Campaigns Yet
              </h2>
              <p className="text-[15px] text-[#6b7280] text-center mb-8 max-w-md">
                Get started by creating your first email campaign. Choose between manual or AI-personalized campaigns.
              </p>
              <button
                onClick={openCreateCampaign}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium text-[14px] bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 transition-opacity shadow-sm"
              >
                <Plus size={18} />
                Create Your First Campaign
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filteredCampaigns.map(campaign => (
                <div key={campaign.id} className="rounded-xl border border-[#e5e7eb] bg-white p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-[16px] font-bold text-[#111827]">{campaign.campaignName}</h3>
                      <p className="text-sm text-gray-500 mt-0.5 truncate max-w-[200px]">{campaign.subject || "No subject set"}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${
                      campaign.status === 'Running' ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' :
                      campaign.status === 'Paused' ? 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20' :
                      'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-500/10'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-[#f8fafc] rounded-lg p-3">
                      <p className="text-[11px] font-semibold text-[#64748b] tracking-wide mb-1">OPEN RATE</p>
                      <p className="text-[16px] font-bold text-[#0f172a]">{campaign.openRate}%</p>
                    </div>
                    <div className="bg-[#f8fafc] rounded-lg p-3">
                      <p className="text-[11px] font-semibold text-[#64748b] tracking-wide mb-1">CLICK RATE</p>
                      <p className="text-[16px] font-bold text-[#0f172a]">{campaign.clickRate}%</p>
                    </div>
                    <div className="bg-[#f8fafc] rounded-lg p-3">
                      <p className="text-[11px] font-semibold text-[#64748b] tracking-wide mb-1">RECIPIENTS</p>
                      <p className="text-[16px] font-bold text-[#0f172a]">{campaign.recipients}</p>
                    </div>
                    <div className="bg-[#f8fafc] rounded-lg p-3">
                      <p className="text-[11px] font-semibold text-[#64748b] tracking-wide mb-1">DELIVERED</p>
                      <p className="text-[16px] font-bold text-[#0f172a]">{campaign.emailsDelivered}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#e5e7eb] pt-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#64748b] font-medium">
                      <Mail size={14} />
                      <span>{new Date(campaign.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {campaign.status === 'Running' ? (
                        <button 
                          onClick={() => updateCampaign(campaign.id, { status: 'Paused' })}
                          className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors"
                          title="Pause"
                        >
                          <Pause size={16} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => updateCampaign(campaign.id, { status: 'Running' })}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                          title="Start"
                        >
                          <Play size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteCampaign(campaign.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  );
}