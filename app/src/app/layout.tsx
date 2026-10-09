import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";

const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-hanken", display: "swap" });

export const metadata: Metadata = {
  title: "Hallway Track",
  description: "会场、晚宴、投资人的电话，先在这里练一遍。面向前沿 AI 研究者的社交练习：对面是不会顺着你的教授、投资人、创业者和 lab 研究员，练完拿到引用你原话的复盘。Practise the room before you walk into it. 基于 SocialCoach。",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Hallway Track" },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};

export const viewport: Viewport = {
  // The browser chrome should match whichever ground the page is on.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f5ef" },
    { media: "(prefers-color-scheme: dark)", color: "#22201d" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${hanken.variable}`} suppressHydrationWarning>
      <head>
        {/* Before first paint, so a pinned light theme does not flash dark (or
            the reverse). Reads the persisted store directly; failures are
            ignored and the media query decides. It has to be in <head> and
            without `async`: React refuses to order a blocking script anywhere
            else, and deferring it is the same as not having it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=JSON.parse(localStorage.getItem("socialcoach.v1")||"{}").state?.settings?.theme;if(t&&t!=="system")document.documentElement.setAttribute("data-theme",t)}catch(e){}`,
          }}
        />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
