"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/footer";

function ResumeNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Home / Logo */}
          <a href="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
            {mounted && (
              <Image
                src={theme === "light" ? "/logo-light.png" : "/logo-dark.png"}
                alt="Ashim Shrestha logo"
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="text-lg font-bold gradient-text">
              Ashim<span className="text-accent">.</span>
            </span>
          </a>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/#send-message"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors duration-200"
            >
              Hire Me
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ResumeNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
