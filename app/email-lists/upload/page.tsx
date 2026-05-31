"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { useData } from "@/components/shared/DataProvider";
import { EmailList, Contact } from "@/lib/mock/types";
import {
  ArrowLeft,
  Upload,
  FileText,
  Info,
  CheckCircle2,
  ChevronRight,
  Database,
  Users
} from "lucide-react";

export default function UploadEmailListPage() {
  const router = useRouter();
  const { addEmailList } = useData();

  const [step, setStep] = useState(1);
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  // Parsed data
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  
  // Field mappings (System Field -> CSV Header)
  const [mappings, setMappings] = useState<{ [key: string]: string }>({
    email: "",
    firstName: "",
    lastName: "",
    company: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
        
        if (lines.length > 0) {
          const parsedHeaders = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
          setHeaders(parsedHeaders);
          
          const parsedRows = [];
          for (let i = 1; i < lines.length; i++) {
            const match = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            const row = match ? match.map(val => val.replace(/^"|"$/g, '').trim()) : lines[i].split(',').map(v => v.trim());
            if (row.length > 0) parsedRows.push(row);
          }
          setRows(parsedRows);

          // Auto-map based on common names
          const newMappings = { ...mappings };
          const emailHeader = parsedHeaders.find(h => h.toLowerCase().includes('email'));
          if (emailHeader) newMappings.email = emailHeader;
          
          const fNameHeader = parsedHeaders.find(h => h.toLowerCase().includes('first') || h.toLowerCase() === 'name');
          if (fNameHeader) newMappings.firstName = fNameHeader;

          const lNameHeader = parsedHeaders.find(h => h.toLowerCase().includes('last'));
          if (lNameHeader) newMappings.lastName = lNameHeader;

          const companyHeader = parsedHeaders.find(h => h.toLowerCase().includes('company'));
          if (companyHeader) newMappings.company = companyHeader;

          setMappings(newMappings);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleContinue = () => {
    if (listName && file && headers.length > 0) {
      setStep(2);
    }
  };

  const handleImport = () => {
    if (!mappings.email) {
      alert("You must map an Email column.");
      return;
    }

    const emailIdx = headers.indexOf(mappings.email);
    const fNameIdx = headers.indexOf(mappings.firstName);
    const lNameIdx = headers.indexOf(mappings.lastName);
    const companyIdx = headers.indexOf(mappings.company);

    const parsedContacts: Contact[] = [];
    const seenEmails = new Set<string>();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const email = emailIdx !== -1 && row[emailIdx] ? row[emailIdx] : null;
      
      // Validation: Skip if no email, or duplicate email
      if (!email || seenEmails.has(email)) continue;
      
      seenEmails.add(email);

      parsedContacts.push({
        id: `cont-${Date.now()}-${i}`,
        firstName: fNameIdx !== -1 && row[fNameIdx] ? row[fNameIdx] : "Unknown",
        lastName: lNameIdx !== -1 && row[lNameIdx] ? row[lNameIdx] : "",
        email: email,
        company: companyIdx !== -1 && row[companyIdx] ? row[companyIdx] : "",
        status: "Valid",
      });
    }

    const newList: EmailList = {
      id: `list-${Date.now()}`,
      name: listName,
      description,
      createdAt: new Date().toISOString(),
      avgQuality: Math.floor(Math.random() * 20) + 80,
      contacts: parsedContacts,
    };

    addEmailList(newList);
    router.push("/lists");
  };

  const isStep1Valid = listName.trim() !== "" && file !== null;

  return (
    <MainLayout>
      <div className="flex-1 bg-[#f8fafc] min-h-screen">
        
        {/* TOP NAVBAR (Appears integrated into header) */}
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/lists")} className="text-[#64748b] hover:text-[#111827] flex items-center gap-2 text-[14px] font-medium transition">
              <ArrowLeft size={16} />
              Email Lists
            </button>
            <div className="h-6 w-[1px] bg-[#e2e8f0]" />
            <div>
              <h1 className="text-[18px] font-bold text-[#111827]">Upload Email List</h1>
              <p className="text-[13px] text-[#64748b]">Import contacts from CSV file</p>
            </div>
          </div>
          
          <button className="flex items-center gap-2 text-[14px] text-[#64748b] font-medium hover:text-[#111827] transition">
            <Database size={16} />
            Dashboard
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[13px] font-bold text-[#64748b] tracking-wider uppercase">Progress</span>
            <span className="text-[13px] font-medium text-[#64748b]">Step {step} of 2</span>
          </div>
          <div className="h-1 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
            <div className="h-full bg-[#3b82f6] rounded-full transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }} />
          </div>
        </div>

        <div className="p-8 max-w-7xl mx-auto">
          {step === 1 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LEFT COLUMN */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* LIST INFORMATION CARD */}
                <div className="bg-white rounded-[12px] border border-[#e2e8f0] p-6 shadow-sm">
                  <h2 className="text-[16px] font-bold text-[#111827]">List Information</h2>
                  <p className="text-[13px] text-[#64748b] mb-6">Basic details about your email list</p>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[14px] font-medium text-[#374151] mb-2">List Name</label>
                      <input 
                        type="text" 
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        placeholder="Newsletter Subscribers"
                        className="w-full h-[46px] rounded-lg border border-[#cbd5e1] bg-white px-4 text-[#0f172a] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-medium text-[#374151] mb-2">Description (Optional)</label>
                      <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the purpose of this list..."
                        className="w-full h-[80px] rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-[#0f172a] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none transition resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* UPLOAD CSV CARD */}
                <div className="bg-white rounded-[12px] border border-[#e2e8f0] p-6 shadow-sm">
                  <h2 className="text-[16px] font-bold text-[#111827]">Upload CSV File</h2>
                  <p className="text-[13px] text-[#64748b] mb-6">Select your CSV file containing contact information</p>

                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-[#cbd5e1] rounded-xl bg-[#f8fafc] p-10 cursor-pointer hover:bg-[#f1f5f9] hover:border-[#94a3b8] transition"
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
                      <Upload size={20} className="text-[#64748b]" />
                    </div>
                    <p className="text-[15px] font-semibold text-[#111827]">Click to upload</p>
                    <p className="text-[14px] text-[#64748b] mb-4">or drag and drop your CSV or XLSX file</p>
                    <div className="flex gap-4 text-[12px] font-medium text-[#94a3b8]">
                      <span className="flex items-center gap-1"><CheckCircle2 size={14} /> Secure</span>
                      <span className="flex items-center gap-1"><FileText size={14} /> Max 10MB</span>
                      <span className="flex items-center gap-1"><Database size={14} /> CSV or XLSX</span>
                    </div>
                    <input 
                      type="file" 
                      accept=".csv,.xlsx" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {/* CSV FORMAT TIPS */}
                <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-[12px] p-5 flex gap-3 shadow-sm">
                  <Info className="text-[#16a34a] shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-[14px] text-[#166534] font-medium">
                      CSV Format Tips: <span className="font-normal text-[#15803d]">Ensure your CSV has headers in the first row. Common columns: Email, First Name, Last Name, Company, Title, Phone, Address, City, State, Country. Quoted fields and embedded commas are supported.</span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={handleContinue}
                    disabled={!isStep1Valid}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-white transition ${
                      isStep1Valid ? "bg-[#3b82f6] hover:bg-[#2563eb] shadow-md" : "bg-[#93c5fd] cursor-not-allowed"
                    }`}
                  >
                    Continue to Field Mapping <ChevronRight size={18} />
                  </button>
                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* PREVIEW CARD */}
                <div className="bg-white rounded-[12px] border border-[#e2e8f0] p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText size={16} className="text-[#64748b]" />
                    <h2 className="text-[14px] font-bold text-[#111827]">Preview</h2>
                  </div>
                  <p className="text-[12px] text-[#64748b] mb-6">Live preview of your data</p>

                  {!file ? (
                    <div className="flex flex-col items-center justify-center py-10">
                      <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center mb-3">
                        <FileText size={20} className="text-[#94a3b8]" />
                      </div>
                      <p className="text-[14px] font-semibold text-[#111827]">No data yet</p>
                      <p className="text-[12px] text-[#64748b]">Upload a CSV file to see preview</p>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#e2e8f0] mb-4">
                        <p className="text-[14px] font-semibold text-[#0f172a] truncate">{file.name}</p>
                        <p className="text-[12px] text-[#64748b] mt-1">{rows.length} rows detected • {headers.length} columns</p>
                      </div>
                      {rows.length > 0 && (
                        <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden">
                          <div className="bg-[#f8fafc] border-b border-[#e2e8f0] px-3 py-2 text-[11px] font-bold text-[#64748b] uppercase flex justify-between">
                            <span>{headers[0]}</span>
                            <span>{headers[1] || ''}</span>
                          </div>
                          {rows.slice(0, 3).map((r, i) => (
                            <div key={i} className="px-3 py-2 text-[12px] text-[#334155] border-b border-[#f1f5f9] last:border-0 flex justify-between truncate">
                              <span className="truncate w-1/2 pr-2">{r[0]}</span>
                              <span className="truncate w-1/2">{r[1]}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* CREDITS CARD */}
                <div>
                  <p className="text-[12px] font-bold text-[#94a3b8] tracking-wider mb-4 uppercase">
                    Credits
                  </p>
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-[14px] font-bold text-[#0f172a]">Contact Upload Limit</span>
                    <span className="text-[14px] font-medium text-[#64748b]">
                      {file ? rows.length : 0}/10,000
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#e2e8f0] rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-[#10b981] rounded-full" style={{ width: `${file ? Math.min((rows.length/10000)*100, 100) : 0}%` }}></div>
                  </div>
                  <p className="text-[12px] text-[#64748b]">
                    {(10000 - (file ? rows.length : 0)).toLocaleString()} contacts remaining
                  </p>
                </div>

              </div>

            </div>
          ) : (
            /* STEP 2: FIELD MAPPING */
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-[16px] border border-[#e2e8f0] shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-[#e2e8f0] bg-[#f8fafc]">
                  <h2 className="text-[20px] font-bold text-[#111827]">Field Mapping</h2>
                  <p className="text-[14px] text-[#64748b] mt-1">Map your CSV columns to the system fields. Email is required.</p>
                </div>
                
                <div className="p-8">
                  <div className="space-y-6">
                    {[
                      { key: 'email', label: 'Email Address', required: true },
                      { key: 'firstName', label: 'First Name', required: false },
                      { key: 'lastName', label: 'Last Name', required: false },
                      { key: 'company', label: 'Company Name', required: false },
                    ].map(field => (
                      <div key={field.key} className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                        <div className="w-1/3">
                          <label className="text-[15px] font-semibold text-[#111827] flex items-center gap-2">
                            {field.label}
                            {field.required && <span className="text-red-500 text-[18px] leading-none">*</span>}
                          </label>
                          <p className="text-[12px] text-[#64748b] mt-1">System Field</p>
                        </div>
                        <div className="w-8 flex justify-center text-[#94a3b8]">
                          <ArrowLeft size={16} className="rotate-180" />
                        </div>
                        <div className="w-1/2 relative">
                          <select 
                            value={mappings[field.key] || ""}
                            onChange={(e) => setMappings({...mappings, [field.key]: e.target.value})}
                            className="w-full h-[46px] appearance-none rounded-lg border border-[#cbd5e1] bg-white px-4 text-[14px] text-[#0f172a] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none"
                          >
                            <option value="">-- Do not import --</option>
                            {headers.map((h, i) => (
                              <option key={i} value={h}>{h}</option>
                            ))}
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none rotate-90" size={16} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* IMPORT SUMMARY & ACTION */}
                  <div className="mt-10 pt-8 border-t border-[#e2e8f0] flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-semibold text-[#111827]">Import Summary</p>
                      <p className="text-[13px] text-[#64748b] mt-1">
                        <span className="font-bold text-[#3b82f6]">{rows.length}</span> contacts will be imported to <span className="font-bold text-[#111827]">{listName}</span>. Duplicates and empty emails will be skipped automatically.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setStep(1)}
                        className="px-6 py-2.5 rounded-xl font-medium text-[#64748b] border border-[#e2e8f0] hover:bg-[#f8fafc] transition"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handleImport}
                        disabled={!mappings.email}
                        className={`flex items-center gap-2 px-8 py-2.5 rounded-xl font-medium text-white transition ${
                          mappings.email ? "bg-[#10b981] hover:bg-[#059669] shadow-md" : "bg-[#6ee7b7] cursor-not-allowed"
                        }`}
                      >
                        <Users size={18} />
                        Import Contacts
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
