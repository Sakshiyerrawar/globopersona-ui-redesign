"use client";

import { useState } from "react";

import {
  ArrowLeft,
  Upload,
  Eye,
  Shield,
  FileSpreadsheet,
  CheckCircle2,
} from "lucide-react";

import Link from "next/link";

export default function UploadEmailListPage() {

  const [fileName, setFileName] =
    useState("");

  const [uploaded, setUploaded] =
    useState(false);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
      setUploaded(true);
    }
  };

  return (

    <div className="min-h-screen bg-[#f5f7fb] p-6">

      {/* TOP */}
      <div className="mx-auto max-w-[1400px]">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <Link
              href="/lists"
              className="flex items-center gap-2 text-[#6b7280]"
            >
              <ArrowLeft size={18} />
              Email Lists
            </Link>

            <div className="h-6 w-[1px] bg-[#d1d5db]" />

            <div>

              <h1 className="text-[30px] font-bold text-[#111827]">
                Upload Email List
              </h1>

              <p className="text-[#6b7280]">
                Import contacts from CSV file
              </p>

            </div>

          </div>

          <div className="text-[#6b7280]">
            Step 1 of 2
          </div>

        </div>

        {/* PROGRESS */}
        <div className="mt-6 h-2 w-full rounded-full bg-[#e5e7eb]">

          <div className="h-2 w-[70%] rounded-full bg-[#2563eb]" />

        </div>

        {/* CONTENT */}
        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">

          {/* LEFT */}
          <div>

            {/* LIST INFO */}
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6">

              <h2 className="text-[24px] font-bold text-[#111827]">
                List Information
              </h2>

              <p className="mt-2 text-[#6b7280]">
                Basic details about your email list
              </p>

              {/* INPUT */}
              <div className="mt-6">

                <label className="text-sm font-medium text-[#374151]">
                  List Name
                </label>

                <input
                  type="text"
                  defaultValue="Newsletter Subscribers"
                  className="
                    mt-2
                    h-[58px]
                    w-full
                    rounded-xl
                    border
                    border-[#d1d5db]
                    px-4
                    outline-none
                  "
                />

              </div>

              {/* TEXTAREA */}
              <div className="mt-5">

                <label className="text-sm font-medium text-[#374151]">
                  Description (Optional)
                </label>

                <textarea
                  rows={5}
                  placeholder="Describe the purpose of this list..."
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-[#d1d5db]
                    p-4
                    outline-none
                    resize-none
                  "
                />

              </div>

            </div>

            {/* UPLOAD */}
            <div className="mt-6 rounded-2xl border border-[#e5e7eb] bg-white p-6">

              <h2 className="text-[24px] font-bold text-[#111827]">
                Upload CSV File
              </h2>

              <p className="mt-2 text-[#6b7280]">
                Select your CSV file containing contact information
              </p>

              {/* BOX */}
              <label
                className="
                  mt-6
                  flex
                  min-h-[260px]
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border-2
                  border-dashed
                  border-[#cbd5e1]
                  bg-[#fafafa]
                  transition-all
                  hover:bg-[#f3f4f6]
                "
              >

                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                {!uploaded ? (
                  <>

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eff6ff]">

                      <Upload
                        size={36}
                        className="text-[#2563eb]"
                      />

                    </div>

                    <h3 className="mt-6 text-[24px] font-bold text-[#111827]">
                      Click to upload
                    </h3>

                    <p className="mt-3 text-[#6b7280]">
                      or drag and drop your CSV or XLSX file
                    </p>

                    <div className="mt-5 flex items-center gap-4 text-sm text-[#9ca3af]">

                      <span>Secure</span>

                      <span>Max 10MB</span>

                      <span>CSV or XLSX</span>

                    </div>

                  </>
                ) : (
                  <>

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ecfdf5]">

                      <CheckCircle2
                        size={40}
                        className="text-[#16a34a]"
                      />

                    </div>

                    <h3 className="mt-5 text-[22px] font-bold text-[#111827]">
                      {fileName}
                    </h3>

                    <p className="mt-2 text-[#16a34a]">
                      File uploaded successfully
                    </p>

                  </>
                )}

              </label>

              {/* TIPS */}
              <div className="mt-6 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 text-sm text-[#6b7280]">

                <span className="font-semibold text-[#111827]">
                  CSV Format Tips:
                </span>

                {" "}
                Ensure your CSV has headers in the first row.

              </div>

              {/* BUTTON */}
              <button
                className="
                  mt-6
                  h-[60px]
                  w-full
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#2563eb]
                  to-[#9333ea]
                  text-lg
                  font-semibold
                  text-white
                  hover:scale-[1.01]
                  transition-all
                "
              >
                Continue to Field Mapping →
              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div>

            {/* PREVIEW */}
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6">

              <div className="flex items-center gap-2">

                <Eye size={18} />

                <h2 className="text-[22px] font-bold text-[#111827]">
                  Preview
                </h2>

              </div>

              <p className="mt-2 text-[#6b7280]">
                Live preview of your data
              </p>

              <div className="mt-8 flex min-h-[220px] flex-col items-center justify-center rounded-2xl bg-[#f9fafb]">

                <FileSpreadsheet
                  size={48}
                  className="text-[#9ca3af]"
                />

                <p className="mt-4 text-[#6b7280]">
                  No data yet
                </p>

                <p className="text-sm text-[#9ca3af]">
                  Upload a CSV file to see preview
                </p>

              </div>

            </div>

            {/* CREDITS */}
            <div className="mt-6 rounded-2xl border border-[#e5e7eb] bg-white p-6">

              <h2 className="text-[22px] font-bold text-[#111827]">
                Credits
              </h2>

              <div className="mt-6">

                <div className="flex items-center justify-between">

                  <span className="font-medium">
                    Contact Upload Limit
                  </span>

                  <span>0/100</span>

                </div>

                <div className="mt-3 h-3 rounded-full bg-[#e5e7eb]">

                  <div className="h-3 w-[40%] rounded-full bg-[#f59e0b]" />

                </div>

                <p className="mt-3 text-sm text-[#6b7280]">
                  100 contacts remaining
                </p>

              </div>

            </div>

            {/* VERIFY */}
            <div className="mt-6 rounded-2xl border border-[#e5e7eb] bg-white p-6">

              <div className="flex items-center gap-2">

                <Shield
                  size={18}
                  className="text-[#16a34a]"
                />

                <h2 className="text-[22px] font-bold text-[#111827]">
                  Email Verification
                </h2>

              </div>

              <p className="mt-3 text-[#6b7280]">
                Verify emails after upload to improve deliverability
              </p>

              <div className="mt-6 space-y-4">

                <div className="rounded-2xl border border-[#d1d5db] p-4">

                  <div className="flex items-center gap-3">

                    <input type="radio" checked readOnly />

                    <div>

                      <h3 className="font-semibold text-[#111827]">
                        Skip Verification
                      </h3>

                      <p className="text-sm text-[#6b7280]">
                        Upload without verifying
                      </p>

                    </div>

                  </div>

                </div>

                <div className="rounded-2xl border border-[#d1d5db] p-4">

                  <div className="flex items-center gap-3">

                    <input type="radio" readOnly />

                    <div>

                      <h3 className="font-semibold text-[#111827]">
                        Verify Contacts
                      </h3>

                      <p className="text-sm text-[#6b7280]">
                        Verify all uploaded emails after saving
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}