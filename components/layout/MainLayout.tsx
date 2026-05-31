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

      <div className="flex-1 ml-[270px] min-h-screen flex flex-col">

        <Topbar />

        <main className="flex-1 flex flex-col">
          {children}
        </main>

      </div>
    </div>
  );
}