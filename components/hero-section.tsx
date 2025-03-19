"use client"

import { motion } from "framer-motion"
import { Bookmark, ExternalLink, Link2 } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="container relative mx-auto flex flex-col items-center justify-center px-4 py-16 text-center md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center justify-center rounded-full bg-primary/10 p-3"
        >
          <Bookmark className="h-6 w-6 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        >
          <span className="text-primary">Ashwa</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 max-w-md text-muted-foreground md:text-lg"
        >
          Organize your digital world with style. Save, categorize, and access your favorite websites in one beautiful
          place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 transform"
        >
          <div className="relative flex -space-x-2 rotate-6">
            <div
              style={{
                height: "64px",
                width: "128px",
                borderRadius: "12px",
                background: "linear-gradient(to bottom right, rgb(59, 130, 246), rgb(79, 70, 229))",
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
        </motion.div>
      </div>
    </div>
  )
}

