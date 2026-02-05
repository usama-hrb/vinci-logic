"use client";

import {
  Search,
  Clock,
  Users,
  Shield,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function GuidedInvestigation() {
  const [currentStep, setCurrentStep] = useState(0);

  const investigationSteps = [
    {
      id: 1,
      title: "Step 1",
      subtitle: "Alert Triage",
      icon: AlertTriangle,
    },
    {
      id: 2,
      title: "Step 2",
      subtitle: "Evidence Gather",
      icon: Search,
    },
    {
      id: 3,
      title: "Step 3",
      subtitle: "Timeline Build",
      icon: Clock,
    },
    {
      id: 4,
      title: "Step 4",
      subtitle: "Asset Analysis",
      icon: Shield,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % investigationSteps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-4 flex items-center justify-center">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full max-w-sm">
        {investigationSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={step.id}
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-500 ${
                isActive
                  ? "bg-purple-500/20 border-2 border-purple-500 scale-110 shadow-lg shadow-purple-500/25"
                  : isCompleted
                    ? "bg-primary/10 border-2 border-primary/30"
                    : "bg-muted/20 border-2 border-border/30"
              }`}
            >
              {/* Connecting arrows */}
              {index === 0 && (
                <ChevronRight className="absolute -right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              )}
              {index === 1 && (
                <ChevronRight className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 rotate-90 h-4 w-4 text-muted-foreground z-10" />
              )}
              {index === 2 && (
                <ChevronRight className="absolute -left-2 top-1/2 transform -translate-y-1/2 rotate-180 h-4 w-4 text-muted-foreground z-10" />
              )}

              <div
                className={`p-3 rounded-full mb-2 ${
                  isActive
                    ? "bg-purple-500 text-white"
                    : isCompleted
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="text-center">
                <p
                  className={`text-sm font-bold ${
                    isActive
                      ? "text-purple-400"
                      : isCompleted
                        ? "text-primary"
                        : "text-foreground"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {step.subtitle}
                </p>
              </div>

              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-purple-500/10 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
