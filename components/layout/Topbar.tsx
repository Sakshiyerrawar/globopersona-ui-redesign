"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Bell,
  ChevronDown,
  Sun,
  Moon,
  User,
  CreditCard,
  Settings,
  Link,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";

export default function Topbar() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const [loggedOut, setLoggedOut] = useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  /* OUTSIDE CLICK */
  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {

        setShowProfileMenu(false);

        setShowNotifications(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  /* DARK MODE */
  useEffect(() => {

    if (darkMode) {

      document.body.classList.add(
        "bg-[#020817]"
      );

    } else {

      document.body.classList.remove(
        "bg-[#020817]"
      );
    }

  }, [darkMode]);

  /* LOGOUT SCREEN */
  if (loggedOut) {

    return (

      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-[1400px] grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div>

            <div className="flex items-center gap-4">

              <img
                src="/360airo-logo.png"
                alt="logo"
                className="h-16"
              />

              <h1 className="text-[42px] font-bold text-[#2563eb]">

                360 AIRO

              </h1>

            </div>

            <h2 className="mt-10 text-[60px] leading-[70px] font-bold text-[#0f172a]">

              Professional Email & LinkedIn Automation

            </h2>

            <p className="mt-8 text-[24px] leading-[40px] text-[#475569]">

              Enterprise-grade B2B SaaS platform for managing campaigns with advanced personalization and analytics.

            </p>

          </div>

          {/* RIGHT */}
          <div className="rounded-[40px] border bg-white p-10 shadow-xl">

            <div className="grid grid-cols-2 rounded-2xl border p-2">

              <button className="h-[70px] rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#9333ea] text-[22px] font-semibold text-white">

                Sign In

              </button>

              <button className="h-[70px] text-[22px] font-semibold text-[#334155]">

                Sign Up

              </button>

            </div>

            <div className="mt-12">

              <h1 className="text-center text-[48px] font-bold text-[#0f172a]">

                Welcome Back

              </h1>

              <p className="mt-3 text-center text-[20px] text-[#64748b]">

                Sign in with your approved account

              </p>

            </div>

            <div className="mt-12">

              <label className="text-[18px] font-semibold text-[#0f172a]">

                Email Address

              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="mt-3 h-[70px] w-full rounded-2xl border px-6 text-[18px] outline-none"
              />

            </div>

            <div className="mt-8">

              <label className="text-[18px] font-semibold text-[#0f172a]">

                Password

              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="mt-3 h-[70px] w-full rounded-2xl border px-6 text-[18px] outline-none"
              />

            </div>

            <button
              onClick={() =>
                setLoggedOut(false)
              }
              className="mt-10 h-[70px] w-full rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#4f46e5] text-[24px] font-bold text-white"
            >

              Sign In

            </button>

          </div>

        </div>

      </div>
    );
  }

  /* NORMAL TOPBAR */
  return (

    <header className="sticky top-0 z-40 flex h-[78px] items-center justify-between border-b border-[#e5e7eb] bg-white px-8">

      {/* LEFT */}
      <div>

        <h1 className="text-[20px] font-bold text-[#111827]">

          Welcome back, Sakshi! 👋

        </h1>

        <p className="mt-1 text-[15px] text-[#6b7280]">

          Here's what's happening with your campaigns today

        </p>

      </div>

      {/* RIGHT */}
      <div
        ref={dropdownRef}
        className="relative flex items-center gap-7"
      >

        {/* THEME */}
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className={`flex h-[42px] w-[84px] items-center rounded-full px-[5px] transition-all ${
            darkMode
              ? "justify-end bg-[#334155]"
              : "justify-start bg-[#e5e7eb]"
          }`}
        >

          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white shadow-md">

            {darkMode ? (

              <Moon
                size={16}
                className="text-[#0f172a]"
              />

            ) : (

              <Sun
                size={16}
                className="fill-[#f59e0b] text-[#f59e0b]"
              />

            )}

          </div>

        </button>

        {/* NOTIFICATION */}
        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="text-[#6b7280]"
          >

            <Bell size={22} />

          </button>

          {showNotifications && (

            <div className="absolute right-0 top-14 w-[400px] rounded-3xl border bg-white shadow-2xl">

              <div className="flex items-center justify-between border-b px-6 py-5">

                <h2 className="text-[20px] font-semibold">

                  Notifications

                </h2>

                <button
                  onClick={() =>
                    setShowNotifications(
                      false
                    )
                  }
                >

                  <X size={20} />

                </button>

              </div>

              <div className="flex h-[250px] flex-col items-center justify-center">

                <Bell
                  size={60}
                  className="text-[#cbd5e1]"
                />

                <p className="mt-5 text-[#94a3b8]">

                  No notifications yet

                </p>

              </div>

            </div>
          )}

        </div>

        {/* PROFILE */}
        <div className="relative">

          <button
            onClick={() =>
              setShowProfileMenu(
                !showProfileMenu
              )
            }
            className="flex items-center gap-4"
          >

            <div className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-[#2563eb] text-[20px] font-semibold text-white">

              S

            </div>

            <p className="text-[18px] font-semibold text-[#111827]">

              Sakshi Yerrawar

            </p>

            <ChevronDown
              size={18}
              className="text-[#9ca3af]"
            />

          </button>

          {showProfileMenu && (

            <div className="absolute right-0 top-16 w-[320px] overflow-hidden rounded-3xl border bg-white shadow-2xl">

              {/* TOP */}
              <div className="border-b px-6 py-5">

                <h2 className="text-[24px] font-bold text-[#111827]">

                  Sakshi Yerrawar

                </h2>

                <p className="mt-1 text-[#64748b]">

                  sakshiyerawar6710@gmail.com

                </p>

              </div>

              {/* MENU */}
              <div className="py-2">

                <button
                  onClick={() => {
                    window.location.href =
                      "/profile";
                  }}
                  className="flex w-full items-center gap-4 px-6 py-4 hover:bg-[#f8fafc]"
                >

                  <User size={20} />

                  My Profile

                </button>

                <button
                  onClick={() => {

                    setShowProfileMenu(false);

                    window.location.href =
                      "/settings/billing";

                  }}
                  className="flex w-full items-center gap-4 px-6 py-4 hover:bg-[#f8fafc]"
                >

                  <CreditCard size={20} />

                  Billing

                </button>

                <button className="flex w-full items-center gap-4 px-6 py-4 hover:bg-[#f8fafc]">

                  <Settings size={20} />

                  Settings

                </button>

                <button className="flex w-full items-center gap-4 px-6 py-4 hover:bg-[#f8fafc]">

                  <Link size={20} />

                  Affiliate

                </button>

                <button
  onClick={() => {

    setShowProfileMenu(false);

    window.location.href = "/help";

  }}
  className="flex w-full items-center gap-4 px-6 py-4 hover:bg-[#f8fafc]"
>

  <HelpCircle size={20} />

  Help Center

</button>

              </div>

              {/* LOGOUT */}
              <div className="border-t p-2">

                <button
                  onClick={() => {

                    setLoggedOut(true);

                    setShowProfileMenu(false);

                  }}
                  className="flex w-full items-center gap-4 rounded-2xl px-6 py-4 text-[#ef4444] hover:bg-[#fef2f2]"
                >

                  <LogOut size={20} />

                  Log out

                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}