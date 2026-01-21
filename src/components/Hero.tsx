import { FadeUp } from "./animate/FadeUp";
import { Button } from "./ui/button";
import Image from "next/image";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative pt-14">
      {/* Dotted background layer - positioned to cover badge through top half of image */}
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%]
          bg-[radial-gradient(var(--color-border)_1px,transparent_1px)]
          bg-size-[16px_16px]
          mask-[linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]
        "
      />

      <div className="mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <FadeUp>
          <div className="mb-8 inline-flex items-center rounded-full border border-border/50 bg-muted/20 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <span className="mr-2 h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            {t("badge")}
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            {t("title")}
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="px-8">
              {t("primaryCta")}
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              {t("secondaryCta")}
            </Button>
          </div>
        </FadeUp>
        {/* Hero Image container */}
        <FadeUp delay={0.25}>
          <div className="relative mt-16 sm:mt-20 max-w-7xl mx-auto">
            {/* Glow effect */}
            {/* <div className="absolute -inset-0.5 bg-linear-to-b from-purple-500/20 via-purple-500/20 to-transparent blur-2xl -z-10" /> */}

            {/* Image wrapper with fade-out mask */}
            <div className="group relative mask-[linear-gradient(to_bottom,black_0%,black_85%,transparent_100%)] border-border border-3 rounded-2xl">
              {/* Light mode image */}
              <Image
                className="rounded-2xl border border-border shadow-2xl dark:hidden"
                src="/vinci-light.svg"
                alt="Vinci Logic platform interface"
                width={1200}
                height={750}
                priority
              />
              {/* Dark mode image */}
              <Image
                className="rounded-2xl border border-border shadow-2xl hidden dark:block "
                src="/vinci-dark.svg"
                alt="Vinci Logic platform interface"
                width={1200}
                height={750}
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-black/30 opacity-0 transition-all duration-300 rounded-xl group-hover:opacity-100 backdrop-blur-[2px]">
                {/* Play icon */}
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <Play className="mr-2 h-4 w-4" /> {t("video")}
                </Button>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
