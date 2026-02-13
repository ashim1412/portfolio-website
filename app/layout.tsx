import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { personalInfo } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${personalInfo.name} — ${personalInfo.title}`,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.bio,
  keywords: [
    "data analyst", "analytics engineer", "business intelligence", "portfolio",
    "Python", "SQL", "Power BI", "Tableau", "Databricks", "dbt",
    "fintech analytics", "e-commerce analytics", "data engineering",
  ],
  authors: [{ name: personalInfo.name }],
  icons: {
    icon: [
      { url: "/logo-dark.png", media: "(prefers-color-scheme: dark)" },
      { url: "/logo-light.png", media: "(prefers-color-scheme: light)" },
    ],
    shortcut: "/logo-dark.png",
    apple: "/logo-dark.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${personalInfo.name} — ${personalInfo.title}`,
    description: personalInfo.bio,
    siteName: personalInfo.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} — ${personalInfo.title}`,
    description: personalInfo.bio,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2EF9K5C005"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2EF9K5C005');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
