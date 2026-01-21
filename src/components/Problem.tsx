import { useTranslations } from "next-intl";
import { AlertTriangle, Eye, DollarSign, Brain, Zap } from "lucide-react";

const problems = [
  { key: "alertFatigue", icon: AlertTriangle },
  { key: "missedDetections", icon: Eye },
  { key: "highCost", icon: DollarSign },
  { key: "analystBurnout", icon: Brain },
  { key: "fragileAutomation", icon: Zap },
];

export default function Problem() {
  const t = useTranslations("problem");

  return (
    <section className="bg-muted py-15 overflow-hidden">
    </section>
  );
}   