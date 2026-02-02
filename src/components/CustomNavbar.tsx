"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CustomNavbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { theme, setTheme } = useTheme();

  function changeLanguage(nextLocale: string) {
    // Remove the current locale from the pathname and add the new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${nextLocale}${pathWithoutLocale}`);
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header className="top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="mx-auto max-w-280 px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-x-6">
          <NavLink href={`/${locale}/product`} label={t("product")} />
          <NavLink href={`/${locale}/solutions`} label={t("solutions")} />
          <NavLink href={`/${locale}/resources`} label={t("resources")} />
          <NavLink href={`/${locale}/docs`} label={t("docs")} />
          <NavLink href={`/${locale}/pricing`} label={t("pricing")} />
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-x-3">
          <Button variant="outline">{t("login")}</Button>
          <Button>{t("demo")}</Button>

          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Select value={locale} onValueChange={changeLanguage}>
            <SelectTrigger className="w-17.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="fr">FR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
    >
      {label}
    </Link>
  );
}
