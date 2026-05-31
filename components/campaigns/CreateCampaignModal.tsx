"use client";

import { useState } from "react";
import { X, Sparkles, Mail, Database } from "lucide-react";
import { useData } from "@/components/shared/DataProvider";
import { Campaign, CampaignStatus } from "@/lib/mock/types";

interface Props {
  onClose: () => void;
}

export default function CreateCampaignModal({ onClose }: Props) {
  const { addCampaign, emailAccounts, emailLists } = useData();
  const [campaignName, setCampaignName] = useState("");
  const [subject, setSubject] = useState("");
  const [emailAccountId, setEmailAccountId] = useState(emailAccounts[0]?.id || "");
  const [emailListId, setEmailListId] = useState(emailLists[0]?.id || "");
  const [status, setStatus] = useState<CampaignStatus>("Draft");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignName || !subject || !emailAccountId || !emailListId) return;

    const selectedList = emailLists.find(l => l.id === emailListId);

    const newCampaign: Campaign = {
      id: "camp-" + Math.random().toString(36).substr(2, 9),
      campaignName,
      subject,
      emailAccountId,
      emailListId,
      status,
      createdAt: new Date().toISOString(),
      openRate: 0,
      clickRate: 0,
      recipients: selectedList ? selectedList.contacts.length : 0,
      emailsDelivered: 0,
      bounces: 0,
    };

    addCampaign(newCampaign);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl dark:bg-[#0f172a]">
        
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[24px] font-bold text-[#111827] dark:text-white">
            Create Campaign
          </h2>
          <button 
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Campaign Name
            </label>
            <div className="flex h-[50px] items-center rounded-xl border border-gray-300 px-4 dark:border-slate-700">
              <Sparkles size={18} className="text-gray-400" />
              <input
                type="text"
                required
                value={campaignName}
                onChange={e => setCampaignName(e.target.value)}
                placeholder="e.g. Q4 Outreach"
                className="ml-3 w-full bg-transparent text-sm outline-none dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Subject
            </label>
            <div className="flex h-[50px] items-center rounded-xl border border-gray-300 px-4 dark:border-slate-700">
              <Mail size={18} className="text-gray-400" />
              <input
                type="text"
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Write a catchy subject line..."
                className="ml-3 w-full bg-transparent text-sm outline-none dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sending Account
            </label>
            <select
              required
              value={emailAccountId}
              onChange={e => setEmailAccountId(e.target.value)}
              className="h-[50px] w-full rounded-xl border border-gray-300 px-4 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="" disabled>Select an account</option>
              {emailAccounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.email}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Recipient List
            </label>
            <div className="flex h-[50px] items-center rounded-xl border border-gray-300 px-4 dark:border-slate-700">
              <Database size={18} className="text-gray-400" />
              <select
                required
                value={emailListId}
                onChange={e => setEmailListId(e.target.value)}
                className="ml-3 w-full bg-transparent text-sm outline-none dark:bg-slate-800 dark:text-white"
              >
                <option value="" disabled>Select an email list</option>
                {emailLists.map(list => (
                  <option key={list.id} value={list.id}>{list.name} ({list.contacts.length} contacts)</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Initial Status
            </label>
            <select
              required
              value={status}
              onChange={e => setStatus(e.target.value as CampaignStatus)}
              className="h-[50px] w-full rounded-xl border border-gray-300 px-4 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Draft">Draft</option>
              <option value="Running">Start Immediately (Running)</option>
            </select>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-[50px] flex-1 rounded-xl border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[50px] flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-medium text-white shadow-lg hover:opacity-90"
            >
              Create Campaign
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
