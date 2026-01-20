"use client";

export function Why() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-brygada">
            Why Vinci Logic?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern security operations platform built for scale, clarity, and
            control.
          </p>
        </div>

        {/* Cards Grid - 2 small on left, 1 big on right */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left column - 2 stacked cards */}
          <div className="flex flex-col gap-6">
            {[1, 2].map((card) => (
              <div
                key={card}
                className="relative rounded-2xl p-[1.5px] overflow-hidden"
              >
                {/* Animated linear gradient border */}
                <div
                  className="absolute inset-0 bg-[linear-gradient(90deg,transparent,#872CE2,transparent)]"
                  style={{
                    animation: "shimmer 15s linear infinite",
                  }}
                />

                {/* Card content */}
                <div className="relative h-full min-h-50 rounded-2xl bg-card p-8">
                  {/* Placeholder for icon */}
                  <div className="mb-6 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <div className="h-6 w-6 rounded bg-primary/30" />
                  </div>

                  {/* Placeholder for title */}
                  <div className="h-6 w-3/4 rounded bg-muted mb-3" />

                  {/* Placeholder for description */}
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-muted/60" />
                    <div className="h-4 w-5/6 rounded bg-muted/60" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right column - 1 big card */}
          <div className="relative rounded-2xl p-[1.5px] overflow-hidden">
            {/* Animated linear gradient border */}
            <div
              className="absolute inset-0 bg-[linear-gradient(90deg,transparent,#872CE2,transparent)]"
              style={{
                animation: "shimmer 15s linear infinite",
              }}
            />

            {/* Card content */}
            <div className="relative h-full min-h-[424px] rounded-2xl bg-card p-8">
              {/* Placeholder for icon */}
              <div className="mb-6 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <div className="h-6 w-6 rounded bg-primary/30" />
              </div>

              {/* Placeholder for title */}
              <div className="h-6 w-3/4 rounded bg-muted mb-3" />

              {/* Placeholder for description */}
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted/60" />
                <div className="h-4 w-5/6 rounded bg-muted/60" />
                <div className="h-4 w-4/6 rounded bg-muted/60" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        div[style*="shimmer"] {
          background-size: 200% 100%;
        }
      `}</style>
    </section>
  );
}
