import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MiscSidebar from "@/components/MiscSidebar";
import { SocketProvider } from "@/contexts/SocketContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OdinConnect",
  description:
    "Connect with your friends on OdinConnect, the social media platform for the Odin community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-grey-50)] text-[var(--color-grey-600)]`}
      >
        <QueryProvider>
          <SocketProvider>
            <div className="flex flex-col-reverse md:grid md:grid-cols-[auto_1fr] xl:grid-cols-[auto_1fr_20rem] min-h-screen">
              <Sidebar />
              <div className="grow bg-gray-400">{children}</div>
              <div className="block md:hidden">
                <Header />
              </div>
              <div className="hidden xl:block">
                <MiscSidebar />
              </div>
            </div>
          </SocketProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
