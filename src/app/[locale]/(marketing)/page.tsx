import { Hero } from '@/components/Hero';
import { Why } from '@/components/Why';
import Link from 'next/link';
import Slider from '@/components/slider';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Slider />
      <Why />
    </main>
  );
}
