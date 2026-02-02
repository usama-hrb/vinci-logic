import { DocsLayout } from "@/components/layout/docs";
import { source } from "@/lib/source";
import { baseOptions } from "@/lib/layout.shared";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LargeSearchToggle, SearchToggle } from "@/components/layout/search-toggle";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Full-width navbar at the top */}
      <div className="w-full border-b-3 border-primary bg-background/95">
        <div className="flex h-16 items-center justify-between px-50">
          <Logo />
          <div className="flex items-center gap-2">
            <LargeSearchToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <DocsLayout
        tree={source.pageTree}
        {...baseOptions()}
        nav={{
          enabled: false,
        }}
        sidebar={{
          defaultOpenLevel: 1,
          collapsible: false,
          className: "border-r-2 border-primary bg-background [&_a:hover]:bg-primary/10 [&_a:hover]:text-primary [&_a[data-active='true']]:bg-primary/20 [&_a[data-active='true']]:text-primary font-semibold",
        }}
        searchToggle={{enabled: false}}
        themeSwitch={{enabled: false}}
      >
        {children}
      </DocsLayout>
    </>
  );
}
