"use client";

import MainLayout from "@/components/layout/MainLayout";
import { useRouter } from "next/navigation";
import {
  Mail,
  CheckCircle2,
  Activity,
  Settings,
  RefreshCcw,
  Plus,
  ShoppingCart,
  Trash2,
  AlertCircle
} from "lucide-react";
import { useData } from "@/components/shared/DataProvider";
import { useState, useEffect } from "react";

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

export default function EmailAccountsPage() {
  const router = useRouter();
  const { emailAccounts, updateEmailAccount, deleteEmailAccount } = useData();
  const [loading, setLoading] = useState(false);

  // Simulated Verification Flow
  useEffect(() => {
    const timer = setInterval(() => {
      emailAccounts.forEach(acc => {
        if (acc.status === "Verifying") {
          updateEmailAccount(acc.id, { status: "Connected" });
        }
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [emailAccounts, updateEmailAccount]);

  const refreshPage = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const activeAccounts = emailAccounts.filter(a => a.status === "Connected").length;
  const totalLimit = emailAccounts.reduce((sum, a) => sum + a.dailyLimit, 0);
  const totalSent = emailAccounts.reduce((sum, a) => sum + a.sentToday, 0);
  const utilization = totalLimit > 0 ? Math.round((totalSent / totalLimit) * 100) : 0;

  const dynamicStats = [
    {
      ...stats[0],
      value: activeAccounts.toString(),
      subtitle: `of ${emailAccounts.length} total`,
    },
    {
      ...stats[1],
      value: totalLimit.toLocaleString(),
    },
    {
      ...stats[2],
      value: totalSent.toLocaleString(),
    },
    {
      ...stats[3],
      value: `${utilization}%`,
    },
  ];

  return (
    <MainLayout>
      <div className="flex-1 bg-[#f8fafc] p-6 min-h-screen">
        
        {/* PAGE TITLE */}
        <div className="mb-6">
          <h1 className="text-[30px] font-bold text-[#111827]">
            Email Accounts
          </h1>
          <p className="mt-1 text-[15px] text-[#64748b]">
            Configure your sending accounts and domains
          </p>
        </div>

        {/* ACTION BUTTONS & SECTION TITLE */}
        <div className="mb-5 flex items-center justify-between mt-8">
          <h2 className="text-[18px] font-bold text-[#111827]">
            Email Configuration
          </h2>
          <div className="flex items-center gap-3">
            <button 
              onClick={refreshPage}
              className="flex h-11 items-center gap-2 rounded-xl border border-[#cbd5e1] bg-white px-5 text-[14px] font-medium text-[#475569] shadow-sm hover:bg-[#f8fafc] transition"
            >
              <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button className="flex h-11 items-center gap-2 rounded-xl bg-[#f97316] px-5 text-[14px] font-semibold text-white shadow-md hover:bg-[#ea580c] transition">
              <ShoppingCart size={16} />
              Get Professional Email
            </button>
            <button 
              onClick={() => router.push("/email-accounts/create")}
              className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] px-5 text-[14px] font-semibold text-white shadow-md hover:opacity-90 transition"
            >
              <Plus size={16} />
              Add Email Account
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {dynamicStats.map((item) => (
            <div
              key={item.title}
              className={`${item.bg} rounded-[20px] border border-[#e2e8f0] p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className={`text-[14px] font-semibold ${item.titleColor}`}>
                    {item.title}
                  </p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${item.iconBg}`}>
                  {item.icon}
                </div>
              </div>
              <h3 className="text-[36px] font-bold text-[#111827] leading-none">
                {item.value}
              </h3>
              <p className="mt-2 text-[13px] font-medium text-[#64748b]">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* EMAIL ACCOUNTS BOX */}
        <div className="bg-white rounded-[16px] border border-[#e2e8f0] shadow-sm overflow-hidden">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-[#e2e8f0] bg-[#f8fafc] px-6 py-5">
            <div>
              <h2 className="text-[18px] font-bold text-[#111827]">
                Email Accounts
              </h2>
              <p className="text-[14px] text-[#64748b] mt-0.5">
                Manage your configured email accounts
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#dbeafe] px-3.5 py-1 text-[13px] font-bold text-[#2563eb]">
                {emailAccounts.length} accounts
              </span>
              {utilization >= 100 && (
                <span className="rounded-full bg-[#fee2e2] px-3.5 py-1 text-[13px] font-bold text-[#dc2626]">
                  Limit Reached
                </span>
              )}
            </div>
          </div>

          {emailAccounts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white">
              <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#f1f5f9] mb-6">
                <Mail size={36} className="text-[#94a3b8]" />
              </div>
              <h3 className="text-[24px] font-bold text-[#111827]">
                No email accounts configured
              </h3>
              <p className="mt-2 text-[15px] text-[#64748b] max-w-md text-center">
                Add your first email account to start sending campaigns.
              </p>
              <button 
                onClick={() => router.push("/email-accounts/create")}
                className="mt-8 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] px-8 py-3.5 text-[15px] font-semibold text-white shadow-md hover:opacity-90 transition"
              >
                <Plus size={18} />
                Add Your First Account
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-[#e2e8f0] bg-[#f8fafc] text-[12px] font-bold text-[#64748b] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Account</th>
                    <th className="px-6 py-4">Provider</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Daily Limit</th>
                    <th className="px-6 py-4">Warmup</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] bg-white">
                  {emailAccounts.map(account => (
                    <tr key={account.id} className="hover:bg-[#f8fafc] transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e0e7ff] text-[#4f46e5]">
                            <Mail size={18} />
                          </div>
                          <div>
                            <p className="font-semibold text-[#111827]">{account.email}</p>
                            <p className="text-[12px] text-[#64748b] mt-0.5">Added {new Date(account.connectedAt || Date.now()).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[14px] font-medium text-[#475569]">{account.provider}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold ${
                          account.status === "Connected" ? "bg-[#dcfce7] text-[#166534]" :
                          account.status === "Verifying" ? "bg-[#fef3c7] text-[#b45309] animate-pulse" :
                          account.status === "Failed" ? "bg-[#fee2e2] text-[#b91c1c]" :
                          "bg-[#f1f5f9] text-[#475569]"
                        }`}>
                          {account.status === "Connected" ? <CheckCircle2 size={14} /> : 
                           account.status === "Failed" ? <AlertCircle size={14} /> : 
                           <Activity size={14} />}
                          {account.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <input 
                            type="number"
                            value={account.dailyLimit}
                            onChange={(e) => updateEmailAccount(account.id, { dailyLimit: Number(e.target.value) })}
                            className="w-20 rounded-lg border border-[#cbd5e1] px-2 py-1.5 text-[14px] text-[#0f172a] focus:border-[#3b82f6] outline-none"
                          />
                          <span className="text-[12px] text-[#64748b]">/ day</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <button 
                          onClick={() => updateEmailAccount(account.id, { warmupEnabled: !account.warmupEnabled })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${account.warmupEnabled ? 'bg-[#10b981]' : 'bg-[#cbd5e1]'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${account.warmupEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => deleteEmailAccount(account.id)}
                          className="text-[#94a3b8] hover:text-[#ef4444] transition-colors p-2 rounded-lg hover:bg-[#fee2e2]"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
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
