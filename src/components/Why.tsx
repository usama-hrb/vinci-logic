import { useTranslations } from "next-intl";
import { Code, Database, Workflow } from "lucide-react";
import Image from "next/image";

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
    <section className="">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("why_title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("why_subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {cards.map(({ key, icon: Icon, title, description }) => (
              <div
                key={key}
                className="relative rounded-2xl p-[1.5px] overflow-hidden"
              >
                <div className="absolute inset-0 shimmer bg-[linear-gradient(90deg,transparent,#872CE2,transparent)]" />
                <div className="relative rounded-2xl bg-card p-8 overflow-hidden">
                  {/* Background SVG Image */}
                  <Image
                    className="pointer-events-none object-cover opacity-[0.15]"
                    src="/01.svg"
                    alt=""
                    fill
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <div className="mb-6 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right column – big card */}
          <div className="relative rounded-2xl p-[1.5px] overflow-hidden">
            <div className="absolute inset-0 shimmer bg-[linear-gradient(90deg,transparent,#872CE2,transparent)]" />
            <div className="relative rounded-2xl bg-card p-8 h-full">
              <Image className="pointer-events-none object-cover opacity-[0.15]"
                src="/01.svg"
                alt=""
                fill
                aria-hidden="true"
              />
              <div className="mb-6 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Workflow className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t("cards.workflow.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("cards.workflow.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
