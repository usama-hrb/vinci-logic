import { Hero } from "@/components/Hero";
import { Why } from "@/components/Why";
import Link from "next/link";
import Slider from "@/components/slider";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import RequestDemo from "@/components/RequestDemo";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Slider />
      <Problem />
      <Why />
      <HowItWorks />
      <RequestDemo />
      <Footer />
    </main>
  );
}
