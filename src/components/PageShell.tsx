"use client";
import ChatWidget from "@/components/ChatWidget";
import { EventBanner, Navbar, Footer } from "@/sections";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative bg-white">
      <EventBanner />
      <Navbar />
      {children}
      <Footer />
      <ChatWidget />
    </main>
  );
}
