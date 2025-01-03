"use client";
import { Footer, Navigation, NotFoundView } from "@/components/organisms";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full sticky top-0 z-[999]">
        <Navigation />
      </header>

      <NotFoundView />

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}
