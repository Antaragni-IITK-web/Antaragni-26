"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@repo/store";
import Image from "next/image";
import { assets } from "@/lib/assets";
// using live firebase data in the tabs
import { ProfileTab } from "./ProfileTab";
import { LeaderboardTab } from "./LeaderboardTab";
import { TasksTab } from "./TasksTab";
import { PlaceholderTab } from "./PlaceholderTab";
import { IdeasTab } from "./IdeasTab";

type TabId = "PROFILE" | "LEADERBOARD" | "TASKS" | "IDEAS";

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>("PROFILE");
  const tabs: TabId[] = ["PROFILE", "LEADERBOARD", "TASKS", "IDEAS"];
  const { user, loading } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="h-screen w-full flex items-center justify-center text-white/50 tracking-widest text-sm uppercase">Loading Dashboard...</div>;
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 pt-4 md:pt-6 relative z-10">
      
      {/* Compact Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Heading and Tabs (occupying 4 columns) */}
        <div className="col-span-1 lg:col-span-4 flex flex-col justify-center text-left">
          <h1 className="font-serif uppercase -tracking-[0.02em] text-[clamp(36px,8vw,64px)] leading-[0.85] text-foreground">
            CAMPUS<br />
            AMBASSADOR<br />
            <span className="text-accent">DASHBOARD</span>
          </h1>

          {/* Dashboard Navigation Tabs — horizontally scrollable on mobile */}
          <div className="flex gap-5 sm:gap-6 md:gap-10 mt-8 md:mt-10 border-b border-white/5 w-full overflow-x-auto scrollbar-hide pb-px">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-2.5 text-[11px] md:text-[12px] font-sans font-semibold uppercase tracking-[0.15em] transition-colors duration-300 whitespace-nowrap ${
                  activeTab === tab ? "text-accent font-bold" : "text-white/60 hover:text-white"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Landscape Hero Image (occupying 8 columns for maximum visual scale on desktop) */}
        <div className="col-span-1 lg:col-span-8 flex items-center justify-center mt-2 lg:mt-0 z-10">
          <div className="w-full h-[160px] xs:h-[190px] sm:h-[260px] lg:h-[310px] xl:h-[350px] relative overflow-hidden mb-6 md:mb-8">
            {/* Main Visual */}
            <Image 
              src="/assets/dashboard/main_image.webp" 
              alt="Campus Ambassador Dashboard Hero" 
              fill 
              className="object-contain" 
              priority 
            />
            {/* Ambient vignette blending overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-75 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-25 hidden lg:block pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Tab Content (starts immediately below the tabs/hero) */}
      <div className="mt-6 lg:-mt-2 w-full">
        {activeTab === "PROFILE" ? (
          <ProfileTab />
        ) : activeTab === "LEADERBOARD" ? (
          <LeaderboardTab />
        ) : activeTab === "TASKS" ? (
          <TasksTab />
        ) : activeTab === "IDEAS" ? (
          <IdeasTab />
        ) : (
          <PlaceholderTab tabName={activeTab} key={activeTab} />
        )}
      </div>

    </div>
  );
}
