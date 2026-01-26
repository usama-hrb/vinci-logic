import { useTranslations } from "next-intl";
import { FadeUp } from "./animate/FadeUp";
import { BellOff, ServerCrash, Workflow, ArrowRight } from "lucide-react";
import { ShineBorder } from "./ui/shine-border";
import AnimatedBadge from "./ui/animated-badge";
import Image from "next/image";
import { Ripple } from "./ui/ripple";
import { DotPattern } from "./ui/dot-pattern";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

export default function HowItWorks() {
  const t = useTranslations("how");
  const how = [
    {
      key: "step1",
      badge: t("cards.step1.badge"),
      icon: ServerCrash,
      title: t("cards.step1.title"),
      description: t("cards.step1.description"),
    },
    {
      key: "step2",
      badge: t("cards.step2.badge"),
      icon: BellOff,
      title: t("cards.step2.title"),
      description: t("cards.step2.description"),
    },
    {
      key: "step3",
      badge: t("cards.step3.badge"),
      icon: Workflow,
      title: t("cards.step3.title"),
      description: t("cards.step3.description"),
    },
    {
      key: "step4",
      badge: t("cards.step4.badge"),
      icon: Workflow,
      title: t("cards.step4.title"),
      description: t("cards.step4.description"),
    },
  ];

  return (
    <section className="relative py-12 md:py-24">
      <div
        className="
          pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%]
          bg-[radial-gradient(var(--color-border)_1px,transparent_1px)]
          bg-size-[16px_16px]
          mask-[linear-gradient(to_top,black_0%,black_60%,transparent_100%)]
        "
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp delay={0.1}>
          <div className="text-center mb-12 md:mb-16">
            <FadeUp delay={0.2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                {t("how_title")}
              </h2>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("how_subtitle")}
              </p>
            </FadeUp>
          </div>
        </FadeUp>
        <div className="flex flex-col gap-6 backdrop-blur-2xl">
          {how.map(({ key, icon: Icon, title, description, badge }, index) => (
            <FadeUp key={key} delay={0.1 + index * 0.1} variant="slideRight">
              <div className="group border border-border relative h-full flex flex-col bg-background/40 drop-shadow-2xl rounded-lg transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.1)] hover:-translate-y-0.5 bg-background/50">
                <ShineBorder
                  shineColor={["#855CF5", "#C091F0", "#8F38E7"]}
                  duration={18}
                />
                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 ">
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between min-h-50 md:min-h-80 p-3 md:p-5 m-4 md:m-6">
                    <FadeUp delay={0.1}>
                      <div className="inline-flex items-center rounded-full border border-border/50 bg-muted/20 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-medium text-muted-foreground backdrop-blur-sm">
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
                        {badge}
                      </div>
                    </FadeUp>
                    <div className="mt-auto space-y-2 md:space-y-3">
                      <FadeUp delay={0.2}>
                        <h3 className="text-xl md:text-3xl font-semibold text-foreground leading-tight">
                          {title}
                        </h3>
                        <p className="text-sm md:text-[17px] text-muted-foreground leading-relaxed mt-2">
                          {description}
                        </p>

                      </FadeUp>
                    </div>
                  </div>
                  <div className="w-full md:w-auto md:min-w-120 h-48 md:h-80 relative overflow-hidden rounded">
                    <Ripple mainCircleSize={50} />
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
