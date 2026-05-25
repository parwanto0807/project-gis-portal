"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Menu } from "./menu";
import { useSidebarToggle, SidebarToggleStore } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "./sidebar-toggle";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/authStore";

export function Sidebar() {
  const sidebar = useStore<SidebarToggleStore, SidebarToggleStore>(useSidebarToggle, (state: SidebarToggleStore) => state);
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const role = user?.role || "user";

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar.isOpen ? "w-[280px]" : "w-[95px]",
        "bg-background border-r" // Keep default or adjust for aesthetics
      )}
    >
      <SidebarToggle isOpen={sidebar.isOpen} setIsOpen={sidebar.setIsOpen} />

      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto">
        {/* Logo Section */}
        <div className="flex-shrink-0 mb-6">
          <Button
            variant="ghost"
            asChild
            className={cn(
              "w-full p-2 hover:bg-accent transition-colors",
              "rounded-lg"
            )}
          >
            <Link href="/" className="flex items-center justify-start gap-2 pl-2">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/logo-sm.png"
                  alt="Grafindo Logo"
                  fill
                  sizes="40px"
                  priority
                  className="object-contain"
                />
              </div>
              {sidebar.isOpen && (
                <span className={cn(
                  "font-bold text-lg whitespace-nowrap transition-all duration-300 transform",
                  "opacity-100 translate-x-0"
                )}>
                  Grafindo Mitrasemesta
                </span>
              )}
            </Link>
          </Button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-1">
          <Menu
            isOpen={sidebar.isOpen}
            user={user}
            theme={theme === "dark" || theme === "light" ? theme : "light"}
          />
        </div>
      </div>
    </aside>
  );
}
