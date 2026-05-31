"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { useData } from "@/components/shared/DataProvider";
import { Mail, Info, ChevronDown, CheckCircle2 } from "lucide-react";
import { Campaign } from "@/lib/mock/types";

export default function CreateCampaignPage() {
  const router = useRouter();
  const { emailLists: lists, addCampaign } = useData();

  const [step, setStep] = useState(1);
  const [isLaunching, setIsLaunching] = useState(false);

  // Step 1: Details
  const [campaignName, setCampaignName] = useState("");
  const [selectedList, setSelectedList] = useState("");

  // Step 2: Content
  const [subjectLine, setSubjectLine] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("blank");

  const noLists = lists.length === 0;

  const isStep1Disabled = !campaignName || (lists.length > 0 && !selectedList) || noLists;
  const isStep2Disabled = !subjectLine || !emailContent;

  const handleNext = () => {
    if (step === 1 && !isStep1Disabled) {
      setStep(2);
    } else if (step === 2 && !isStep2Disabled) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else router.push("/campaigns");
  };

  const handleLaunch = () => {
    setIsLaunching(true);
    
    const listObj = lists.find(l => l.id === selectedList);
    const recipientsCount = listObj ? listObj.contacts.length : 0;

    setTimeout(() => {
      const newCampaign: Campaign = {
        id: `camp-${Date.now()}`,
        campaignName: campaignName,
        subject: subjectLine,
        emailListId: selectedList,
        emailAccountId: "", // Optional since no account selector is used in this UI iteration
        type: selectedTemplate === "ai-optimized" ? "AI" : "Manual",
        status: "Draft",
        recipients: recipientsCount,
        openRate: 0,
        clickRate: 0,
        emailsDelivered: 0,
        bounceRate: 0,
        createdAt: new Date().toISOString()
      };

      addCampaign(newCampaign);
      setIsLaunching(false);
      router.push("/campaigns");
    }, 1000);
  };

  const selectedListObj = lists.find(l => l.id === selectedList);

  // Calculate Progress %
  const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <MainLayout>
      <div className="flex-1 bg-[#f8fafc] p-8 min-h-screen">
        
        {/* Back link */}
        <button onClick={handleBack} className="text-[#64748b] text-[14px] hover:text-[#0f172a] mb-6 inline-block">
          &lt; Back to {step === 1 ? "Campaigns" : "Previous Step"}
        </button>

        {/* TOP TITLE & SUBTITLE */}
        <p className="text-[#64748b] text-[14px] mb-2 font-medium">Step {step} of 3</p>
        <h1 className="text-[28px] font-bold text-[#0f172a] mb-2">Create New Campaign</h1>
        <p className="text-[#64748b] text-[15px] mb-8 max-w-4xl">
          {step === 1 ? "Set up your campaign name and choose which audience to target" :
           step === 2 ? "Write your subject line and compose your email content" :
           "Review your campaign configuration before launching"}
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT COLUMN: CAMPAIGN DETAILS CARD */}
          <div className="lg:col-span-2 bg-white rounded-[16px] shadow-sm border border-[#e2e8f0] p-8">
            
            {step === 1 && (
              <>
                {/* Card Header */}
                <div className="flex gap-3 items-center mb-1">
                  <Mail className="text-[#3b82f6]" size={24} />
                  <h2 className="text-[20px] font-semibold text-[#0f172a]">Campaign Details</h2>
                </div>
                <p className="text-[#64748b] text-[14px] ml-9 mb-8">
                  Enter your campaign information and select your target audience
                </p>

                <div className="space-y-8 ml-9">
                  {/* Campaign Name Input */}
                  <div>
                    <label className="block text-[14px] font-semibold text-[#1e293b] mb-2">
                      Campaign Name
                    </label>
                    <input 
                      type="text" 
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="Enter a memorable campaign name..."
                      className="w-full h-[46px] rounded-lg border border-[#cbd5e1] bg-white px-4 text-[#0f172a] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition placeholder:text-[#94a3b8]"
                    />
                    <p className="text-[13px] text-[#64748b] mt-2">
                      Choose a descriptive name that helps you identify this campaign later
                    </p>
                  </div>

                  {/* Target Audience Dropdown */}
                  <div>
                    <label className="block text-[14px] font-semibold text-[#1e293b] mb-2">
                      Target Audience
                    </label>
                    <p className="text-[13px] text-[#64748b] mb-3">
                      Select which email list to send this campaign to
                    </p>
                    
                    <div className="relative">
                      <select 
                        value={selectedList}
                        onChange={(e) => setSelectedList(e.target.value)}
                        disabled={noLists}
                        className="w-full h-[46px] appearance-none rounded-lg border border-[#cbd5e1] bg-white px-4 text-[#0f172a] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition disabled:bg-[#f8fafc] disabled:text-[#94a3b8]"
                      >
                        {noLists ? (
                          <option value="">No email lists available</option>
                        ) : (
                          <>
                            <option value="">Select a list...</option>
                            {lists.map(list => (
                              <option key={list.id} value={list.id}>
                                {list.name} ({list.contacts.length} contacts)
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" size={18} />
                    </div>

                    {/* Empty State Alert - Lists */}
                    {noLists && (
                      <div className="mt-4 bg-[#fffbeb] border border-[#fde68a] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="text-[#d97706]" size={18} />
                          <h3 className="font-semibold text-[#b45309]">No Email Lists Available</h3>
                        </div>
                        <p className="text-[#d97706] text-[14px] mb-4">
                          You need to create an email list with contacts before you can start a campaign.
                        </p>
                        <button 
                          onClick={() => router.push("/lists")}
                          className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-medium px-4 py-2 rounded-lg text-[14px] transition"
                        >
                          + Create Email List
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Button */}
                <div className="mt-10 flex justify-end">
                  <button 
                    onClick={handleNext}
                    disabled={isStep1Disabled}
                    className={`flex items-center gap-2 px-8 py-2.5 rounded-lg font-medium text-white transition ${
                      isStep1Disabled 
                        ? "bg-[#a5b4fc] cursor-not-allowed opacity-70" 
                        : "bg-gradient-to-r from-[#818cf8] to-[#c084fc] hover:opacity-90 shadow-md"
                    }`}
                  >
                    Next <span className="ml-1">→</span>
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Card Header */}
                <div className="flex gap-3 items-center mb-1">
                  <Mail className="text-[#3b82f6]" size={24} />
                  <h2 className="text-[20px] font-semibold text-[#0f172a]">Campaign Content</h2>
                </div>
                <p className="text-[#64748b] text-[14px] ml-9 mb-8">
                  Write your subject line, preview text, and email body
                </p>

                <div className="space-y-8 ml-9">
                  {/* Template Selection Dropdown */}
                  <div>
                    <label className="block text-[14px] font-semibold text-[#1e293b] mb-2">
                      Template Selection
                    </label>
                    <div className="relative">
                      <select 
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        className="w-full h-[46px] appearance-none rounded-lg border border-[#cbd5e1] bg-white px-4 text-[#0f172a] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition"
                      >
                        <option value="blank">Blank Template (Manual)</option>
                        <option value="ai-optimized">AI Optimized (Smart Sending)</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" size={18} />
                    </div>
                  </div>

                  {/* Subject Line Input */}
                  <div>
                    <label className="block text-[14px] font-semibold text-[#1e293b] mb-2">
                      Subject Line
                    </label>
                    <input 
                      type="text" 
                      value={subjectLine}
                      onChange={(e) => setSubjectLine(e.target.value)}
                      placeholder="Unlock your potential with our new tool..."
                      className="w-full h-[46px] rounded-lg border border-[#cbd5e1] bg-white px-4 text-[#0f172a] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition placeholder:text-[#94a3b8]"
                    />
                  </div>

                  {/* Preview Text Input */}
                  <div>
                    <label className="block text-[14px] font-semibold text-[#1e293b] mb-2">
                      Preview Text
                    </label>
                    <input 
                      type="text" 
                      value={previewText}
                      onChange={(e) => setPreviewText(e.target.value)}
                      placeholder="This text appears in the inbox preview (optional)..."
                      className="w-full h-[46px] rounded-lg border border-[#cbd5e1] bg-white px-4 text-[#0f172a] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition placeholder:text-[#94a3b8]"
                    />
                  </div>

                  {/* Email Body Textarea */}
                  <div>
                    <label className="block text-[14px] font-semibold text-[#1e293b] mb-2">
                      Email Content
                    </label>
                    <textarea 
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      placeholder="Type your email content here..."
                      className="w-full h-[200px] rounded-lg border border-[#cbd5e1] bg-white p-4 text-[#0f172a] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition placeholder:text-[#94a3b8] resize-none"
                    />
                  </div>
                </div>

                {/* Bottom Button */}
                <div className="mt-10 flex justify-end">
                  <button 
                    onClick={handleNext}
                    disabled={isStep2Disabled}
                    className={`flex items-center gap-2 px-8 py-2.5 rounded-lg font-medium text-white transition ${
                      isStep2Disabled 
                        ? "bg-[#a5b4fc] cursor-not-allowed opacity-70" 
                        : "bg-gradient-to-r from-[#818cf8] to-[#c084fc] hover:opacity-90 shadow-md"
                    }`}
                  >
                    Review <span className="ml-1">→</span>
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                {/* Card Header */}
                <div className="flex gap-3 items-center mb-1">
                  <CheckCircle2 className="text-[#10b981]" size={24} />
                  <h2 className="text-[20px] font-semibold text-[#0f172a]">Review & Launch</h2>
                </div>
                <p className="text-[#64748b] text-[14px] ml-9 mb-8">
                  Review your campaign settings before saving
                </p>

                <div className="space-y-6 ml-9">
                  <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                    <div className="grid grid-cols-2 gap-y-6">
                      <div>
                        <p className="text-[12px] font-bold text-[#94a3b8] tracking-wider mb-1">CAMPAIGN NAME</p>
                        <p className="text-[15px] font-medium text-[#0f172a]">{campaignName}</p>
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-[#94a3b8] tracking-wider mb-1">TARGET AUDIENCE</p>
                        <p className="text-[15px] font-medium text-[#0f172a]">{selectedListObj?.name}</p>
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-[#94a3b8] tracking-wider mb-1">TEMPLATE</p>
                        <p className="text-[15px] font-medium text-[#0f172a] capitalize">{selectedTemplate.replace('-', ' ')}</p>
                      </div>
                      <div className="col-span-2 pt-4 border-t border-[#e2e8f0]">
                        <p className="text-[12px] font-bold text-[#94a3b8] tracking-wider mb-2">SUBJECT LINE</p>
                        <p className="text-[15px] font-medium text-[#0f172a] bg-white p-3 rounded-lg border border-[#e2e8f0]">{subjectLine}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Button */}
                <div className="mt-10 flex justify-end">
                  <button 
                    onClick={handleLaunch}
                    disabled={isLaunching}
                    className="flex items-center gap-2 px-8 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-90 shadow-md transition disabled:opacity-70"
                  >
                    {isLaunching ? "Saving..." : "Save & Launch"} <CheckCircle2 size={16} className="ml-1" />
                  </button>
                </div>
              </>
            )}

          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <div className="lg:col-span-1 space-y-6 mt-2">
            
            {/* Top Alerts */}
            {noLists && (
              <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-4 flex gap-3 shadow-sm">
                <Info className="text-[#3b82f6] shrink-0 mt-0.5" size={18} />
                <p className="text-[#1d4ed8] text-[14px] font-medium leading-snug">
                  No email lists found. Create your first list to get started!
                </p>
              </div>
            )}

            <p className="text-[#64748b] text-[14px]">Review your campaign setup</p>

            <div className="space-y-5">
              <div>
                <p className="text-[12px] font-bold text-[#94a3b8] tracking-wider mb-1">
                  CAMPAIGN NAME
                </p>
                <p className="text-[15px] font-medium text-[#0f172a]">
                  {campaignName || "Not set"}
                </p>
              </div>

              <div>
                <p className="text-[12px] font-bold text-[#94a3b8] tracking-wider mb-1">
                  TARGET AUDIENCE
                </p>
                <p className="text-[15px] font-medium text-[#0f172a]">
                  {selectedListObj ? `${selectedListObj.name} (${selectedListObj.contacts.length})` : "No list selected"}
                </p>
              </div>
            </div>

            <hr className="border-[#e2e8f0]" />

            {/* Progress Section */}
            <div>
              <p className="text-[12px] font-bold text-[#94a3b8] tracking-wider mb-3">
                PROGRESS
              </p>
              <div className="flex justify-between items-center text-[14px] mb-2">
                <span className="text-[#0f172a] font-medium">Step {step} of 3</span>
                <span className="text-[#64748b]">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-[#e2e8f0] rounded-full overflow-hidden">
                <div className="h-full bg-[#3b82f6] rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>

            {/* Next Steps Section */}
            <div className="mt-6">
              <p className="text-[12px] font-bold text-[#94a3b8] tracking-wider mb-4">
                NEXT STEPS
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold ${
                    step >= 2 ? "bg-[#3b82f6] text-white" : "bg-[#f1f5f9] text-[#64748b]"
                  }`}>
                    2
                  </div>
                  <span className={`text-[14px] ${step >= 2 ? "text-[#0f172a] font-medium" : "text-[#64748b]"}`}>Choose Your Approach</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold ${
                    step >= 3 ? "bg-[#3b82f6] text-white" : "bg-[#f1f5f9] text-[#64748b]"
                  }`}>
                    3
                  </div>
                  <span className={`text-[14px] ${step >= 3 ? "text-[#0f172a] font-medium" : "text-[#64748b]"}`}>Review & Launch</span>
                </div>
              </div>
            </div>

            <hr className="border-[#e2e8f0]" />

            {/* Credits Section */}
            <div>
              <p className="text-[12px] font-bold text-[#94a3b8] tracking-wider mb-4">
                CREDITS
              </p>
              
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[14px] font-medium text-[#0f172a]">Manual Campaigns (Monthly)</span>
                  <span className="text-[14px] text-[#64748b]">0/100</span>
                </div>
                <p className="text-[12px] text-[#94a3b8]">
                  100 messages remaining this month
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[14px] font-medium text-[#0f172a]">AI-Personalized (Daily)</span>
                  <span className="text-[14px] text-[#64748b]">0/50</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </MainLayout>
  );
}