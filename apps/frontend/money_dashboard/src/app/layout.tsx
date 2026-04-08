import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // フォントのインポートを確認
import "./globals.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";

// 1. 変数定義を復活させる（ここが消えていたはずです）
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Money Dashboard | doradora",
  description: "Raspberry Pi Cluster Management Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          async
          src="https://analytics.doradora58.com/script.js"
          data-website-id="ecb2edeb-5c52-46b6-b713-c68ede060915"
        ></script>
      </head>
      <body
        // 2. ここで geistSans.variable を使っています
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <TooltipProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <main className="flex-1 flex flex-col bg-slate-50">
                <header className="flex h-14 items-center gap-4 border-b bg-white px-4 sticky top-0 z-10">
                  <SidebarTrigger />
                  <div className="h-4 w-[1px] bg-slate-200" />
                  <span className="text-sm font-medium text-slate-500">System Control Center</span>
                </header>
                <div className="p-4 md:p-8 flex-1 overflow-auto">
                  {children}
                </div>
              </main>
            </div>
          </TooltipProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}