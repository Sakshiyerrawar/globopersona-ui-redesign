"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { useData } from "@/components/shared/DataProvider";
import { EmailAccount } from "@/lib/mock/types";
import {
  ArrowLeft,
  Mail,
  Globe,
  Settings,
  CheckCircle2,
  Activity,
  Server,
  Key
} from "lucide-react";

export default function CreateEmailAccountPage() {
  const router = useRouter();
  const { addEmailAccount } = useData();

  const [provider, setProvider] = useState<"Google Workspace" | "Microsoft 365" | "SMTP" | "Custom Domain">("Google Workspace");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [dailyLimit, setDailyLimit] = useState(50);
  const [warmupEnabled, setWarmupEnabled] = useState(true);
  
  // SMTP specific
  const [host, setHost] = useState("");
  const [port, setPort] = useState("465");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isTesting, setIsTesting] = useState(false);
  const [testSuccess, setTestSuccess] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleTestConnection = () => {
    setIsTesting(true);
    setTestSuccess(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestSuccess(true);
    }, 1500);
  };

  const handleSave = () => {
    if (!email) {
      alert("Email address is required.");
      return;
    }
    
    setIsSaving(true);
    
    setTimeout(() => {
      const newAccount: EmailAccount = {
        id: `acc-${Date.now()}`,
        email,
        provider,
        status: "Verifying", // Will auto-switch to connected via useEffect in main page
        dailyLimit,
        warmupEnabled,
        sentToday: 0,
        connectedAt: new Date().toISOString()
      };

      addEmailAccount(newAccount);
      setIsSaving(false);
      router.push("/email-accounts");
    }, 1000);
  };

  const providers = [
    { name: "Google Workspace", icon: <Globe size={24} /> },
    { name: "Microsoft 365", icon: <Server size={24} /> },
    { name: "SMTP", icon: <Settings size={24} /> },
    { name: "Custom Domain", icon: <Key size={24} /> },
  ] as const;

  return (
    <MainLayout>
      <div className="flex-1 bg-[#f8fafc] min-h-screen">
        
        {/* TOP NAVBAR */}
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/email-accounts")} className="text-[#64748b] hover:text-[#111827] flex items-center gap-2 text-[14px] font-medium transition">
              <ArrowLeft size={16} />
              Email Accounts
            </button>
            <div className="h-6 w-[1px] bg-[#e2e8f0]" />
            <div>
              <h1 className="text-[18px] font-bold text-[#111827]">Add Email Account</h1>
              <p className="text-[13px] text-[#64748b]">Connect a new sending domain</p>
            </div>
          </div>
        </div>

        <div className="p-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-[16px] border border-[#e2e8f0] shadow-sm overflow-hidden">
            
            {/* 1. PROVIDER SELECTION */}
            <div className="p-8 border-b border-[#e2e8f0]">
              <h2 className="text-[18px] font-bold text-[#111827] mb-6">1. Select Provider</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {providers.map((p) => (
                  <div
                    key={p.name}
                    onClick={() => setProvider(p.name)}
                    className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      provider === p.name 
                        ? "border-[#3b82f6] bg-[#eff6ff] text-[#1d4ed8]" 
                        : "border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#cbd5e1] hover:bg-[#f8fafc]"
                    }`}
                  >
                    <div className="mb-3">
                      {p.icon}
                    </div>
                    <span className="text-[13px] font-semibold text-center">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. ACCOUNT DETAILS */}
            <div className="p-8 border-b border-[#e2e8f0] bg-[#f8fafc]">
              <h2 className="text-[18px] font-bold text-[#111827] mb-6">2. Account Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[14px] font-medium text-[#374151] mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@company.com"
                    className="w-full h-[46px] rounded-lg border border-[#cbd5e1] bg-white px-4 text-[#0f172a] focus:border-[#3b82f6] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#374151] mb-2">Display Name</label>
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-[46px] rounded-lg border border-[#cbd5e1] bg-white px-4 text-[#0f172a] focus:border-[#3b82f6] outline-none"
                  />
                </div>
              </div>

              {provider === "SMTP" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-[#e2e8f0]">
                  <div>
                    <label className="block text-[14px] font-medium text-[#374151] mb-2">SMTP Host</label>
                    <input 
                      type="text" 
                      value={host}
                      onChange={(e) => setHost(e.target.value)}
                      placeholder="smtp.example.com"
                      className="w-full h-[46px] rounded-lg border border-[#cbd5e1] bg-white px-4 text-[#0f172a] focus:border-[#3b82f6] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#374151] mb-2">SMTP Port</label>
                    <input 
                      type="text" 
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                      placeholder="465"
                      className="w-full h-[46px] rounded-lg border border-[#cbd5e1] bg-white px-4 text-[#0f172a] focus:border-[#3b82f6] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#374151] mb-2">Username</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full h-[46px] rounded-lg border border-[#cbd5e1] bg-white px-4 text-[#0f172a] focus:border-[#3b82f6] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#374151] mb-2">App Password</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-[46px] rounded-lg border border-[#cbd5e1] bg-white px-4 text-[#0f172a] focus:border-[#3b82f6] outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3. SENDING LIMITS & WARMUP */}
            <div className="p-8">
              <h2 className="text-[18px] font-bold text-[#111827] mb-6">3. Delivery Settings</h2>
              
              <div className="flex flex-col md:flex-row gap-8">
                {/* Limits */}
                <div className="flex-1 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#e0e7ff] flex items-center justify-center text-[#4f46e5]">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111827]">Daily Sending Limit</h3>
                      <p className="text-[12px] text-[#64748b]">Maximum emails per day</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      type="range" 
                      min="10" 
                      max="1000" 
                      step="10"
                      value={dailyLimit}
                      onChange={(e) => setDailyLimit(Number(e.target.value))}
                      className="flex-1 h-2 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="font-bold text-[#111827] text-[18px] w-12">{dailyLimit}</span>
                  </div>
                </div>

                {/* Warmup */}
                <div className="flex-1 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#fef3c7] flex items-center justify-center text-[#d97706]">
                        <Activity size={18} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#111827]">Email Warmup</h3>
                        <p className="text-[12px] text-[#64748b]">Gradually build reputation</p>
                      </div>
                    </div>
                    
                    {/* Toggle */}
                    <button 
                      onClick={() => setWarmupEnabled(!warmupEnabled)}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${warmupEnabled ? 'bg-[#10b981]' : 'bg-[#cbd5e1]'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${warmupEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <p className="text-[13px] text-[#475569]">
                    {warmupEnabled 
                      ? "Warmup is enabled. The system will intelligently throttle volume and interact with emails to maximize deliverability."
                      : "Warmup is disabled. High volume sending may result in spam filtering."}
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION BAR */}
            <div className="p-6 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-between">
              <button 
                onClick={handleTestConnection}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-[#475569] border border-[#cbd5e1] bg-white hover:bg-[#f1f5f9] transition"
              >
                {isTesting ? <Activity size={18} className="animate-pulse text-[#3b82f6]" /> :
                 testSuccess === true ? <CheckCircle2 size={18} className="text-[#10b981]" /> :
                 <Globe size={18} />}
                {isTesting ? "Testing Connection..." : testSuccess ? "Connection Successful!" : "Test Connection"}
              </button>
              
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 shadow-md transition disabled:opacity-70"
              >
                <Mail size={18} />
                {isSaving ? "Saving Account..." : "Save Account"}
              </button>
            </div>

          </div>
        </div>

      </div>
    </MainLayout>
  );
}
