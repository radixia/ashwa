"use client";

import ashwaMascotte from "@/images/ashwa@256.png";
import Image from "next/image";
import { MotionWrapper } from "./motion-wrapper";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-background to-background">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="container relative mx-auto flex flex-col items-center justify-center px-4 py-11 text-center ">
        <MotionWrapper className="mb-6 flex items-baseline justify-center p-3 space-x-4">
          <Image src={ashwaMascotte.src} alt="Ashwa Mascotte" width={200} height={200} />
          <MotionWrapper className="text-4xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            <span className="text-primary italic">Hi, I&apos;m Ashwa!</span>
          </MotionWrapper>
        </MotionWrapper>
        <MotionWrapper className="mb-2  text-muted-foreground ">
          I am a bookmark manager that helps you save, categorize, and access your favorite websites
          in one beautiful place.
        </MotionWrapper>
      </div>
    </div>
  );
}
