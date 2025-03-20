"use client";

import { ExternalLink, Link2 } from "lucide-react";
import Image from "next/image";
import ashwaMascotte from "@/images/ashwa@256.png";
import { MotionWrapper } from "./motion-wrapper";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="container relative mx-auto flex flex-col items-center justify-center px-4 py-16 text-center md:py-24">
        <MotionWrapper className="mb-6 flex items-baseline justify-center p-3 space-x-4">
          <Image src={ashwaMascotte.src} alt="Ashwa Mascotte" width={128} height={128} />
          <MotionWrapper className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-primary">Hi, I&apos;m Ashwa</span>
          </MotionWrapper>
        </MotionWrapper>
        <MotionWrapper className="mb-8 max-w-md text-muted-foreground md:text-lg">
          I am a bookmark manager that helps you save, categorize, and access your favorite websites
          in one beautiful place.
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 transform"
        >
          <div className="relative flex -space-x-2 rotate-6">
            <div
              style={{
                height: "64px",
                width: "128px",
                borderRadius: "12px",
                background:
                  "linear-gradient(to bottom right, rgb(59, 130, 246), rgb(37, 107, 137))",
                padding: "4px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-background/90 px-3">
                <ExternalLink className="mr-2 h-4 w-4 text-blue-500" />
                <span className="text-xs font-medium">vercel.com</span>
              </div>
            </div>
            <div
              style={{
                height: "64px",
                width: "128px",
                borderRadius: "12px",
                background: "linear-gradient(to bottom right, rgb(236, 72, 153), rgb(225, 29, 72))",
                padding: "4px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-background/90 px-3">
                <Link2 className="mr-2 h-4 w-4 text-pink-500" />
                <span className="text-xs font-medium">nextjs.org</span>
              </div>
            </div>
            <div
              style={{
                height: "64px",
                width: "128px",
                borderRadius: "12px",
                background: "linear-gradient(to bottom right, rgb(16, 185, 129), rgb(5, 150, 105))",
                padding: "4px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-background/90 px-3">
                <ExternalLink className="mr-2 h-4 w-4 text-emerald-500" />
                <span className="text-xs font-medium">tailwindcss.com</span>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
}
