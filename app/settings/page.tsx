"use client";

import {
  ArrowLeft,
  Check,
  Crown,
  Rocket,
  Sparkles,
  Zap,
  HelpCircle,
  Mail,
  Users,
  BarChart3,
} from "lucide-react";

export default function BillingPage() {

  return (

    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10">

      {/* TOP HEADER */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}
        <div>

          <button
            onClick={() => window.history.back()}
            className="mb-5 flex items-center gap-2 text-[#64748b] hover:text-[#111827]"
          >

            <ArrowLeft size={18} />

            Back

          </button>

          <h1 className="text-[42px] font-bold text-[#0f172a]">

            Billing & Subscriptions

          </h1>

          <p className="mt-2 text-[18px] text-[#64748b]">

            Manage your plans and billing information

          </p>

        </div>

        {/* ACTIVE PLAN */}
        <div className="rounded-full bg-[#dcfce7] px-5 py-3 text-[16px] font-semibold text-[#16a34a]">

          Active Plan: Free

        </div>

      </div>

      {/* CURRENT PLAN */}
      <div className="mt-10 grid gap-8 xl:grid-cols-3">

        {/* LEFT CARD */}
        <div className="rounded-[30px] border bg-white p-8 shadow-sm xl:col-span-2">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-[32px] font-bold text-[#0f172a]">

                Current Subscription

              </h2>

              <p className="mt-2 text-[#64748b]">

                Active plan details and usage

              </p>

            </div>

            <div className="rounded-full bg-[#dcfce7] px-5 py-2 text-[15px] font-semibold text-[#16a34a]">

              Active

            </div>

          </div>

          {/* DETAILS */}
          <div className="mt-10 grid gap-10 lg:grid-cols-2">

            {/* LEFT */}
            <div className="space-y-6">

              <div className="flex items-center justify-between">

                <span className="text-[#64748b]">
                  Plan
                </span>

                <span className="font-bold text-[#0f172a]">
                  Free
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-[#64748b]">
                  Monthly Cost
                </span>

                <span className="font-bold text-[#0f172a]">
                  $0.00
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-[#64748b]">
                  Billing Cycle
                </span>

                <span className="font-bold text-[#0f172a]">
                  Monthly
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-[#64748b]">
                  Next Billing
                </span>

                <span className="font-bold text-[#0f172a]">
                  Jun 23, 2026
                </span>

              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-8">

              {/* EMAILS */}
              <div>

                <div className="mb-3 flex items-center justify-between">

                  <span className="font-medium text-[#0f172a]">
                    Emails Sent
                  </span>

                  <span className="font-bold text-[#0f172a]">
                    0 / Unlimited
                  </span>

                </div>

                <div className="h-3 rounded-full bg-[#e2e8f0]">

                  <div className="h-3 w-[2%] rounded-full bg-[#2563eb]" />

                </div>

              </div>

              {/* AI */}
              <div>

                <div className="mb-3 flex items-center justify-between">

                  <span className="font-medium text-[#0f172a]">
                    AI Personalization
                  </span>

                  <span className="font-bold text-[#0f172a]">
                    0 / 50
                  </span>

                </div>

                <div className="h-3 rounded-full bg-[#e2e8f0]">

                  <div className="h-3 w-[1%] rounded-full bg-[#9333ea]" />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* FEATURES */}
        <div className="rounded-[30px] border bg-white p-8 shadow-sm">

          <h2 className="text-[32px] font-bold text-[#0f172a]">

            Plan Features

          </h2>

          <p className="mt-2 text-[#64748b]">

            Compare key features

          </p>

          <div className="mt-10 space-y-7">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <Users
                  size={18}
                  className="text-[#2563eb]"
                />

                <span className="text-[#0f172a]">
                  Users
                </span>

              </div>

              <span className="font-bold">
                3
              </span>

            </div>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-[#16a34a]"
                />

                <span className="text-[#0f172a]">
                  Contacts
                </span>

              </div>

              <span className="font-bold">
                5K
              </span>

            </div>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <Sparkles
                  size={18}
                  className="text-[#9333ea]"
                />

                <span className="text-[#0f172a]">
                  AI Credits
                </span>

              </div>

              <span className="font-bold">
                3K
              </span>

            </div>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <BarChart3
                  size={18}
                  className="text-[#f59e0b]"
                />

                <span className="text-[#0f172a]">
                  Support
                </span>

              </div>

              <span className="font-bold">
                2 hrs
              </span>

            </div>

          </div>

          <button className="mt-10 h-[58px] w-full rounded-2xl bg-[#2563eb] text-[18px] font-semibold text-white transition-all hover:bg-[#1d4ed8]">

            Request Demo

          </button>

        </div>

      </div>

      {/* PLAN CARDS */}
      <div className="mt-20">

        <h2 className="text-center text-[46px] font-bold text-[#0f172a]">

          Choose Your Plan

        </h2>

        <p className="mt-3 text-center text-[18px] text-[#64748b]">

          Select the perfect plan for your email marketing needs

        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 2xl:grid-cols-4">

          {/* FREE */}
          <div className="rounded-[32px] border-2 border-[#22c55e] bg-[#f0fdf4] p-8 shadow-sm">

            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-[#dcfce7]">

              <Zap
                size={34}
                className="text-[#16a34a]"
              />

            </div>

            <h3 className="mt-8 text-[38px] font-bold text-[#0f172a]">

              Free

            </h3>

            <p className="mt-3 text-[#64748b]">

              Perfect for individuals starting with outbound email

            </p>

            <div className="mt-8 text-[54px] font-bold text-[#0f172a]">

              $0

              <span className="text-[22px] font-normal">
                /month
              </span>

            </div>

            <button className="mt-8 h-[58px] w-full rounded-2xl bg-[#16a34a] text-[18px] font-semibold text-white">

              Current Plan

            </button>

            <div className="mt-10 space-y-4">

              {[
                "Unlimited email sending",
                "1,000 email contacts",
                "1 mailbox",
                "1 user",
                "500 AI personalization credits",
                "Email campaigns",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <Check
                    size={18}
                    className="text-[#16a34a]"
                  />

                  <span className="text-[#0f172a]">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* STARTER */}
          <div className="rounded-[32px] border bg-white p-8 shadow-sm">

            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-[#dbeafe]">

              <Rocket
                size={34}
                className="text-[#0284c7]"
              />

            </div>

            <h3 className="mt-8 text-[38px] font-bold text-[#0f172a]">

              Starter

            </h3>

            <p className="mt-3 text-[#64748b]">

              Great for small outbound teams

            </p>

            <div className="mt-8 text-[54px] font-bold text-[#0f172a]">

              $99

              <span className="text-[22px] font-normal">
                /month
              </span>

            </div>

            <button className="mt-8 h-[58px] w-full rounded-2xl bg-[#0284c7] text-[18px] font-semibold text-white">

              Upgrade Now

            </button>

          </div>

          {/* PRO */}
          <div className="relative rounded-[32px] border bg-[#f5f3ff] p-8 shadow-sm">

            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563eb] px-5 py-2 text-[14px] font-semibold text-white">

              Recommended

            </div>

            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-[#ede9fe]">

              <Crown
                size={34}
                className="text-[#4f46e5]"
              />

            </div>

            <h3 className="mt-8 text-[38px] font-bold text-[#0f172a]">

              Pro

            </h3>

            <p className="mt-3 text-[#64748b]">

              Best for growing advanced teams

            </p>

            <div className="mt-8 text-[54px] font-bold text-[#0f172a]">

              $299

              <span className="text-[22px] font-normal">
                /month
              </span>

            </div>

            <button className="mt-8 h-[58px] w-full rounded-2xl bg-[#4f46e5] text-[18px] font-semibold text-white">

              Upgrade Now

            </button>

          </div>

          {/* ENTERPRISE */}
          <div className="rounded-[32px] border bg-[#fffbeb] p-8 shadow-sm">

            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-[#fef3c7]">

              <Sparkles
                size={34}
                className="text-[#d97706]"
              />

            </div>

            <h3 className="mt-8 text-[38px] font-bold text-[#0f172a]">

              Enterprise

            </h3>

            <p className="mt-3 text-[#64748b]">

              Unlimited scale for large organizations

            </p>

            <div className="mt-8 text-[40px] font-bold text-[#0f172a]">

              Custom Pricing

            </div>

            <button className="mt-8 h-[58px] w-full rounded-2xl bg-[#d97706] text-[18px] font-semibold text-white">

              Contact Sales

            </button>

          </div>

        </div>

      </div>

      {/* HELP SECTION */}
      <div className="mt-20 rounded-[32px] border bg-white p-14 text-center shadow-sm">

        <div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-full bg-[#dbeafe]">

          <HelpCircle
            size={40}
            className="text-[#2563eb]"
          />

        </div>

        <h2 className="mt-8 text-[42px] font-bold text-[#0f172a]">

          Need Help Deciding?

        </h2>

        <p className="mt-4 text-[20px] leading-[34px] text-[#64748b]">

          Our team is ready to help you choose the perfect plan for your business needs.

        </p>

        <button className="mt-10 h-[64px] rounded-2xl bg-[#2563eb] px-12 text-[20px] font-semibold text-white transition-all hover:bg-[#1d4ed8]">

          Contact Sales Team

        </button>

      </div>

    </div>
  );
}