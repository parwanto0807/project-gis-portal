"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "./menu";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/authStore";

export function SheetMenu() {
  const user = useAuthStore((state) => state.user);
  const { theme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button
          className="h-9 w-9"
          variant="outline"
          size="icon"
          aria-label="Open menu"
        >
          <MenuIcon size={18} />
        </Button>
      </SheetTrigger>

      <SheetContent
        className="w-[85vw] max-w-sm px-4 h-full flex flex-col overflow-hidden"
        side="left"
      >
        <SheetHeader className="text-left flex-shrink-0">
          <div className="flex flex-col space-y-4 py-4">
            {/* Logo Section */}
            <Button
              className="flex justify-center items-center p-0 hover:bg-transparent"
              variant="ghost"
              asChild
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <Image
                  src="/logo-md.png"
                  alt="Grafindo Mitrasemesta"
                  width={180}
                  height={45}
                  priority
                  className="w-auto h-8 object-contain"
                />
              </Link>
            </Button>

            {/* Company Description */}
            <div className="space-y-1">
              <SheetTitle className="text-lg font-semibold text-foreground">
                PT. Grafindo Mitrasemesta
              </SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                A Trusted Platform
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Navigation Menu dengan scroll */}
        <div className="flex-1 overflow-y-auto -mx-2 px-2">
          <Menu
            isOpen
            user={user}
            theme={theme === "dark" || theme === "light" ? theme : "light"}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
