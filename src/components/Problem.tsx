import { useTranslations } from "next-intl";
import { BellRing, SearchAlert, ArrowBigDownDash, EyeOff } from "lucide-react";
import { FadeUp } from "./animate/FadeUp";
import { ShineBorder } from "./ui/shine-border";

export default function Problem() {
  const t = useTranslations("problems");
  const problems = [
    {
      key: "scale",
      icon: BellRing,
      title: t("cards.scale.title"),
      description: t("cards.scale.description"),
    },
    {
      key: "noise",
      icon: SearchAlert,
      title: t("cards.noise.title"),
      description: t("cards.noise.description"),
    },
    {
      key: "automation",
      icon: ArrowBigDownDash,
      title: t("cards.automation.title"),
      description: t("cards.automation.description"),
    },
    {
      key: "blindSpots",
      icon: EyeOff,
      title: t("cards.blindSpots.title"),
      description: t("cards.blindSpots.description"),
    },
  ];

  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive"></div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <FadeUp duration={1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t("problems_title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("problems_subtitle")}
            </p>
          </div>
        </FadeUp>

        {/* Cards Grid - 2 small on left, 1 big on right */}
        <div className="grid gap-15 md:grid-cols-[4fr_6fr]">
          {/* Left column - 2 stacked cards */}
          <div>
            <div className="space-y-6">
              {problems.map(
                ({ key, icon: Icon, title, description }, index) => (
                  <FadeUp
                    key={key}
                    delay={0.1 + index * 0.1}
                    variant="slideRight"
                  >
                    <div className="group relative bg-background/40 drop-shadow-2xl rounded-lg p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.1)] hover:-translate-y-1">
                      <ShineBorder
                        shineColor={["#855CF5", "#C091F0", "#8F38E7"]}
                        duration={18}
                      />
                      <div className="flex items-start gap-5">
                        {/* Icon */}
                        <div className="shrink-0 mt-1">
                          <div className="w-11 h-11 rounded-md border border-border/50 bg-background flex items-center justify-center transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
                            <Icon
                              className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                              strokeWidth={1.5}
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-2">
                          <h3 className="text-lg font-semibold text-foreground leading-snug">
                            {title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                ),
              )}
            </div>
          </div>

          {/* Right column - Content section */}
          <div className="relative flex h-full min-h-106 flex-col justify-center px-2 md:px-6">
            {/* Gradient background accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="space-y-6">
              {/* Badge */}
              <FadeUp delay={0.3} variant="fadeIn" duration={0.7}>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/5 px-5 py-2 text-sm font-medium text-primary backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/10">
                  <ShineBorder
                    shineColor={["#855CF5", "#C091F0", "#8F38E7"]}
                    duration={40}
                  />
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  {t("problems_badge")}
                </span>
              </FadeUp>

              {/* Header */}
              <FadeUp delay={0.45} variant="fadeUp" duration={0.85}>
                <h3 className="text-3xl font-bold leading-tight text-foreground sm:text-5xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
                  {t("problems_header")}
                </h3>
              </FadeUp>

              {/* Subtitle */}
              <FadeUp delay={0.6} variant="fadeUp" duration={0.85}>
                <p className="text-base leading-relaxed text-muted-foreground/90 max-w-xl">
                  {" "}
                  {t("problems_disc")}
                </p>
              </FadeUp>

              {/* Feature list */}
              {/* <FadeUp delay={0.75} variant="fadeUp" duration={0.85}>
                <div className="pt-4 space-y-3">
                  {[
                    "Real-time monitoring & alerts",
                    "Automated incident response",
                    "Intelligent noise reduction",
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-sm text-muted-foreground group/item"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                        <svg
                          className="h-3 w-3 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="group-hover/item:text-foreground transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeUp> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
