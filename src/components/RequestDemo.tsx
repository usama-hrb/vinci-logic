import { FadeUp } from "./animate/FadeUp";
import { Button } from "./ui/Button";

export default function RequestDemo() {
  return (
    <section className="relative py-8 md:py-18 border-t border-border">
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
      {/* dotted background */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(var(--color-border)_1px,transparent_1px)]
          bg-size-[16px_16px]
          mask-[radial-gradient(circle_at_center,black_0%,black_40%,transparent_70%)]
        "
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp delay={0.1}>
          <div className="text-center ">
            <FadeUp delay={0.2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Experience Vinci Logic in action
              </h2>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="my-3 md:my-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                See how detection and response as code streamlines
                investigations and reduces alert fatigue.
              </p>
              <FadeUp delay={0.4}>
                <Button className="m-2 md:m-5 md:w-55 md:h-15 md:text-lg font-normal cursor-pointer">
                  Request Demo
                </Button>
              </FadeUp>
            </FadeUp>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
