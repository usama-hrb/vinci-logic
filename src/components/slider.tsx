"use client";

import * as React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

const animation = { duration: 25000, easing: (t: number) => t };

export default function Slider() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: {
      perView: 5,
      spacing: 16,
    },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });
  return (
    <div className="relative mx-auto mt-20 max-w-400 ">
      {/* Left fade gradient */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-background to-transparent" />
      {/* Right fade gradient */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-background to-transparent" />
      <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide">
          <Image
            className=""
            src="/com1.svg"
            alt="Vinci Logic platform interface"
            width={250}
            height={250}
            priority
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            className=""
            src="/com2.svg"
            alt="Vinci Logic platform interface"
            width={250}
            height={250}
            priority
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            className=""
            src="/com3.svg"
            alt="Vinci Logic platform interface"
            width={250}
            height={250}
            priority
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            className=""
            src="/com4.svg"
            alt="Vinci Logic platform interface"
            width={250}
            height={250}
            priority
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            className=""
            src="/com5.svg"
            alt="Vinci Logic platform interface"
            width={250}
            height={250}
            priority
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            className=""
            src="/com5.svg"
            alt="Vinci Logic platform interface"
            width={250}
            height={250}
            priority
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            className=""
            src="/com5.svg"
            alt="Vinci Logic platform interface"
            width={250}
            height={250}
            priority
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            className=""
            src="/com5.svg"
            alt="Vinci Logic platform interface"
            width={250}
            height={250}
            priority
          />
        </div>
      </div>
    </div>
  );
}
