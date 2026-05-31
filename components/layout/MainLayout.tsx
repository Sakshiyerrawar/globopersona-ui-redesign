"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#f8fafc]">

      <Sidebar />

      <div className="flex-1 ml-[260px] min-h-screen">

        <Topbar />

        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}