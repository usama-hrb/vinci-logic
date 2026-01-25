"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AnimationVariant =
  | "fadeUp"
  | "fadeIn"
  | "scaleUp"
  | "slideLeft"
  | "slideRight";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  variant?: AnimationVariant;
  className?: string;
}

const variants = {
  fadeUp: {
    initial: { opacity: 0, y: 24, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeIn: {
    initial: { opacity: 0, scale: 0.96, filter: "blur(4px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.92, y: 16 },
    animate: { opacity: 1, scale: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 40, filter: "blur(4px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  slideRight: {
    initial: { opacity: 0, x: -40, filter: "blur(4px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
};

export function FadeUp({
  children,
  delay = 0,
  duration = 0.9,
  variant = "fadeUp",
  className,
}: FadeUpProps) {
  const shouldReduceMotion = useReducedMotion();
  const selectedVariant = variants[variant];

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : selectedVariant.initial}
      whileInView={shouldReduceMotion ? undefined : selectedVariant.animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        ease: [0.22, 0.61, 0.36, 1], // Smoother, more elegant easing
        delay,
        filter: { duration: duration * 0.9 },
      }}
    >
      {children}
    </motion.div>
  );
}
