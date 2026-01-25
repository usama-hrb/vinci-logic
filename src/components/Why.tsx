import { useTranslations } from "next-intl";
import { Code, Database, Workflow } from "lucide-react";
import Image from "next/image";
import MagicBento from "./MagicBento";
import { FadeUp } from "./animate/FadeUp";

export function Why() {
  const t = useTranslations("why");

  const cards = [
    {
      key: "code",
      icon: Code,
      title: t("cards.code.title"),
      description: t("cards.code.description"),
    },
    {
      key: "data",
      icon: Database,
      title: t("cards.data.title"),
      description: t("cards.data.description"),
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <FadeUp delay={0.1}>
          <div className="text-center mb-16">
            <FadeUp delay={0.2}>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {t("why_title")}
              </h2>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("why_subtitle")}
              </p>
            </FadeUp>
          </div>
        </FadeUp>

        {/* Cards */}
        <FadeUp delay={0.3}>
          <MagicBento
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="132, 0, 255"
            disableAnimations={false}
          />
        </FadeUp>
      </div>
    </section>
  );
}
