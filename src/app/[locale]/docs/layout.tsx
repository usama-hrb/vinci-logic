import { DocsLayout } from "@/components/layout/docs";
import { source } from "@/lib/source";
import { baseOptions } from "@/lib/layout.shared";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import {
  LargeSearchToggle,
  SearchToggle,
} from "@/components/layout/search-toggle";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Full-width responsive navbar at the top */}
      <div className="w-full border-b-3 border-primary bg-background/95">
        <div className="flex h-12 md:h-16 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-50">
          <Logo />
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:block">
              <LargeSearchToggle />
            </div>
            <div className="sm:hidden">
              <SearchToggle />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <DocsLayout
        tree={source.pageTree}
        {...baseOptions()}
        nav={{
          enabled: true,
          title: "Documentation",
        }}
        sidebar={{
          defaultOpenLevel: 1,
          collapsible: true,
          className:
            "border-r-2 border-primary bg-background [&_a:hover]:bg-primary/10 [&_a:hover]:text-primary [&_a[data-active='true']]:bg-primary/20 [&_a[data-active='true']]:text-primary font-semibold",
        }}
        searchToggle={{ enabled: false }}
        themeSwitch={{ enabled: false }}
      >
        {children}
      </DocsLayout>
    </>
  );
}
