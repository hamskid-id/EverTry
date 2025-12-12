"use client";

import React from "react";
// import { Brand } from "@/components/shared/Brand";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// import { AppSidebar } from "./AppSidebar";
// import { MobileNav } from "./MobileNavigation";
import AppHeader from "./AppHeader";

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  count?: number;
}

interface SidebarData {
  navMain: readonly NavItem[];
  logoIcon: React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  // const sidebarData: SidebarData = useMemo(
  //   () => ({
  //     navMain: navItems,
  //     logoIcon: Brand,
  //   }),
  //   []
  // );

  return (
    <SidebarProvider className="bg-[#131619] p-5 md:gap-5 gap-0">
      {/* <AppSidebar data={sidebarData}/> */}

      <SidebarInset className="w-full bg-[#131619] md:w-[900px] flex flex-col gap-4">
        <AppHeader />
        <main className=" h-full bg-[#131619] md:px-10">{children}</main>
      </SidebarInset>

      {/* <MobileNav items={sidebarData.navMain} /> */}
    </SidebarProvider>
  );
}
