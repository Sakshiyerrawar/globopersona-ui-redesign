"use client";

import { useState } from "react";
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
  Trash2,
  MoreVertical,
} from "lucide-react";
import { useData } from "@/components/shared/DataProvider";
import { useRouter } from "next/navigation";

export default function EmailListsPage() {
  const router = useRouter();
  const { emailLists, deleteEmailList } = useData();
  const [loading, setLoading] = useState(false);
  
  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"Lists" | "Contacts">("Lists");
  const [viewMode, setViewMode] = useState<"Grid" | "List">("Grid");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Refresh
  const refreshPage = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Flatten Contacts
  const allContacts = emailLists.flatMap(list => list.contacts);
  const totalContacts = allContacts.length;

  const avgQuality = emailLists.length > 0 
    ? Math.round(emailLists.reduce((sum, l) => sum + l.avgQuality, 0) / emailLists.length) 
    : 0;

  // Search logic for Lists
  const filteredLists = emailLists.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (l.description && l.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Search logic for Contacts
  const filteredContacts = allContacts.filter(c => 
    c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Unsubscribed Users
  const unsubscribedContacts = allContacts.filter(c => c.status === "Unsubscribed");
  const filteredUnsubscribed = unsubscribedContacts.filter(c => 
    c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      title: "Total Lists",
      value: emailLists.length.toString(),
      subtitle: "Active",
      icon: <Database size={18} />,
      bg: "bg-[#eef4ff]",
      iconBg: "bg-[#2563eb]",
    },
    {
      title: "Total Contacts",
      value: totalContacts.toLocaleString(),
      subtitle: "Valid",
      icon: <Users size={18} />,
      bg: "bg-[#edf8f1]",
      iconBg: "bg-[#16a34a]",
    },
    {
      title: "This Month",
      value: `+${emailLists.length}`,
      subtitle: "New",
      icon: <TrendingUp size={18} />,
      bg: "bg-[#f6efff]",
      iconBg: "bg-[#9333ea]",
    },
    {
      title: "Avg. Quality",
      value: `${avgQuality}%`,
      subtitle: "Score",
      icon: <Star size={18} />,
      bg: "bg-[#fbf5ea]",
      iconBg: "bg-[#f59e0b]",
    },
    {
      title: "Open Rate",
      value: "0%", // Simulated
      subtitle: "Avg",
      icon: <Mail size={18} />,
      bg: "bg-[#fff1f5]",
      iconBg: "bg-[#f43f5e]",
    },
    {
      title: "Click Rate",
      value: "0%", // Simulated
      subtitle: "Avg",
      icon: <Database size={18} />,
      bg: "bg-[#eefbff]",
      iconBg: "bg-[#06b6d4]",
    },
  ];

  return (
    <MainLayout>
      <div className="flex-1 bg-[#f5f6f8] p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[30px] font-bold text-[#111827]">
              Email Lists
            </h1>
            <p className="text-[#6b7280] mt-1 text-[15px]">
              Manage and organise your contact lists
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshPage}
              className="h-[48px] px-5 rounded-xl border border-[#d1d5db] bg-white flex items-center gap-2 text-[#374151] hover:bg-[#f9fafb] transition-all font-medium"
            >
              <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
              {loading ? "Refreshing..." : "Refresh"}
            </button>

            <button
              onClick={() => router.push("/email-lists/upload")}
              className="h-[48px] px-6 rounded-xl text-white font-semibold bg-gradient-to-r from-[#2563eb] to-[#9333ea] flex items-center gap-2 hover:opacity-90 shadow-sm transition-all"
            >
              <Upload size={16} />
              Upload
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("Lists")}
              className={`h-[44px] px-5 rounded-xl font-medium transition-colors ${
                activeTab === "Lists" 
                  ? "bg-white border border-[#d1d5db] text-[#111827] shadow-sm" 
                  : "bg-transparent text-[#6b7280] hover:text-[#111827]"
              }`}
            >
              Lists
            </button>

            <button
              onClick={() => setActiveTab("Contacts")}
              className={`h-[44px] px-5 rounded-xl font-medium transition-colors ${
                activeTab === "Contacts" 
                  ? "bg-white border border-[#d1d5db] text-[#111827] shadow-sm" 
                  : "bg-transparent text-[#6b7280] hover:text-[#111827]"
              }`}
            >
              Contacts
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 mb-6">
          {stats.map((card, index) => (
            <div
              key={index}
              className={`${card.bg} rounded-2xl p-5 border border-[#e5e7eb] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-medium text-[#6b7280]">
                    {card.title}
                  </p>
                  <h2 className="text-[32px] font-bold mt-2 text-[#111827]">
                    {card.value}
                  </h2>
                  <p className="text-[13px] font-medium text-[#9ca3af] mt-2">
                    {card.subtitle}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${card.iconBg}`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            
            {/* SEARCH */}
            <div className="flex-1 flex items-center h-[48px] border border-[#d1d5db] rounded-xl px-4 bg-[#f9fafb]">
              <Search size={18} className="text-[#9ca3af]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={activeTab === "Lists" ? "Search lists by name, description, or tags..." : "Search contacts by name or email..."}
                className="ml-3 w-full outline-none bg-transparent text-[14px] placeholder:text-[#9ca3af] text-[#111827]"
              />
            </div>

            {/* STATUS FILTER */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="h-[48px] px-4 outline-none rounded-xl border border-[#d1d5db] bg-white text-[#374151] font-medium text-[14px] shadow-sm"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Paused</option>
              <option>Archived</option>
            </select>

            {/* FILTER BUTTON */}
            <button className="h-[48px] px-5 rounded-xl border border-[#d1d5db] bg-white flex items-center gap-2 text-[#374151] font-medium text-[14px] shadow-sm hover:bg-gray-50 transition">
              <Filter size={16} />
              Filters
            </button>

            {/* GRID / LIST TOGGLE (Only for Lists Tab) */}
            {activeTab === "Lists" && (
              <div className="flex items-center rounded-xl border border-[#d1d5db] overflow-hidden shadow-sm h-[48px]">
                <button
                  onClick={() => setViewMode("Grid")}
                  className={`h-full px-4 flex items-center gap-2 text-[14px] font-medium transition ${
                    viewMode === "Grid" ? "bg-[#eff6ff] text-[#2563eb]" : "bg-white text-[#6b7280] hover:bg-gray-50"
                  }`}
                >
                  <Grid3X3 size={16} />
                  Grid
                </button>
                <div className="w-[1px] h-full bg-[#d1d5db]" />
                <button
                  onClick={() => setViewMode("List")}
                  className={`h-full px-4 flex items-center gap-2 text-[14px] font-medium transition ${
                    viewMode === "List" ? "bg-[#eff6ff] text-[#2563eb]" : "bg-white text-[#6b7280] hover:bg-gray-50"
                  }`}
                >
                  <List size={16} />
                  List
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT AREA */}
        {activeTab === "Lists" ? (
          <>
            {/* LISTS TAB CONTENT */}
            {emailLists.length === 0 ? (
              <div className="bg-white rounded-[24px] border border-[#e5e7eb] py-24 shadow-sm flex flex-col items-center justify-center">
                <div className="w-[72px] h-[72px] rounded-full bg-[#eef2ff] flex items-center justify-center mb-6">
                  <Database size={32} className="text-[#2563eb]" />
                </div>
                <h2 className="text-[28px] font-bold text-[#111827] mb-3">
                  No Email Lists Found
                </h2>
                <p className="text-[16px] text-[#6b7280] mb-8">
                  Upload your first CSV file and begin building connections with your audience.
                </p>
                <button
                  onClick={() => router.push("/email-lists/upload")}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold text-[15px] bg-gradient-to-r from-[#2563eb] to-[#9333ea] hover:opacity-90 shadow-md transition"
                >
                  <Upload size={18} />
                  Upload Your First List
                </button>
              </div>
            ) : viewMode === "List" ? (
              <div className="bg-white rounded-[20px] border border-[#e5e7eb] shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="border-b bg-gray-50 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">List Name</th>
                      <th className="px-6 py-4">Contacts</th>
                      <th className="px-6 py-4">Quality Score</th>
                      <th className="px-6 py-4">Created At</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredLists.map(list => (
                      <tr key={list.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-5">
                          <p className="font-semibold text-gray-900">{list.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{list.description || "No description provided"}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                            <Users size={14} />
                            {list.contacts.length}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                              <div className="h-full bg-green-500" style={{ width: `${list.avgQuality}%` }} />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{list.avgQuality}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-500">
                          {new Date(list.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button 
                            onClick={() => deleteEmailList(list.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLists.map(list => (
                  <div key={list.id} className="bg-white rounded-2xl border border-[#e5e7eb] p-6 shadow-sm hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#eef4ff] flex items-center justify-center">
                          <Database size={18} className="text-[#2563eb]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#111827]">{list.name}</h3>
                          <p className="text-[12px] text-[#6b7280]">{new Date(list.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                    <p className="text-[14px] text-[#6b7280] mb-5 h-10 line-clamp-2">
                      {list.description || "No description provided."}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#f3f4f6]">
                      <div className="flex items-center gap-1.5">
                        <Users size={16} className="text-[#6b7280]" />
                        <span className="text-[14px] font-medium text-[#374151]">{list.contacts.length} Contacts</span>
                      </div>
                      <span className="text-[12px] font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                        {list.avgQuality}% Quality
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* CONTACTS TAB CONTENT */
          <div className="bg-white rounded-[20px] border border-[#e5e7eb] shadow-sm overflow-hidden">
            {filteredContacts.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center">
                <Users size={40} className="text-[#9ca3af] mb-4" />
                <h3 className="text-[20px] font-semibold text-[#111827]">No contacts found</h3>
                <p className="text-[#6b7280] mt-2">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b bg-gray-50 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredContacts.map(contact => (
                      <tr key={contact.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{contact.firstName} {contact.lastName}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {contact.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {contact.company || "-"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            contact.status === "Valid" ? "bg-green-50 text-green-700" :
                            contact.status === "Unsubscribed" ? "bg-red-50 text-red-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {contact.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* UNSUBSCRIBED USERS SECTION (Bottom) */}
        <div className="mt-8 bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden shadow-sm">
          {/* Top Red Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-orange-500 to-pink-500" />
          
          <div className="p-6 flex items-center justify-between border-b border-[#f3f4f6]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <Users size={20} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-[20px] font-bold text-[#111827]">
                  Unsubscribed Users
                </h3>
                <p className="text-[14px] text-[#6b7280] mt-1">
                  Contacts who replied with unsubscribe / not-interested messages
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center h-[44px] border border-[#d1d5db] rounded-xl px-4 bg-gray-50">
                <Search size={16} className="text-[#9ca3af]" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="ml-2 outline-none bg-transparent text-[14px] w-[150px]"
                />
              </div>
              <button className="h-[44px] px-4 rounded-xl border border-[#d1d5db] bg-white flex items-center gap-2 text-[14px] text-[#374151] font-medium hover:bg-gray-50 transition">
                <RefreshCcw size={16} />
                Refresh
              </button>
            </div>
          </div>

          {filteredUnsubscribed.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center">
              <div className="w-[60px] h-[60px] rounded-full bg-green-50 flex items-center justify-center mb-4 border border-green-100">
                <CheckCircle size={28} className="text-green-500" />
              </div>
              <h3 className="text-[22px] font-bold text-[#111827]">
                No unsubscribed users
              </h3>
              <p className="text-[15px] text-[#6b7280] mt-2">
                No unsubscribe replies detected yet
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-sm font-medium text-gray-500 uppercase">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Unsubscribed At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUnsubscribed.map(contact => (
                    <tr key={contact.id}>
                      <td className="px-6 py-4 font-medium">{contact.firstName} {contact.lastName}</td>
                      <td className="px-6 py-4 text-gray-500">{contact.email}</td>
                      <td className="px-6 py-4 text-gray-500">Just now</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  );
}