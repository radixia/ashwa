import { BookmarkList } from "@/components/bookmark-list"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <div className="container mx-auto py-6 px-4 md:px-6">
        <BookmarkList />
      </div>
    </main>
  )
}

