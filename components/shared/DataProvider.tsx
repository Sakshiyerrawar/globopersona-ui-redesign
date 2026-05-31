"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Campaign, EmailAccount, EmailList, DashboardMetrics } from "@/lib/mock/types";
import { initialCampaigns, initialEmailAccounts, initialEmailLists } from "@/lib/mock/initialData";

interface DataContextType {
  campaigns: Campaign[];
  emailAccounts: EmailAccount[];
  emailLists: EmailList[];
  
  // Dashboard Metrics
  metrics: DashboardMetrics;

  // Actions
  addCampaign: (c: Campaign) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;

  addEmailList: (l: EmailList) => void;
  updateEmailList: (id: string, updates: Partial<EmailList>) => void;
  deleteEmailList: (id: string) => void;

  addEmailAccount: (a: EmailAccount) => void;
  updateEmailAccount: (id: string, updates: Partial<EmailAccount>) => void;
  deleteEmailAccount: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [emailLists, setEmailLists] = useState<EmailList[]>([]);
  const [mounted, setMounted] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    setMounted(true);
    const savedCampaigns = localStorage.getItem("mock_campaigns");
    const savedAccounts = localStorage.getItem("mock_accounts");
    const savedLists = localStorage.getItem("mock_lists");

    if (savedCampaigns) setCampaigns(JSON.parse(savedCampaigns));
    else setCampaigns(initialCampaigns);

    if (savedAccounts) setEmailAccounts(JSON.parse(savedAccounts));
    else setEmailAccounts(initialEmailAccounts);

    if (savedLists) setEmailLists(JSON.parse(savedLists));
    else setEmailLists(initialEmailLists);
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("mock_campaigns", JSON.stringify(campaigns));
  }, [campaigns, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("mock_accounts", JSON.stringify(emailAccounts));
  }, [emailAccounts, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("mock_lists", JSON.stringify(emailLists));
  }, [emailLists, mounted]);

  // Derived Metrics
  const metrics: DashboardMetrics = React.useMemo(() => {
    const totalCampaigns = campaigns.length;
    
    // Sum total recipients
    const totalRecipients = emailLists.reduce((sum, list) => sum + list.contacts.length, 0);
    
    // Avg Open Rate & Click Rate (excluding Drafts)
    const activeCampaigns = campaigns.filter(c => c.status !== "Draft");
    const avgOpenRate = activeCampaigns.length > 0 
      ? activeCampaigns.reduce((sum, c) => sum + c.openRate, 0) / activeCampaigns.length 
      : 0;
    
    const avgClickRate = activeCampaigns.length > 0 
      ? activeCampaigns.reduce((sum, c) => sum + c.clickRate, 0) / activeCampaigns.length 
      : 0;

    const emailsDelivered = activeCampaigns.reduce((sum, c) => sum + c.emailsDelivered, 0);
    
    // Bounce rate average
    const bounceRate = activeCampaigns.length > 0
      ? activeCampaigns.reduce((sum, c) => sum + (c.emailsDelivered > 0 ? (c.bounces / c.emailsDelivered) * 100 : 0), 0) / activeCampaigns.length
      : 0;

    return {
      totalCampaigns,
      totalRecipients,
      avgOpenRate,
      avgClickRate,
      emailsDelivered,
      bounceRate,
    };
  }, [campaigns, emailLists]);

  // Campaign Actions
  const addCampaign = (c: Campaign) => setCampaigns(prev => [...prev, c]);
  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };
  const deleteCampaign = (id: string) => setCampaigns(prev => prev.filter(c => c.id !== id));

  // Email List Actions
  const addEmailList = (l: EmailList) => setEmailLists(prev => [...prev, l]);
  const updateEmailList = (id: string, updates: Partial<EmailList>) => {
    setEmailLists(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };
  const deleteEmailList = (id: string) => setEmailLists(prev => prev.filter(l => l.id !== id));

  // Email Account Actions
  const addEmailAccount = (a: EmailAccount) => setEmailAccounts(prev => [...prev, a]);
  const updateEmailAccount = (id: string, updates: Partial<EmailAccount>) => {
    setEmailAccounts(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };
  const deleteEmailAccount = (id: string) => setEmailAccounts(prev => prev.filter(a => a.id !== id));

  return (
    <DataContext.Provider value={{
      campaigns,
      emailAccounts,
      emailLists,
      metrics,
      addCampaign,
      updateCampaign,
      deleteCampaign,
      addEmailList,
      updateEmailList,
      deleteEmailList,
      addEmailAccount,
      updateEmailAccount,
      deleteEmailAccount,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
