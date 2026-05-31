"use client";

import {
  ArrowLeft,
  Search,
  BookOpen,
  Zap,
  TrendingUp,
  Shield,
  ChevronRight,
  Mail,
  MessageSquare,
  Phone,
  Users,
  ExternalLink,
} from "lucide-react";

export default function HelpPage() {

  const faqs = [
    "How do I get started with 360Airo?",
    "What email providers are supported?",
    "What is email warmup and why do I need it?",
    "How does the AI personalization feature work?",
    "Can I schedule campaigns in advance?",
    "How are my emails tracked?",
    "What is the monthly email limit?",
    "How can I export my campaign data?",
  ];

  return (

    <div className="min-h-screen bg-gradient-to-r from-[#020817] to-[#172554] px-4 py-8 md:px-10">

      <div className="mx-auto max-w-[1200px]">

        {/* BACK */}
        <button
          onClick={() => window.history.back()}
          className="mb-8 flex items-center gap-2 text-[#cbd5e1] hover:text-white"
        >

          <ArrowLeft size={18} />

          Back

        </button>

        {/* HEADER */}
        <h1 className="text-5xl font-bold text-white">

          Help Center

        </h1>

        <p className="mt-4 text-xl text-[#cbd5e1]">

          Find answers and get support

        </p>

        {/* SEARCH */}
        <div className="mt-10 relative">

          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
          />

          <input
            type="text"
            placeholder="Search help articles..."
            className="h-[70px] w-full rounded-2xl border border-[#334155] bg-[#1e293b] pl-14 pr-5 text-lg text-white outline-none"
          />

        </div>

        {/* CARDS */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {/* CARD 1 */}
          <div className="rounded-3xl border border-[#1e3a8a] bg-[#0f172a] p-8">

            <BookOpen
              size={46}
              className="text-[#60a5fa]"
            />

            <h2 className="mt-8 text-3xl font-bold text-white">

              Documentation

            </h2>

            <p className="mt-3 text-lg text-[#94a3b8]">

              Read our guides

            </p>

          </div>

          {/* CARD 2 */}
          <div className="rounded-3xl border border-[#1e3a8a] bg-[#0f172a] p-8">

            <Zap
              size={46}
              className="text-[#22d3ee]"
            />

            <h2 className="mt-8 text-3xl font-bold text-white">

              Quick Start

            </h2>

            <p className="mt-3 text-lg text-[#94a3b8]">

              Get up and running

            </p>

          </div>

          {/* CARD 3 */}
          <div className="rounded-3xl border border-[#1e3a8a] bg-[#0f172a] p-8">

            <TrendingUp
              size={46}
              className="text-[#4ade80]"
            />

            <h2 className="mt-8 text-3xl font-bold text-white">

              Best Practices

            </h2>

            <p className="mt-3 text-lg text-[#94a3b8]">

              Improve campaigns

            </p>

          </div>

          {/* CARD 4 */}
          <div className="rounded-3xl border border-[#1e3a8a] bg-[#0f172a] p-8">

            <Shield
              size={46}
              className="text-[#c084fc]"
            />

            <h2 className="mt-8 text-3xl font-bold text-white">

              Security

            </h2>

            <p className="mt-3 text-lg text-[#94a3b8]">

              Learn about safety

            </p>

          </div>

        </div>

        {/* FAQ */}
        <h2 className="mt-16 text-5xl font-bold text-white">

          Frequently Asked Questions

        </h2>

        <div className="mt-10 space-y-5">

          {faqs.map((faq) => (

            <button
              key={faq}
              className="flex h-[90px] w-full items-center justify-between rounded-2xl border border-[#1e3a8a] bg-[#0f172a] px-8 text-left transition-all hover:bg-[#172554]"
            >

              <span className="text-2xl font-semibold text-white">

                {faq}

              </span>

              <ChevronRight
                size={26}
                className="text-[#94a3b8]"
              />

            </button>

          ))}

        </div>

        {/* HELP */}
        <h2 className="mt-20 text-5xl font-bold text-white">

          Still need help?

        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">

          {/* EMAIL */}
          <div className="rounded-3xl border border-[#1e3a8a] bg-[#0f172a] p-8">

            <Mail
              size={46}
              className="text-[#60a5fa]"
            />

            <h2 className="mt-8 text-3xl font-bold text-white">

              Email Support

            </h2>

            <p className="mt-4 text-xl leading-[36px] text-[#94a3b8]">

              Send us an email and we'll respond within 24 hours

            </p>

            <button className="mt-8 flex h-[60px] w-full items-center justify-center gap-3 rounded-2xl bg-white text-lg font-semibold text-[#111827]">

              support@360airo.com

              <ExternalLink size={18} />

            </button>

          </div>

          {/* CHAT */}
          <div className="rounded-3xl border border-[#1e3a8a] bg-[#0f172a] p-8">

            <MessageSquare
              size={46}
              className="text-[#22d3ee]"
            />

            <h2 className="mt-8 text-3xl font-bold text-white">

              Live Chat

            </h2>

            <p className="mt-4 text-xl leading-[36px] text-[#94a3b8]">

              Chat with our support team in real-time

            </p>

            <button className="mt-8 flex h-[60px] w-full items-center justify-center gap-3 rounded-2xl bg-white text-lg font-semibold text-[#111827]">

              Start Chat

              <ExternalLink size={18} />

            </button>

          </div>

          {/* PHONE */}
          <div className="rounded-3xl border border-[#1e3a8a] bg-[#0f172a] p-8">

            <Phone
              size={46}
              className="text-[#4ade80]"
            />

            <h2 className="mt-8 text-3xl font-bold text-white">

              Phone Support

            </h2>

            <p className="mt-4 text-xl leading-[36px] text-[#94a3b8]">

              Call our support team (Mon-Fri, 9am-6pm EST)

            </p>

            <button className="mt-8 flex h-[60px] w-full items-center justify-center gap-3 rounded-2xl bg-white text-lg font-semibold text-[#111827]">

              +1 (555) 123-4567

              <ExternalLink size={18} />

            </button>

          </div>

        </div>

        {/* COMMUNITY */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#c084fc] to-[#ddd6fe] p-10">

          <Users
            size={48}
            className="text-[#a855f7]"
          />

          <h2 className="mt-6 text-4xl font-bold text-white">

            Join Our Community

          </h2>

          <p className="mt-4 text-xl text-[#ede9fe]">

            Connect with other 360Airo users, share tips, and ask questions in our community forum.

          </p>

          <button className="mt-8 flex h-[58px] items-center gap-3 rounded-2xl border border-[#a855f7] bg-white px-8 text-lg font-semibold text-[#111827]">

            Visit Community

            <ExternalLink size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}